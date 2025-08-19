const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
const pendingTasks = document.getElementById("pending-tasks");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    if (todo.editing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          todos[index].text = editInput.value.trim();
          todos[index].editing = false;
          saveTodos();
          renderTodos();
        }
      });
      li.appendChild(editInput);
    } else {
      const span = document.createElement("span");
      span.textContent = todo.text;
      span.addEventListener("dblclick", () => {
        todos[index].editing = true;
        renderTodos();
      });
      li.appendChild(span);
    }

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });

  pendingTasks.textContent = `You have ${todos.length} pending task${
    todos.length !== 1 ? "s" : ""
  }`;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text, editing: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
});

clearBtn.addEventListener("click", () => {
  todos = [];
  saveTodos();
  renderTodos();
});

// Load ban đầu
renderTodos();
