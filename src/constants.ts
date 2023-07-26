export enum VsCodeCommands {
  commentLine = "editor.action.commentLine",
  openSettings = "workbench.action.openSettings",
  findInFiles = "workbench.action.findInFiles",
}

export enum ExtensionCommands {
  insertSnippet = "commentify.insertSnippet",
}

export const EXTENSION_NAME = "Commentify";
export const CONFIG_NAME = "commentify.snippets";
export const PLACEHOLDER_REGEX = /\${([A-Za-z0-9_-]*)}/g;
export const TREE_VIEW_ID = "commentifyExplorerView";
