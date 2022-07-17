document.querySelectorAll("input[type=checkbox]").forEach((el) => {
    el.checked = window.localStorage.getItem(el.name) === "true"
})
