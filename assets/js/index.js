document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Listen for Enter key in input field
    document.getElementById("taskInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("tasks");
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="icons">
            <span class="check" onclick="completeTask(this)">✔</span>
            <span class="delete" onclick="removeTask(this)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path d="M5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V8H21V6H17V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V6H3V8H5V20ZM9 4H15V6H9V4ZM8 8H17V20H7V8H8Z" fill="black"/>
<path d="M9 10H11V18H9V10ZM13 10H15V18H13V10Z" fill="black"/>
</g>
</svg>
</span>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function completeTask(element) {
    let taskItem = element.closest("li");
    taskItem.classList.toggle("completed");
    element.classList.toggle("completed");
    saveTasks();
}

function removeTask(element) {
    let taskItem = element.closest("li");
    taskItem.remove();
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#tasks li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    let taskList = document.getElementById("tasks");
    JSON.parse(storedTasks).forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="icons">
                <span class="check ${task.completed ? 'completed' : ''}" onclick="completeTask(this)">✔</span>
                <span class="delete" onclick="removeTask(this)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path d="M5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V8H21V6H17V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V6H3V8H5V20ZM9 4H15V6H9V4ZM8 8H17V20H7V8H8Z" fill="black"/>
<path d="M9 10H11V18H9V10ZM13 10H15V18H13V10Z" fill="black"/>
</g>
</svg>
</span>
            </div>
        `;
        if (task.completed) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
    });
}
