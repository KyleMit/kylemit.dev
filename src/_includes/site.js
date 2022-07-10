const isMobile = 'ontouchstart' in document.documentElement;


// toggle theme
// const themeCheck = document.getElementById("theme") as HTMLInputElement
// themeCheck.addEventListener('change', (e) => {
//   const className = themeCheck.checked ? 'vs-dark' : 'vs-light'
//   document.body.classList.remove('vs-dark', 'vs-light')
//   document.body.classList.add(className)
//   monaco.editor.setTheme(className);
// })

// const previewContents = document.getElementById("preview-contents") as HTMLInputElement
// const previewCheck = document.getElementById("preview") as HTMLInputElement
// previewCheck.addEventListener('change', (e) => {
//   document.body.classList.remove("preview", "editor")
//   let className = previewCheck.checked ? "preview" : "editor"
//   document.body.classList.add(className)

//   const md = editor.getValue()
//   const html = converter.makeHtml(md)
//   previewContents.innerHTML = html
// })

// editor?.getModel()?.onDidChangeContent((event) => {
//   const val = editor.getValue()
//   const isDirty = val != content
//   document.body.classList.toggle("is-dirty", isDirty)
// });
