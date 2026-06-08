let tasks = [];

// to show the saved tasks
window.onload = function() {
    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    showTasks();
}

// function to add the task
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if(taskText == "") {
        alert("Enter the task");
        return;
    }

    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    input.value = "";   // empty the input box
    showTasks();
}

// function to show the task on screen 
function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    for(let i = 0; i < tasks.length; i++) {
        let li = document.createElement("li");
        li.className = "task-item";
        
        li.innerHTML = `
            <span class="task-text">${tasks[i]}</span>
            <button class="delete-btn">Delete</button>
        `;

        //for task completion 
        li.addEventListener("click", function() {
            li.classList.toggle("completed");
        });

        // delete button
        li.querySelector(".delete-btn").addEventListener("click", function(e) {
            e.stopPropagation();   
            deleteTask(i);
        });

        list.appendChild(li);
    }
}

//function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

// To add task by clicking the  button and pressing enter
document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        addTask();
    }
});