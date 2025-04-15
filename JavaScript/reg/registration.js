// Попап с регистрацией
const popup = document.querySelector(".section")

// Выполнится при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    // показываем попап с регистрацией
    popup.style.display = "flex"

    // размываем задний фон попапа
    // CSS: backdrop-filter: blur(5px);
    popup.style.backdropFilter = 'blur(5px)'
})


// кнопка для регистрации
const regBtn = document.querySelector(".window__registration--button")

regBtn.addEventListener("click" , () =>
{
    // получаем значения введённые пользователем
    const emailText = document.querySelector(".window__registration--email").value
    const passwordText = document.querySelector(".window__registration--password").value

    let ok = validateInputs(emailText, passwordText)
    if (!ok)
        return // неправильный ввод - выходим из функции

    // валидация прошла успешно - прячем попап с регистрацией
    popup.style.display = "none"
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