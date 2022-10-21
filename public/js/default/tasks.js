var taskLists = document.getElementById('taskList')

async function reloadTasks() {
    // reloading everytask
    while (taskLists.firstChild) taskLists.removeChild(taskLists.firstChild); // remove every child from tasks list 

    let response = await fetch('/fetcht')
    let data = await response.json()

    data.forEach(async (task) => {

        let node = document.createElement("div")
        node.classList.add("task")
        node.setAttribute("id", task.id)

        

        // Task title
        let title = document.createElement("h3")
        title.classList.add("title")
        title.innerText = task.title
        node.appendChild(title)

        let rmSubTaskBtn = document.createElement("button")
        rmSubTaskBtn.innerText = "X" // remove text in the button
        rmSubTaskBtn.classList.add("btn", "btn-danger")
        rmSubTaskBtn.style = "border-radius: 20px"
        rmSubTaskBtn.addEventListener("click", (e) => {
            removeTask(task.id)
        })
        node.appendChild(rmSubTaskBtn)
        
        // Adding a form
        let stForm = document.createElement("form")
        stForm.classList.add("stForm")

        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.classList.add("form-control")
        input.style = "display: inline-block"

        input.setAttribute("id", `text-${task.id}`)

        let submit = document.createElement("input")
        submit.setAttribute("type", "submit")
        submit.setAttribute("value", "+")
        submit.classList.add("btn", "btn-outline-success")

        submit.setAttribute("id", `sub-${task.id}`)

        submit.addEventListener("click", (e) => {
            e.preventDefault()
            let inputId = `text-${e.target.id.split("-")[1]}`
            let inputText = document.getElementById(inputId).value
            // console.log(inputText)
            addSubTask(task.id, inputText)
        })


        // appending Children
        stForm.appendChild(input)
        stForm.appendChild(submit)
        node.appendChild(stForm)

        // stForm.addEventListener("click", (e) => {
        //     e.preventDefault()
        // })
        
        // loading the subtasks
        let elementId = node.getAttribute("id")
        let response = await fetch(`/fetchst?id=${elementId}`)
        let data = await response.json()
        
        data.forEach(async (subtask) => {
            let subnode = document.createElement("div")
            subnode.classList.add("subtask")

            // if its completed already
            if (subtask.completer_id)
            {
                let response = await fetch(`/fetchuserbyid/?id=${subtask.completer_id}`)
                let data = await response.json()

                subnode.classList.add("completed")
                let completemsg = document.createElement("span")
                completemsg.innerText = `✓ ${data.username} `
                completemsg.classList.add("completer")
                subnode.appendChild(completemsg)
            }

            
            let subtitle = document.createElement("p")
            subtitle.classList.add("subtitle")
            subtitle.innerText = subtask.title
            subnode.appendChild(subtitle)

            let rmSubTaskBtn = document.createElement("button")
            rmSubTaskBtn.innerText = "X" // remove text in the button
            rmSubTaskBtn.classList.add("btn", "btn-outline-danger")
            rmSubTaskBtn.style = "border-radius: 20px; margin-right: 2px"
            rmSubTaskBtn.addEventListener("click", (e) => {
                removeSubTask(subtask.id)
            })

            if (!subtask.completer_id)
            {
                let completeSubTaskBtn = document.createElement("button")
                completeSubTaskBtn.innerText = "✓"
                completeSubTaskBtn.classList.add("btn", "btn-outline-success")
                completeSubTaskBtn.style = "border-radius: 20px; margin-right: 2px"
                completeSubTaskBtn.addEventListener("click", (e)=> {
                    completeSubTask(subtask.id)
                })
                
                subnode.appendChild(completeSubTaskBtn)
            }
            subnode.appendChild(rmSubTaskBtn)
            
            let notesBtn = document.createElement("a")
            notesBtn.classList.add("btn", "btn-outline-info", "note-btn")
            notesBtn.innerText = "Notes"
            notesBtn.setAttribute("href", `/notes/${subtask.id}`)
            subnode.appendChild(notesBtn)

            node.appendChild(subnode)
        })


        // appending it to the task list in the end
        taskLists.appendChild(node)    
    })
}

async function addTask(taskTitle) {
    fetch('/fetchaddt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: taskTitle})
    })
    .then(response => response.json())
    .then(data => {if (data[0].done) reloadTasks()})
    .catch((err) => console.log(err))
}


async function addSubTask(parentId, subTitle) {
    fetch('/fetchaddst', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({parentid: parentId, title: subTitle})
    })
    .then(response => response.json())
    .then(data => {if (data[0].done) reloadTasks()})
    .catch((err) => console.log(err))
}

async function removeTask(taskId) {
    fetch('/fetchrmt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: taskId})
    })
    .then(response => response.json())
    .then(data => {if (data[0].done) reloadTasks()})
    .catch((err) => console.log(err))
}

async function removeSubTask(subtaskId) {
    fetch('/fetchrmst', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: subtaskId})
    })
    .then(response => response.json())
    .then(data => {if (data[0].done) reloadTasks()})
    .catch((err) => console.log(err))
}


async function completeSubTask(subtaskId) {
    fetch('/fetchcompletest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: subtaskId})
    })
    .then(response => response.json())
    .then(data => {if (data[0].done) reloadTasks()})
    .catch((err) => console.log(err))
}

reloadTasks() // loads all the tasks

document.getElementById("addButton").addEventListener("click", function(e){
    e.preventDefault()
    addTask(document.getElementById("addText").value)
    
})  