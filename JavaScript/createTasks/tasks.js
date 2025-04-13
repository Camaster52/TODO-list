document.querySelector(".BtnCheckmarkSection__addbtn--btn").addEventListener("click" , ()=> 
{
    // create section
    const section = document.createElement("section")
    section.className = "tasks"

    //create div container
    const divBlock = document.createElement("div")
    divBlock.className = "tasks__cont"

    //create textarea
    const textarea = document.createElement('textarea');
    textarea.className = "tasks__cont--input"
    textarea.type = "text"
    textarea.name = "task"

    //create buttonDelete
    const btn = document.createElement("button")
    btn.className = "tasks__cont--btnDelete"
    btn.innerHTML = "&times;"

    document.querySelector('.main').appendChild(section);

    section.appendChild(divBlock)

    divBlock.appendChild(textarea);

    divBlock.appendChild(btn);

    btn.addEventListener("click" , ()=>
    {
        section.remove();
    })
})
