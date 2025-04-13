document.querySelector(".window__registration--button").addEventListener("click" , ()=>
{

    // емейл и пароль сдесь
    const emailText = document.querySelector(".window__registration--email").value;
    const passwordText = document.querySelector(".window__registration--password").value;
    // 

    const minValue = 8;
    const maxValue = 22;
    if(!emailText.includes("@"))
    {
        document.querySelector(".window__registration--emailError").innerText = "Incorrect email!"
        console.error("Incorrect email!")
    }
    else if(!emailText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--emailError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--emailError").innerText = ""
        document.querySelector(".window__registration--passwordError").innerText = ""
    }
    else if(!emailText && !passwordText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--emailError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--passwordError").innerText = "Please fill in correctly!"
    }
    else if(!passwordText)
    {
        console.error("Please fill in correctly!")
        document.querySelector(".window__registration--passwordError").innerText = "Please fill in correctly!"
        document.querySelector(".window__registration--emailError").innerText = ""
        document.querySelector(".window__registration--emailError").innerText = ""
    }
    else if(passwordText.length > maxValue)
    {
        document.querySelector(".window__registration--passwordError").innerText = "Many symbols!"
        console.error("Many symbols!")
    }
    else if(passwordText.length < minValue)
    {
        document.querySelector(".window__registration--passwordError").innerText = "Few symbols!"
        console.error("Few symbols!")
    }
    else
    {
        console.log(`Email: ${emailText} , Password: ${passwordText}`)
        document.querySelector(".window__registration--emailError").innerText = ""
        document.querySelector(".window__registration--passwordError").innerText = ""
        window.location.replace("../../templates/todo.html")
    }
});