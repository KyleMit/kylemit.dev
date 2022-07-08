import * as monaco from 'monaco-editor';
import showdown from "showdown";
import "./index.css"
import about from "./index.md?raw"
import aboutSm from "./index-sm.md?raw"

const converter = new showdown.Converter();

const editor = monaco.editor.create(document.getElementById('container')!, {
  value: window.innerWidth > 700 ? about : aboutSm,
  language: 'markdown',
  wordWrap: 'on',
  fontSize: 18,
  minimap: {
		enabled: false
  },
  theme: "vs-dark",
  readOnly: 'ontouchstart' in document.documentElement,
  automaticLayout: true
});

// toggle theme
const themeCheck = document.getElementById("theme") as HTMLInputElement
themeCheck.addEventListener('change', (e) => {
  monaco.editor.setTheme(themeCheck.checked ? 'vs-dark' : 'vs-light');
})

const previewPane = document.getElementById("preview-pane") as HTMLInputElement
const previewCheck = document.getElementById("preview") as HTMLInputElement
previewCheck.addEventListener('change', (e) => {
  document.body.classList.remove("preview", "editor")
  let className = previewCheck.checked ? "preview" : "editor"
  document.body.classList.add(className)

  const md = editor.getValue()
  const html = converter.makeHtml(md)
  previewPane.innerHTML = html
})
