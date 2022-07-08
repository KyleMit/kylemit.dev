import * as monaco from 'monaco-editor';
import "./index.css"
import about from "./index.md?raw"


let editor = monaco.editor.create(document.getElementById('container')!, {
  value: about,
  language: 'markdown',
  wordWrap: 'on',
  fontSize: 18,
  minimap: {
		enabled: false
  },
  theme: "vs-dark",

});


// resize on resize
window.onresize = () => editor.layout();
