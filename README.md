# custom-alarm-web-component

## Description
Markdown Editor is a web component that allows users to write and preview markdown content. The editor provides a toolbar for easy formatting and a live preview feature to see the formatted output in real-time.

## Features
- **Markdown Editor**: A text area where users can write markdown content.
- **Toolbar**: Buttons for adding bold, italic, headers, and list items to the markdown content.
- **Live Preview**: A preview pane that shows the formatted markdown content as HTML.
- **Customization**: Option to hide the editor and toolbar based on user preferences.

## Implementation Overview

- The component is structured using HTML and consists of elements such as the editor, toolbar, and preview pane.
- CSS is used to style the editor interface, including the text area, buttons, and preview pane, providing a clean and user-friendly design.
- JavaScript handles the markdown parsing, button actions, and live preview updates. Key functionalities include adding markdown syntax, updating the preview, and handling user interactions with the toolbar.

### Toolbar buttons
- _Bold_ Wraps selected text in **.
- _Italic_: Wraps selected text in _.
- _H1, H2, H3_ Inserts headers (#, ##, ###).
- _List item_: Inserts a list item (- ).

## Installation
In order to use this custom component, you have to download and add to your project the following `markdown-editor.js` file; this file contains the definition and implementation of the custom web component.

## Usage
The custom alarm web component functions as any other tradition HTML tag. Once you add the tag to your page, the component will be rendered. To include the component in your project, add a script tag containing the path to the `markdown-editor.js` file. Here is a full example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Editor</title>
  <script src="./markdown-editor.js"></script>
</head>
<body>
    <markdown-editor></markdown-editor>
</body>
</html>

```

You can also choose to hide the editor and toolbar by adding the `showEditor` attribute in the component's tag and setting it to `false`.
```html
<markdown-editor showEditor="false"></markdown-editor>
```

Additionally, you can set an initial value for the editor by placing text between the opening and closing `<markdown-editor>` tags.
```html
<markdown-editor># Hi there!
This is a paragraph with **bold** text and _italic_ text.
    
- List **item 1**
- List _item 2_
</markdown-editor>
```