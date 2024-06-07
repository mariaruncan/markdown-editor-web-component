const markdownTemplate = document.createElement('template')
markdownTemplate.innerHTML = `
    <style>
        .container {
            display: flex;
            flex-direction: column;
        }
        .toolbar {
            display: flex;
            gap: 5px;
        }
        textarea {
            margin-top: 10px;
            width: 100%;
            min-height: 200px;
            padding: 10px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            background-color: #f4dcfa;
            font-size: 16px;
        }
        .preview {
            margin-top: 10px;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 4px;
            background: #dcf2e9;
        }
        .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
                touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
            background: #f2d6c2;
        }
        .btn:focus,
        .btn:active:focus,
        .btn.active:focus,
        .btn.focus,
        .btn:active.focus,
        .btn.active.focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        .btn:hover,
        .btn:focus,
        .btn.focus {
          color: #333;
          text-decoration: none;
        }
        .btn:active,
        .btn.active {
          background-image: none;
          outline: 0;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
                  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        }
    }
    </style>

    <div class="container">
        <div id="toolbar">
        <button class="btn" id="bold-btn">Bold</button>
        <button class="btn" id="italic-btn">Italic</button>
        <button class="btn" id="h1-btn">H1</button>
        <button class="btn" id="h2-btn">H2</button>
        <button class="btn" id="h3-btn">H3</button>
        <button class="btn" id="list-item-btn">List item</button>
    </div>
    <textarea id="editor" placeholder="Write your markdown here..."></textarea>
    <div id="preview" class="preview" markdown=1></div>
</div>
`;


class MarkdownEditor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // init
    const initialText = this.innerHTML
    this.innerHTML = ''

    this.appendChild(markdownTemplate.content.cloneNode(true));

    // init attributes
    this.editor = this.querySelector("#editor");
    this.preview = this.querySelector("#preview");
    this.toolbar = this.querySelector("#toolbar");
    this.boldBtn = this.querySelector("#bold-btn");
    this.italicBtn = this.querySelector("#italic-btn");
    this.h1Btn = this.querySelector("#h1-btn");
    this.h2Btn = this.querySelector("#h2-btn");
    this.h3Btn = this.querySelector("#h3-btn");
    this.listItemBtn = this.querySelector("#list-item-btn");
    
    // inti visibility for toolbar and editor
    const showEditor = this.getAttribute('showEditor');
    if (showEditor === 'false') {
        this.editor.hidden = true;
        this.toolbar.hidden = true;
    }

    // init callbacks
    this.editor.addEventListener('input', () => this.updatePreview());
    this.boldBtn.addEventListener('click', () => this.addInlineMarkdownSyntax('**'));
    this.italicBtn.addEventListener('click', () => this.addInlineMarkdownSyntax('_'));
    this.h1Btn.addEventListener('click', () => this.addBlockMarkdownSyntax('# '));
    this.h2Btn.addEventListener('click', () => this.addBlockMarkdownSyntax('## '));
    this.h3Btn.addEventListener('click', () => this.addBlockMarkdownSyntax('### '));
    this.listItemBtn.addEventListener('click', () => this.addBlockMarkdownSyntax('- '));

    this.editor.innerHTML = initialText;
    this.updatePreview();
  }

  updatePreview() {
    const previewContent = this.parseMarkdownToHtml(this.editor.value);
    this.preview.innerHTML = previewContent;
  }

  // used for adding bold and italic markdown
  addInlineMarkdownSyntax(syntax) {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    const selectedText = this.editor.value.substring(start, end);
    const newText = `${syntax}${selectedText}${syntax}`;
    this.editor.setRangeText(newText);
    this.editor.focus();
    this.editor.setSelectionRange(start + syntax.length, end + syntax.length);
    this.updatePreview();
  }

  // used for adding h1, h2 and list item markdown
  addBlockMarkdownSyntax(syntax) {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    const selectedText = this.editor.value.substring(start, end);
    const newText = `${syntax}${selectedText}`;
    this.editor.setRangeText(newText);
    this.editor.focus();
    this.editor.setSelectionRange(start + syntax.length, end + syntax.length);
    this.updatePreview();
  }

  parseMarkdownToHtml(markdown) { 
    const lines = markdown.split('\n');
    const html = lines.map(line => {
        var isDisplayblock = false
        line = line.trim()

        // empty lines
        if(line == '') {
            return `<br>`
        }

        // headers
        if (line.startsWith('### ')) {
            return `<h3>${line.slice(4)}</h3>`;
        } else if (line.startsWith('## ')) {
            return `<h2>${line.slice(3)}</h2>`;
        } else if (line.startsWith('# ')) {
            return `<h1>${line.slice(2)}</h1>`;
        }

        // Lists
        if (line.startsWith('- ')) {
            isDisplayblock = true;
            line = `<ul><li>${line.slice(2)}</li></ul>`;
        }

        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
        // Italic
        line = line.replace(/_(.*?)_/g, '<em>$1</em>');
      
        if (isDisplayblock) {
            return line;
        } else {
            return line + `<br>`;
        }
    }).join('');

    // Combine lists properly
    const combinedHtml = html.replace(/<\/ul>\s*<ul>/g, '');

    return combinedHtml;
  }
}

customElements.define('markdown-editor', MarkdownEditor);
