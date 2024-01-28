document.addEventListener('DOMContentLoaded', function() {
    loadTodoList();
});

function addTodo() {
    var todoInput = document.getElementById("todo-input");
    var todoList = document.getElementById("todo-list");
    var selectedDate = document.getElementById("todo-date").value;

    if (selectedDate.trim() === "") {
        alert("Please select a date.");
        return;
    }

    var todos = getStoredTodos(selectedDate);

    if (todoInput.value.trim() !== "") {
        var todoItem = {
            text: todoInput.value,
            timestamp: new Date().getTime(),
            completed: false
        };
        todos.push(todoItem);
        updateStoredTodos(selectedDate, todos);

        var todoItemElement = createTodoItemElement(todoItem);
        todoList.appendChild(todoItemElement);

        todoInput.value = "";
    }
}

function completeTodo(button) {
    var todoItemElement = button.parentNode;
    var selectedDate = document.getElementById("todo-date").value;

    var todos = getStoredTodos(selectedDate);
    var timestamp = parseInt(todoItemElement.getAttribute('data-timestamp'), 10);

    todos.forEach(function(todo) {
        if (todo.timestamp === timestamp) {
            todo.completed = true;
        }
    });

    updateStoredTodos(selectedDate, todos);
    todoItemElement.classList.add('completed');
    setTimeout(function() {
        todoItemElement.remove();
    }, 1000);
}

function loadTodoList() {
    var todoList = document.getElementById("todo-list");
    var selectedDate = document.getElementById("todo-date").value;

    var todos = getStoredTodos(selectedDate);
    todoList.innerHTML = "";

    todos.forEach(function(todo) {
        var todoItemElement = createTodoItemElement(todo);
        todoList.appendChild(todoItemElement);
    });
}

function getStoredTodos(date) {
    var storedTodos = localStorage.getItem(date) || '[]';
    return JSON.parse(storedTodos);
}

function updateStoredTodos(date, todos) {
    localStorage.setItem(date, JSON.stringify(todos));
}

function createTodoItemElement(todo) {
    var todoItemElement = document.createElement("div");
    todoItemElement.className = "todo-item" + (todo.completed ? ' completed' : '');
    todoItemElement.setAttribute('data-timestamp', todo.timestamp);

    todoItemElement.innerHTML = `
        <span>${todo.text}</span>
        <button class="complete-button" onclick="completeTodo(this)">Complete</button>
    `;

    return todoItemElement;
}
