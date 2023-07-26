# <img src="media/Commentify.png" width="64" style="float:left; margin-right:10px;margin-top:-10px;"/> Commentify

Commentify provides the following features

- Allows users to configure custom comment templates that can be added as snippets inside their files.
- Provides a tree view of all the user's comment templates. Users can easily list the files containing comments they have added by clicking on the templates in the tree view.

## Features

- Users can configure multiple snippets with placeholders and choices for those placeholders. Refer to [Settings](#settings) for instructions on configuring these snippets.
- Snippets can be conveniently inserted into the editor window by using the keyboard shortcut <kbd>⌘+K</kbd> <kbd>/</kbd> on macOS or <kbd>Ctrl+K</kbd> <kbd>/</kbd> on Windows/Linux. Users can customize this keyboard shortcut by changing the keybinding for the <kbd>commentify.insertSnippet</kbd> command.

  ![Sample moving images showcasing how snippets are inserted into an editor using this extension](https://raw.githubusercontent.com/katcy/commentify/main/media/demo/comment%20using%20key%20bindings.gif)

- Snippets can also be inserted using the command palette.
  ![Still picture of command palette showing all extension commands](https://raw.githubusercontent.com/katcy/commentify/main/media/demo/comment%20using%20settings.gif)

- The extension provides a tree view of users' comment snippets, displaying all the choices they have added. Clicking on an item in the tree view triggers a search for that particular comment.
  ![Still picture of the extension's Tree view](https://raw.githubusercontent.com/katcy/commentify/main/media/demo/Tree%20view.gif)

## Settings

This extension contributes the following settings:

- `commentify.snippets`: Array of snippet configurations.

Each object in the array corresponds to a snippet you want to configure. The object consists of the following properties:

| Property    | Type      | Description                                                                                                                                                                                            |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | `string`  | User-friendly name to identify the snippet.                                                                                                                                                            |
| template    | `string`  | Comment template that gets inserted. May have placeholders inside `${}`.<br/>Placeholders can only contains <ul> <li>alpha-numeric characters</li><li>hyphen ( - )</li><li>underscore ( \_ )</li></ul> |
| choices     | `Object`  | Object that contains the array of choices for each placeholder.<br/> Any placeholders skipped will not be offered any choices.                                                                         |
| insertToTop | `boolean` | Inserts comment to the top of file instead of the line above. <br/> Default: `false`                                                                                                                   |

A sample configuration is shown below for reference:

```json
{
  "commentify.snippets": [
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
