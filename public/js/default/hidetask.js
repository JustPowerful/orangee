let getTasks = document.querySelectorAll(`.task`)
getTasks.forEach(task => {
        let toggleDiv = task.querySelector("#toggleDiv")
        toggleDiv.style.display = "none"

        let taskId = task.id.replace("display-", "")
        var truthValue = localStorage.getItem(taskId)
        
        if(truthValue === 'true')
        {
            console.log(truthValue)
            let display = task.querySelector("#toggleDiv")
            display.style.display = "block"
            task.querySelector("#toggleSymbol").innerHTML= `<i class="fas fa-angle-down"></i>`
        }


        let taskTitle = task.querySelector(".title")
        // setting click on tasks
        task.addEventListener("click", (e) => {
            if(e.target != e.currentTarget) {return}
            toggleDisplay(taskId)
        })

        taskTitle.addEventListener("click", (e) => {
            if(e.target != e.currentTarget) {return}
            toggleDisplay(taskId)
        })

        
        
        


})


function toggleDisplay(displayId)
{   
    let task = document.getElementById(`display-${displayId}`)
    let toggleDiv = task.querySelector("#toggleDiv")
    if(toggleDiv.style.display === "none")
    {
        toggleDiv.style.display = "block"
        localStorage.setItem(displayId, true) // true means: open
        task.querySelector("#toggleSymbol").innerHTML = `<i class="fas fa-angle-down"></i>`
    } else {
        toggleDiv.style.display = "none"
        localStorage.setItem(displayId, false) // true means: open
        task.querySelector("#toggleSymbol").innerHTML = `<i class="fas fa-angle-up"></i>`
    }
}




