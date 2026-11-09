const form = document.getElementById("task-form");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty">No tasks yet.</li>';
    return;
  }

  tasks
    .slice()
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .forEach((task, index) => {
      const li = document.createElement("li");
      const when = new Date(task.due).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
      });
      li.innerHTML = `<strong>${task.title}</strong><br>${when}
        <button data-index="${index}" class="delete">Delete</button>`;
      list.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;

  tasks.push({ title, due: `${date}T${time}` });
  saveTasks();
  render();
  form.reset();
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    tasks.splice(event.target.dataset.index, 1);
    saveTasks();
    render();
  }
});

render();
