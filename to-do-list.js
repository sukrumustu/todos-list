const toDoInput = document.getElementById("to-do-input");
const toDoButton = document.querySelector(".to-do-button");
const todoUl = document.querySelector("#todo-ul")

const totalTroubles = document.querySelector(".total-troubles");
const totalRelieves = document.querySelector(".total-relieves");
const totalTroublesLeft = document.querySelector(".total-left");



toDoInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        toDoButton.click();
    }
});

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

// console.log(todos.length);

totalTroubles.innerHTML = `My All Troubles : ${todos.length}`;

const renderSavedTodos =() => {
    todos.forEach(todo => {

        createListElement(todo);
        
    });
};

renderSavedTodos();

toDoButton.addEventListener("click", () => {
    if (!toDoInput.value.trim()) {
        alert("Please enter what you want to do.")
    } else {
        const newTodo = {
            id: new Date().getTime(),
            completed: false,
            text: toDoInput.value,
        };

        createListElement(newTodo);
        toDoInput.value = "";
        // toDoInput.focus();

        todos.push(newTodo);

        localStorage.setItem("TODOS", JSON.stringify(todos));

        totalTroubles.innerHTML = `My All Troubles : ${todos.length}`;


    }
}

);

function createListElement(newTodo) {

    const { id, completed, text } = newTodo;
    const li = document.createElement("li");
    li.setAttribute("id", id);

    // newTodo.completed ? li.classList.add("completed") : "";
    newTodo.completed && li.classList.add("checked");

    const okIcon = document.createElement("i");
    okIcon.setAttribute("class", "fas fa-check");
    li.appendChild(okIcon);

    const p = document.createElement("p");
    const ptextNode = document.createTextNode(text);
    p.appendChild(ptextNode);
    li.appendChild(p);

    const delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fas fa-trash");
    li.appendChild(delIcon);

    todoUl.appendChild(li);

};

todoUl.addEventListener("click", (e) => {

    const id = e.target.parentElement.getAttribute("id");;

    if (e.target.classList.contains("fa-trash")) {
        e.target.parentElement.remove();

        todos = todos.filter((todo) => todo.id !== Number(id));
        localStorage.setItem("TODOS", JSON.stringify(todos));
        totalTroubles.innerHTML = `My All Troubles : ${todos.length}`;

    }

    let relieves = 0;
    let troublesLeft =0;

    if (e.target.classList.contains("fa-check")) {
        e.target.parentElement.classList.toggle("checked")
        
        todos.forEach(todo => {
            if (todo.id === Number(id)) {
            todo.completed = !todo.completed;
    }
        });

        localStorage.setItem("TODOS", JSON.stringify(todos));
        relieves = todos.filter((todo) => todo.completed)
        troublesLeft = todos.filter((todo)=> !todo.completed)
        totalRelieves.innerHTML = `Total Relieves : ${relieves.length}`;
        totalTroublesLeft.innerHTML = `Total Troubles Left : ${troublesLeft.length}`;
    }
});

window.onload = () => {
    toDoInput.focus();

}


