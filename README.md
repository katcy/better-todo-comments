# ✨Better TODO Comments✨

Better TODO Comments provides the following features

- Configure custom comment templates that you can add as snippets inside your files
- Provides a tree view of all your comment templates. Clicking on which you can easily search for the comments you have added.

## Features

- Configure multiple snippets that support placeholders and choices for those placholders. Check [Settings](#settings) below to understand how to configure these snippets.
- Insert snippets into your editor window by pressing <kbd>`⌘+K`</kbd> <kbd>`/`</kbd> on macOS or <kbd>`Ctrl+K`</kbd> <kbd>`/`</kbd> on Windows/Linux. This keyboard shortcut can be customised by changing the keybinding for <kbd>betterTodoComments.insertSnippet</kbd> command.
  ![Sample moving images showcasing how snippets are inserted into an editor using this extension](https://raw.githubusercontent.com/katcy/better-todo-comments/main/media/InsertSnippet.gif)

- Snippets can also be inserted using the command palette.
  ![Still picture of command palette showing all extension commands](https://raw.githubusercontent.com/katcy/better-todo-comments/main/media/CommandPalette.png)

- See a tree view of your comment snippets, with all the choices that you've added. Clicking on an item triggers a search for that comment.
  ![Still picture of the extension's Tree view](https://raw.githubusercontent.com/katcy/better-todo-comments/main/media/TreeView.png)

## Settings

This extension contributes the following settings:

- `betterTodoComments.snippets`: Array of snippet configurations.

Each object in the array corresponds to a snippet you want to configure. The object consists of the following properties:

| Property    | Type      | Description                                                                                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`  | User-friendly name to identify the snippet                                                                                                                          |
| template    | `string`  | Comment template that gets inserted. May have placeholders inside ${}. Placeholders can only contains alpha-numeric characters, hyphen ( - ) and underscore ( \_ ). |
| choices     | `Object`  | Object that contains the array of choices for each placeholder. Any placeholders skipped will not be offered any choices                                            |
| insertToTop | `boolean` | Inserts comment to the top of file instead of the line above. Default: false                                                                                        |

A sample configuration is shown below for reference:

```json
{
  "betterTodoComments.snippets": [
    {
      "name": "Insert to Top of file",
      "template": "${prefix}: ${description}",
      "choices": {
        "prefix": ["FIXME", "TODO", "HACK", "NOTE", "DEBUG", "REVIEW"]
      },
      "insertToTop": true
    },
    {
      "name": "Default Configuration",
      "template": "${prefix}: ${description}",
      "choices": {
        "prefix": ["FIXME", "TODO", "HACK", "NOTE", "DEBUG", "REVIEW"]
      }
    }
  ]
}
```

## Known Issues

- Lacks support for snippet insertion through vscode text completion.
- Lacks support for Non-English users.

## Release Notes

Check [CHANGELOG.md](CHANGELOG.md) for details.

## Special Thanks To The Co-Author

[![Manu Mathew](https://avatars.githubusercontent.com/u/2261081?s=64)](https://github.com/manu-27993)

## LICENSE

This extension is licensed under the [MIT License](LICENSE)

---
