const regErr = document.querySelector(".window__registration--regerr")
const notification = document.querySelector(".confirm-email__info")

// вводы почты и пароля
const emailInput = document.querySelector(".window__registration--email")
const pwdInput = document.querySelector(".window__registration--password")

// кнопки ркгистрации или входа в аккаунт
const regBtn = document.querySelector(".window__registration--button")
const loginBtn = document.getElementById("login_btn")

const setRegErr = (msg) => {
    regErr.innerText = msg
    notification.innerText = ""
}

loginBtn.addEventListener("click", (e) => {    
    // получаем значения введённые пользователем
    const emailText = emailInput.value
    const passwordText = pwdInput.value

    fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: emailText,
            password: passwordText
        })
    })
    .then(res => {
        if (!res.ok)
            throw new Error("Неправильная электронная почта или пароль")
        return res.text()
    })
    .then(jwt => {
        // успешный вход в аккаунт
        localStorage.setItem("udata", JSON.stringify({
            "jwt": jwt,
            "email": emailText
        }))
        document.location.href = "../../templates/list.html"
        console.log(localStorage.getItem("udata"));
    })
    .catch(err => setRegErr(err.message))
})

regBtn.addEventListener("click", () =>
{
    // получаем значения введённые пользователем
    const emailText = emailInput.value
    const passwordText = pwdInput.value

    fetch("http://localhost:8080/api/v1/users/new", {
        method: "POST",
        body: JSON.stringify({
            email: emailText,
            password: passwordText
        })
    })
    .then(res => {
        switch (res.status) {
            case 403:
                setRegErr("Пользователь с данной электронной почтой уже существует")
                return

            case 400:
                setRegErr("Неправильные данные")
                return
        
            default:
                notification.innerText = "Проверьте почту! Вам отправлено письмо с ссылкой для подтверждения"
                regErr.innerText = ""
                break
        }
    })
})

const resetErr = () => {
    regErr.innerText = ""
}

emailInput.addEventListener("input", resetErr)
pwdInput.addEventListener("input", resetErr)