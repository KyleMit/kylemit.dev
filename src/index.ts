import * as monaco from 'monaco-editor';
import showdown from "showdown";

import about from "./about.md?raw"
import aboutSm from "./about-sm.md?raw"

const converter = new showdown.Converter();
const content = window.innerWidth > 700 ? about : aboutSm;

const isMobile = 'ontouchstart' in document.documentElement;

const editor = monaco.editor.create(document.getElementById('container')!, {
  value: content,
  language: 'markdown',
  wordWrap: 'bounded',
  wordWrapColumn: 80,
  fontSize: 18,
  fontFamily: "Fira Code",
  minimap: {
		enabled: false
  },
  theme: "vs-dark",
  readOnly: isMobile,
  domReadOnly: isMobile,
  automaticLayout: true,

});

// toggle theme
const themeCheck = document.getElementById("theme") as HTMLInputElement
themeCheck.addEventListener('change', (e) => {
  const className = themeCheck.checked ? 'vs-dark' : 'vs-light'
  document.body.classList.remove('vs-dark', 'vs-light')
  document.body.classList.add(className)
  monaco.editor.setTheme(className);
})

const previewContents = document.getElementById("preview-contents") as HTMLInputElement
const previewCheck = document.getElementById("preview") as HTMLInputElement
previewCheck.addEventListener('change', (e) => {
  document.body.classList.remove("preview", "editor")
  let className = previewCheck.checked ? "preview" : "editor"
  document.body.classList.add(className)

  const md = editor.getValue()
  const html = converter.makeHtml(md)
  previewContents.innerHTML = html
})

editor?.getModel()?.onDidChangeContent((event) => {
  const val = editor.getValue()
  const isDirty = val != content
  document.body.classList.toggle("is-dirty", isDirty)
});
