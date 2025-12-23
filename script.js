// Getting elements
const task_input = document.getElementById("task_input");
const Add_btn = document.getElementById("Add_btn");
const task_list = document.getElementById("task_list");
const msg = document.getElementById("msg");

let editing_task = null;

// Remove initial space
task_input.addEventListener("input", () => {
    task_input.value = task_input.value.replace(/^\s+/, "");
});

// ---------- Local Storage Functions ----------
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- Display Tasks ----------
function displayTasks() {
    task_list.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {
        createTask(task.text, index);
    });
}

// ---------- Create Task ----------
function createTask(taskValue, index) {

    let list = document.createElement("li");
    list.className = "Listed_LIST";

    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = taskValue;

    let Button_wrapper = document.createElement("div");
    Button_wrapper.className = "Button_wrapper";

    // Edit button
    let edit_btn = document.createElement("button");
    edit_btn.innerText = "Edit";
    edit_btn.className = "edit_btn";
    edit_btn.addEventListener("click", () => {
        task_input.value = taskValue;
        editing_task = index;
        Add_btn.innerText = "Update";
    });

    // Delete button
    let delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete";
    delete_btn.className = "del_btn";
    delete_btn.addEventListener("click", () => {
        let tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks();
    });

    Button_wrapper.appendChild(edit_btn);
    Button_wrapper.appendChild(delete_btn);

    list.appendChild(taskText);
    list.appendChild(Button_wrapper);
    task_list.appendChild(list);
}

// ---------- Add / Update Task ----------
Add_btn.addEventListener("click", () => {

    if (task_input.value === "") {
        msg.innerText = "PLEASE ENTER THE TASK";
        return;
    }

    let tasks = getTasks();

    // UPDATE MODE
    if (editing_task !== null) {
        tasks[editing_task].text = task_input.value;
        saveTasks(tasks);
        editing_task = null;
        Add_btn.innerText = "Add";
        task_input.value = "";
        displayTasks();
        return;
    }

    // ADD MODE
    tasks.push({ text: task_input.value });
    saveTasks(tasks);
    displayTasks();

    task_input.value = "";
    msg.innerText = "";
});

// Load tasks on page load
window.onload = displayTasks;











