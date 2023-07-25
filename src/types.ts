import { TreeItemCollapsibleState, Command } from "vscode";

export interface ISnippetBase {
  insertToTop?: boolean;
  name: string;
  template: string;
}

export interface ISnippetItem extends Omit<ISnippetBase, "insertToTop"> {
  insertToTop: boolean;
  placeholderKeys: Array<string>;
  snippet: string;
  choices?: Record<string, string[]>;
}

export interface IConfig extends ISnippetBase {
  choices?: Record<string, Array<string>>;
}

export interface ICommentsTreeItemProps {
  collapsibleState: TreeItemCollapsibleState;
  command?: Command;
  snippetItem: ISnippetItem;
  label: string;
  description?: string;
}
