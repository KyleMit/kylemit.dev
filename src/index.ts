import * as monaco from 'monaco-editor';
import "./index.css"
import about from "./index.md?raw"
import aboutSm from "./index-sm.md?raw"


let editor = monaco.editor.create(document.getElementById('container')!, {
  value: window.innerWidth > 700 ? about : aboutSm,
  language: 'markdown',
  wordWrap: 'on',
  fontSize: 18,
  minimap: {
		enabled: false
  },
  theme: "vs-dark",
  readOnly: 'ontouchstart' in document.documentElement
});

const themeChk = document.getElementById("theme") as HTMLInputElement
themeChk.addEventListener('change', (e) => {
  monaco.editor.setTheme(themeChk.checked ? 'vs-dark' : 'vs-light');
})


// resize on resize
window.onresize = () => editor.layout();
