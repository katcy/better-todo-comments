import * as vscode from "vscode";

import { IConfig, ISnippetItem } from "./types";
import {
  CONFIG_NAME,
  EXTENSION_NAME,
  PLACEHOLDER_REGEX,
  TREE_VIEW_ID,
  ExtensionCommands,
  VsCodeCommands,
} from "./constants";
import CommentsTreeProvider from "./CommentsTree";

const log = (...items: unknown[]) =>
  console.log(EXTENSION_NAME, "::", ...items);

const insertSnippet = async (
  editor: vscode.TextEditor,
  snippetItem: ISnippetItem
) => {
  if (snippetItem.insertToTop) {
    await editor.insertSnippet(
      new vscode.SnippetString("\n"),
      new vscode.Position(0, 0)
    );
    await editor.insertSnippet(
      new vscode.SnippetString(""),
      new vscode.Position(0, 0)
    );
  }
  await vscode.commands.executeCommand(VsCodeCommands.commentLine);
  await editor.insertSnippet(new vscode.SnippetString(snippetItem.snippet));
};

const activateExtension = (
  context: vscode.ExtensionContext,
  config: vscode.WorkspaceConfiguration,
  isReactivation = false
) => {
  const configLength = config.get<number>("length") ?? 0;
  // Throw error when there is no config
  if (!configLength) {
    log("Activation failed due to no configuration");
    vscode.window
      .showWarningMessage(
        "Looks like you do not have a configuration for Better TODO Comments",
        "Configure"
      )
      .then((configure) => {
        if (configure) {
          vscode.commands.executeCommand(
            VsCodeCommands.openSettings,
            CONFIG_NAME
          );
        }
      });
    return;
  }

  const snippets: Array<ISnippetItem> = Array.from({
    length: configLength,
  }).map((_, configIndex) => {
    const {
      name,
      template,
      choices,
      insertToTop = false,
    } = config.get(`${configIndex}`) as IConfig;

    const placeholderKeys = [
      ...new Set(
        [...template.matchAll(PLACEHOLDER_REGEX)].map(([_, key]) => key)
      ),
    ].map((key) => key.trim());

    let finalSnippet = template;
    placeholderKeys.forEach((key, index) => {
      const options = choices?.[key] ?? [];
      const convertedString = options.length
        ? `|${options.join(",")}|`!
        : `:${key}`;
      finalSnippet = finalSnippet.replace(
        new RegExp("\\${" + key + "}", "g"),
        `\${${index + 1}${convertedString}}`
      );
    });

    return {
      name,
      placeholderKeys,
      choices,
      snippet: finalSnippet,
      insertToTop,
      template,
    };
  });

  const disposable = vscode.commands.registerTextEditorCommand(
    ExtensionCommands.insertSnippet,
    (editor) => {
      if (configLength > 1) {
        const quickPick = vscode.window.createQuickPick();
        quickPick.title = EXTENSION_NAME;
        quickPick.placeholder = "Choose the snippet to insert";
        quickPick.items = snippets.map(({ name, template }) => ({
          label: `$(symbol-snippet) ${name}`,
          detail: template,
          name,
        }));
        quickPick.onDidChangeSelection((e) => {
          const selectedItem = snippets.find(
            (snippet) =>
              snippet.name === (e[0] as unknown as { name: string }).name
          ) as ISnippetItem;
          insertSnippet(editor, selectedItem);
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
      } else {
        insertSnippet(editor, snippets[0]);
      }
    }
  );

  const commentsTree = new CommentsTreeProvider(snippets);
  vscode.window.createTreeView(TREE_VIEW_ID, {
    treeDataProvider: commentsTree,
  });

  context.subscriptions.push(disposable);
  log(isReactivation ? "Reactivated" : "Activated");
  return disposable;
};

export const activate = (context: vscode.ExtensionContext) => {
  const config = vscode.workspace.getConfiguration(CONFIG_NAME);
  let disposable = activateExtension(context, config);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(CONFIG_NAME)) {
        log("Detected configuration changes");
        disposable?.dispose();
        const config = vscode.workspace.getConfiguration(CONFIG_NAME);
        disposable = activateExtension(context, config, true);
      }
    })
  );
};

export const deactivate = () => {
  log("Deactivated");
};
