import * as monaco from 'monaco-editor';
import "./index.css"

monaco.editor.create(document.getElementById('container')!, {
  value: 'console.log("New Site, who dis?")',
  language: 'javascript',
});
