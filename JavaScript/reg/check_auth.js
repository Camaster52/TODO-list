
document.addEventListener("DOMContentLoaded", () => {
    let jwt = localStorage.getItem("jwt")
    if (jwt == null) {
        document.location.href = "reg.html"
    }
})