export enum VsCodeCommands {
  commentLine = "editor.action.commentLine",
  openSettings = "workbench.action.openSettings",
  findInFiles = "workbench.action.findInFiles",
}

export enum ExtensionCommands {
  insertSnippet = "betterTodoComments.insertSnippet",
}

export const EXTENSION_NAME = "✨Better TODO Comments✨";
export const CONFIG_NAME = "betterTodoComments.snippets";
export const PLACEHOLDER_REGEX = /\${([A-Za-z0-9_-]*)}/g;
export const TREE_VIEW_ID = "betterTodoComments";
