// cache selectors
const newTodo = document.querySelector("#new-todo");
const addTodoBtn = document.querySelector("#new-todo-btn");
const todosList = document.querySelector("#todos-list");

// get all saved todos from local storage
myTodosArr = JSON.parse(localStorage.getItem("myTodos")) || []
for (let i = 0; i < myTodosArr.length; i++) {
	let newTodo = document.createElement('li')
	newTodo.innerHTML= myTodosArr[i];
	todosList.append(newTodo);
}

// event handler for add todo button
addTodoBtn.addEventListener("click", function(e) {
  // prevent default form submission
  e.preventDefault();
  createTodo();
})

// event handler for clicking the trash can and li 
todosList.addEventListener("click", function(e) {
  // prevent default form submission
  e.preventDefault();

  // if clicked on the trash can
  if (e.target.tagName === "I") {
    // get todo li. icon -> span -> li : need to go up 2 parent elements
    let li = e.target.parentElement.parentElement;
    // get index of todo that will get removed
    let index = Array.prototype.indexOf.call(todosList.children, li);
    // remove todo from local storage
    removeFromLocalStorage(index);
    // remove todo
    li.remove()

    // if clicked on the li
  } else if (e.target.tagName === "LI") {
    // cross out todo
    e.target.classList.toggle('completed');
  }
})

// remove deleted todos from local storage
function removeFromLocalStorage(index) {
  // get saved todos array from local storage
  let myTodosArr = JSON.parse(localStorage.getItem("todos")) || [];
  // remove selected todo from array
  myTodosArr.splice(index, 1);
  // save array to local storage
  localStorage.setItem("myTodos", JSON.stringify(myTodosArr));
}

// add new todo
function createTodo() {
  // create a new li for each todo 
  const todoLi = document.createElement("li");
  // set the user's todo input as the inner text of li
  todoLi.innerText = newTodo.value;
  // clear user input
  newTodo.value = "";

  //create a new span to use as a remove todo button
  const removeBtn = document.createElement("span");
  // add trash can icon to use as remove button
  removeBtn.innerHTML = `<i class="fas fa-trash"></i> `; 

  // prepend span (remove button) to todo li
  todoLi.prepend(removeBtn);
  // append todo li to the todos list ul
  todosList.append(todoLi);

  // push new todos into todos array
  myTodosArr.push(todoLi.innerHTML);
  // add new todos to local storage so they don't get deleted after page refresh
  localStorage.setItem("myTodos", JSON.stringify(myTodosArr));
}
