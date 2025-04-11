let addTask = document.getElementById("addTask");
let task = document.getElementById("task");
let tasks = document.getElementById("tasks");

addTask.addEventListener("click", function () {
  if (task.value.trim() === "") {
    return;
  }
  alert(task.value);

  let taskContainer = document.createElement("div");
  taskContainer.className = "taskContainer";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";

  let taskText = document.createElement("span");
  taskText.className = "taskText";
  taskText.textContent = task.value;

  let delBtn = document.createElement("button");
  delBtn.className = "delBtn";
  delBtn.textContent = "X";
  delBtn.addEventListener("click", function () {
    tasks.removeChild(taskContainer);
  });

  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(taskText);
  taskContainer.appendChild(delBtn);
  tasks.appendChild(taskContainer);

  task.value = "";
});
