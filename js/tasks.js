const form = document.getElementById("taskForm");
const nameInput = document.getElementById("taskName");
const descInput = document.getElementById("taskDesc");
const dueInput = document.getElementById("taskDue");
const saveBtn = document.getElementById("saveBtn");
const searchBox = document.getElementById("searchBox");
const statusFilter = document.getElementById("statusFilter");
const sortBy = document.getElementById("sortBy");
const taskTable = document.getElementById("taskTable");

// This stays set while the form is editing an existing task.
let editingId = null;


// Escape task text before putting it into the table HTML.
function safe(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


// Rebuild the table using the current search, filter, and sort settings.
function showTasks() {
  const allTasks = getList("tasks");
  const search = searchBox.value.toLowerCase();


  const tasks = allTasks.filter(function (task) {
    const statusOk = statusFilter.value === "all" || task.status === statusFilter.value;
    const textOk = (task.name + " " + task.description).toLowerCase().includes(search);
    return statusOk && textOk;
  });


  tasks.sort(function (a, b) {
    if (sortBy.value === "name") return a.name.localeCompare(b.name);
    return a.due.localeCompare(b.due);
  });


  taskTable.innerHTML = "";
  for (const task of tasks) {
    const done = task.status === "completed";
    taskTable.innerHTML += `
      <tr>
        <td>${safe(task.name)}</td>
        <td>${safe(task.description)}</td>
        <td>${task.due}</td>
        <td><span class="badge ${done ? "bg-success" : "bg-warning text-dark"}">${task.status}</span></td>
        <td>
          <button class="btn btn-sm btn-success" data-action="complete" data-id="${task.id}" ${done ? "disabled" : ""}>Done</button>
          <button class="btn btn-sm btn-primary" data-action="edit" data-id="${task.id}">Edit</button>
          <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${task.id}">Delete</button>
        </td>
      </tr>`;
  }


  const completed = allTasks.filter(function (t) { return t.status === "completed"; }).length;
  document.getElementById("totalCount").textContent = allTasks.length;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = allTasks.length - completed;
}


// Save a new task or update the one currently being edited.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  form.classList.add("was-validated");
  if (!form.checkValidity()) return;

  const tasks = getList("tasks");

  if (editingId === null) {
    tasks.push({
      id: Date.now(),
      name: nameInput.value,
      description: descInput.value,
      due: dueInput.value,
      status: "pending"
    });
    addActivity("Task added: " + nameInput.value);
  } else {
    const task = tasks.find(function (t) { return t.id === editingId; });
    task.name = nameInput.value;
    task.description = descInput.value;
    task.due = dueInput.value;
    addActivity("Task edited: " + task.name);
    editingId = null;
    saveBtn.textContent = "Add Task";
  }

  saveList("tasks", tasks);
  form.reset();
  form.classList.remove("was-validated");
  showTasks();
});


// One listener handles buttons for every task row.
taskTable.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  let tasks = getList("tasks");
  const task = tasks.find(function (t) { return t.id === id; });

  if (button.dataset.action === "edit") {
    nameInput.value = task.name;
    descInput.value = task.description;
    dueInput.value = task.due;
    editingId = id;
    saveBtn.textContent = "Save Changes";
    nameInput.focus();
    return;
  }

  if (button.dataset.action === "complete") {
    task.status = "completed";
    addActivity("Task completed: " + task.name);
  }

  if (button.dataset.action === "delete") {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    addActivity("Task deleted: " + task.name);
  }

  saveList("tasks", tasks);
  showTasks();
});


// Refresh the list whenever one of the controls changes.
searchBox.addEventListener("input", showTasks);
statusFilter.addEventListener("change", showTasks);
sortBy.addEventListener("change", showTasks);

showTasks();
