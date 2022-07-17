document.addEventListener("change", (e) => {
    const { name, checked } = e.target
    window.localStorage.setItem(name, checked)
})
