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
    let udata = JSON.parse(localStorage.getItem("udata"))
    let res = await fetch("http://localhost:8080/api/v1/tasks/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + udata["jwt"],
        }
    })

    let body = await res.json()

    if (!res.ok) {
        console.error(body)
        return
    }

    body.forEach(task => {
        createTask(task["value"], task["task_id"])
    })
})

confirmCreateBtn.addEventListener("click", async () => {
    if (createTaskInput.value == "")
        return
    let udata = JSON.parse(localStorage.getItem("udata"))
    let res = await fetch("http://localhost:8080/api/v1/tasks/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + udata["jwt"],
        },
        body: JSON.stringify({
            value: createTaskInput.value
        })
    })

    let body = await res.json()

    if (!res.ok) {
        console.error("something went wrong...\n" + body);
        return;
    }

    console.log(`created task ${body["value"]}`);
    
    createTask(createTaskInput.value, body["task_id"])
    hideCreateSection()
})

const addBtn = document.querySelector(".BtnCheckmarkSection__addbtn--btn")

addBtn.addEventListener("click" , () =>  {
    createTaskSection.style.display = "flex"
})

const createTask = (text, taskId) => {
    //create div container
    const taskBlock = document.createElement("div")
    taskBlock.className = "tasks__cont"

    taskBlock.id = "task"+taskId

    //create textarea
    const input = document.createElement('input');
    input.value = text
    input.className = "tasks__cont--input"
    input.type = "text"
    input.name = "task"
    input.readOnly = true;

    //create buttonDelete
    const rmBtn = document.createElement("button")
    rmBtn.className = "tasks__cont--btnDelete"
    rmBtn.innerHTML = "&times;"

    tasksSection.appendChild(taskBlock)

    taskBlock.appendChild(input);

    taskBlock.appendChild(rmBtn);

    rmBtn.addEventListener("click", async () => {
        let udata = JSON.parse(localStorage.getItem("udata"))
        let res = await fetch("http://localhost:8080/api/v1/tasks/del/"+taskId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + udata["jwt"]
            }
        })

        if (!res.ok) {
            console.error(await res.text());
            return
        }
        taskBlock.remove();
    })
}
