// Попап с регистрацией
const popup = document.querySelector(".reg_window")

// Выполнится при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    // показываем попап с регистрацией
    popup.style.display = "flex"

    // размываем задний фон попапа
    // CSS: backdrop-filter: blur(5px);
    popup.style.backdropFilter = 'blur(5px)'
})

// кнопки
const regBtn = document.querySelector(".window__registration--button")
const loginBtn = document.getElementById("login_btn")

loginBtn.addEventListener("click", () => {
    // получаем значения введённые пользователем
    const emailText = document.querySelector(".window__registration--email").value
    const passwordText = document.querySelector(".window__registration--password").value

    let ok = validateInputs(emailText, passwordText)
    if (!ok)
        return

    // login...
})

regBtn.addEventListener("click", async () =>
{
    // получаем значения введённые пользователем
    const emailText = document.querySelector(".window__registration--email").value
    const passwordText = document.querySelector(".window__registration--password").value

    let ok = validateInputs(emailText, passwordText)
    if (!ok)
        return // неправильный ввод - выходим из функции

    let response = await fetch("http://localhost:8080/api/v1/users/new", {
        method: "POST",
        body: JSON.stringify({
            email: emailText,
            password: passwordText
        })
    })

    if (!response.ok) {
        console.error(response.json())
        return
    }
});

// validateInputs возвращает true, если все проверки прошли успешно; иначе false.
const validateInputs = (emailText, passwordText) => {
    const minLen = 8
    const maxLen = 22

    if(!emailText.includes("@"))
    {
        document.querySelector(".window__registration--emailError").innerText = "Incorrect email!"
        console.error("Incorrect email!")
        return false
    }

    if(!emailText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--emailError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--emailError").innerText = ""
        document.querySelector(".window__registration--passwordError").innerText = ""
        return false
    }

    if(!emailText && !passwordText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--emailError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--passwordError").innerText = "Please fill in correctly!"
        return false
    }
    
    if(!passwordText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--passwordError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--emailError").innerText = ""
        document.querySelector(".window__registration--emailError").innerText = ""
        return false
    }
    
    if(passwordText.length > maxLen)
    {
        document.querySelector(".window__registration--passwordError").innerText = "Many symbols!"
        console.error("Many symbols!")
        return false
    }
    
    if(passwordText.length < minLen)
    {
        document.querySelector(".window__registration--passwordError").innerText = "Few symbols!"
        console.error("Few symbols!")
        return false
    }
    
    console.log(`Email: ${emailText} , Password: ${passwordText}`)
    document.querySelector(".window__registration--emailError").innerText = ""
    document.querySelector(".window__registration--passwordError").innerText = ""
    return true
}