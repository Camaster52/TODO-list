document.querySelector(".BtnCheckmarkSection__addbtn--btn").addEventListener("click" , ()=> 
{
    const section = document.querySelector(".tasks")

    //create div container
    const taskBlock = document.createElement("div")
    taskBlock.className = "tasks__cont"

    //create textarea
    const input = document.createElement('input');
    input.className = "tasks__cont--input"
    input.type = "text"
    input.name = "task"

    //create buttonDelete
    const btn = document.createElement("button")
    btn.className = "tasks__cont--btnDelete"
    btn.innerHTML = "&times;"

    section.appendChild(taskBlock)

    taskBlock.appendChild(input);

    taskBlock.appendChild(btn);

    btn.addEventListener("click" , ()=>
    {
        taskBlock.remove();
    })
})
