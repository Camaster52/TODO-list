const tasksSection = document.querySelector(".tasks")
const createTaskSection = document.querySelector(".create-task-popup")
const createTaskInput = createTaskSection.querySelector("input")
const cancelCreateBtn = createTaskSection.querySelector(".tasks__cont--btnCancel")
const confirmCreateBtn = createTaskSection.querySelector(".tasks__cont--btnAdd")

const hideCreateSection = () => {
    createTaskInput.value = ""
    createTaskSection.style.display = "none"
}

cancelCreateBtn.addEventListener("click", hideCreateSection)

document.addEventListener("DOMContentLoaded", async () => {
    let res = await fetch("http://localhost:8080/api/v1/tasks/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
        }
    })

    let body = await res.json()

    if (!res.ok) {
        console.error(body)
        return
    }

    body.forEach(task => {
        let created = createTask(task["value"])
        created.id = "task"+task["task_id"]
    });
})

confirmCreateBtn.addEventListener("click", async () => {
    if (createTaskInput.value == "")
        return
    let res = await fetch("http://localhost:8080/api/v1/tasks/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
            value: createTaskInput.value
        })
    })

    if (!res.ok) {
        console.error("something went wrong...\n" + await res.json());
        return;
    }

    console.log("created task");
    
    createTask(createTaskInput.value)
    hideCreateSection()
})

const addBtn = document.querySelector(".BtnCheckmarkSection__addbtn--btn")

addBtn.addEventListener("click" , () =>  {
    createTaskSection.style.display = "flex"
})

const createTask = (text) => {
    //create div container
    const taskBlock = document.createElement("div")
    taskBlock.className = "tasks__cont"

    //create textarea
    const input = document.createElement('input');
    input.value = text
    input.className = "tasks__cont--input"
    input.type = "text"
    input.name = "task"
    input.readOnly = true;

    //create buttonDelete
    const btn = document.createElement("button")
    btn.className = "tasks__cont--btnDelete"
    btn.innerHTML = "&times;"

    tasksSection.appendChild(taskBlock)

    taskBlock.appendChild(input);

    taskBlock.appendChild(btn);

    btn.addEventListener("click" , () =>
    {
        taskBlock.remove();
    })

    return taskBlock
}
