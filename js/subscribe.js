const checkbox = document.querySelector(".BtnCheckmarkSection__checkmark--checkmark")

document.addEventListener("DOMContentLoaded", async () => {
    let udata = JSON.parse(localStorage.getItem("udata"))
    let email = udata["email"]
    let res = await fetch("https://friendly-reminder-xasp.onrender.com/api/v1/users/"+email, {
        method: "GET"
    })

    if (!res.ok) {
        console.error(await res.text())
        return
    }

    let user = await res.json()
    console.log(user);
    

    checkbox.checked = user["subscribed"]
})


checkbox.addEventListener("click", async () => {
    await subscribe(checkbox.checked)
})

const subscribe = async (subscr) => {
    let udata = JSON.parse(localStorage.getItem("udata"))
    let res = await fetch("https://friendly-reminder.onrender.com/api/v1/users/subscribe?subscribe="+subscr, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + udata["jwt"]
        }
    })

    if (!res.ok) {
        console.error(await res.text())
        return;
    }
}