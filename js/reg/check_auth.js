
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("udata") == null) {
        document.location.href = "reg.html"
    }
})