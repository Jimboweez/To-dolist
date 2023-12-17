//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo)

//Functions

function addTodo(event){
    
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to local strorage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check">Check</i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash">-</i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //appened to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value="";
}

function deleteCheck(e){
    
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        //if(!todo.classList.contains("completed")){
            //removeLocalTodos(todo);
            //console.log(todo);
            //saveLocalTodosChacked();
        //}
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                  }
                break;
        }
    })
}

function saveLocalTodos(todo){
    //CHECK
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTodosChacked(todo){
    //CHECK
    let todos;
    if(localStorage.getItem("todosCH")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todosCH"));
    }
    todos.push(todo);
    localStorage.setItem("todosCH", JSON.stringify(todos));
}

function getTodos(){
    //check
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check">Done</i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash">-</i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //appened to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}
setInterval(function(){
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;}, 1000); 