import * as vscode from "vscode";

import { ICommentsTreeItemProps, ISnippetItem } from "./types";
import { PLACEHOLDER_REGEX, VsCodeCommands } from "./constants";

class CommentsTreeItem extends vscode.TreeItem {
  readonly snippetItem: ISnippetItem;

  constructor({
    collapsibleState,
    command,
    label,
    snippetItem,
    description,
  }: ICommentsTreeItemProps) {
    super(label, collapsibleState);
    this.snippetItem = snippetItem;
    this.tooltip = `${label}\n${description}`;
    this.description = description;
    this.command = command;
    this.contextValue = "commentTreeItem";
  }
}

class CommentsTreeProvider
  implements vscode.TreeDataProvider<CommentsTreeItem>
{
  private _snippets: Array<ISnippetItem>;
  private _onDidChangeTreeData = new vscode.EventEmitter<
    CommentsTreeItem | undefined | void
  >();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(snippets: Array<ISnippetItem>) {
    this._snippets = snippets;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CommentsTreeItem) {
    return element;
  }

  getChildren(
    element?: CommentsTreeItem
  ): vscode.ProviderResult<CommentsTreeItem[]> {
    if (!element) {
      // Root elements
      return Promise.resolve(
        this._snippets.map((snippet) => {
          const query = snippet.template.replace(PLACEHOLDER_REGEX, ".*");
          return new CommentsTreeItem({
            collapsibleState:
              this._snippets.length > 1
                ? vscode.TreeItemCollapsibleState.Collapsed
                : vscode.TreeItemCollapsibleState.Expanded,
            description: snippet.template,
            label: snippet.name,
            snippetItem: snippet,
          });
        })
      );
    }

    const keysWithChoices = element.snippetItem.placeholderKeys.filter(
      (key) => !!element.snippetItem.choices?.[key]?.length
    );

    if (!element.snippetItem.choices || !keysWithChoices.length) {
      return Promise.resolve([]);
    }

    const [currentKey, ...remainingKeys] = keysWithChoices;
    const snippetItem: ISnippetItem = {
      ...element.snippetItem,
      placeholderKeys: remainingKeys,
    };

    return Promise.resolve(
      element.snippetItem.choices[currentKey].map((choice) => {
        const description = (element.description as string).replace(
          new RegExp("\\${" + currentKey + "}", "g"),
          choice
        );
        const query = description.replace(PLACEHOLDER_REGEX, ".*");
        return new CommentsTreeItem({
          collapsibleState: remainingKeys.length
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None,
          description,
          label: choice,
          snippetItem,
          command: {
            command: VsCodeCommands.findInFiles,
            title: `Search for \`${description}\` comments`,
            tooltip: `Search for \`${description}\` comments`,
            arguments: [
              {
                isCaseSensitive: true,
                isRegex: true,
                triggerSearch: true,
                query,
              },
            ],
          },
        });
      })
    );
  }
}

export default CommentsTreeProvider;
