const taskInput =document.querySelector(".task-input input");
taskBox=document.querySelector(".task-box");
addBtn=document.getElementById("add");

filters=document.querySelectorAll(".filters span");

let todos=JSON.parse(localStorage.getItem("todo-list"));//getting local storage todo-list

filters.forEach(btn => {
    btn.addEventListener("click",()=>{
        //console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id)
    })   
})

//Display todo lists
function showTodo(view){
    let li="";
    if(todos){
        todos.forEach((todo,id)=> {
            //console.log(id,todo);
            let isCompleted =todo.status == "completed" ? "checked" : "";

            //add list according to view/filter
            if(view == todo.status || view == "all"){
                li+=`<li class="task">
                        <label for="${id}">
                            <p class="${isCompleted}">${todo.name}</p>
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}"${isCompleted}>
                        </label>
                    </li>`;
            }
        });
    }
    //display h2 if li is empty
    taskBox.innerHTML =li || `<h2>You don't have any tasks yet. Create a new one.</h2>`;
}
showTodo("all");


//When checkbox is clicked
function updateStatus(selected){
    //console.log(selected);
    let taskName=selected.parentElement.firstElementChild;//input>>parent[label]>>firstChild[p]
    //console.log(taskName);
    if(selected.checked){
        taskName.classList.add("checked");
        //update status of selected card to completed
        todos[selected.id].status="completed";
    }
    else{
        taskName.classList.remove("checked");
        //update statusof selected card to pending
        todos[selected.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}


//When task is added in text box
taskInput.addEventListener("keyup", e => {
    let userTask =taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        taskInput.value="";
        
        if(!todos){//if todo's dont exist create new array
            todos=[];
        }
        let taskInfo={name:userTask,status:"pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});

addBtn.addEventListener("click",function () {
    let userTask =taskInput.value.trim();
    if(userTask){
        taskInput.value="";
        
        if(!todos){//if todo's dont exist create new array
            todos=[];
        }
        let taskInfo={name:userTask,status:"pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});


// Search
const searchInput = document.querySelector(".search input");
searchInput.addEventListener("input", function () {
    let searchQuery = searchInput.value.trim();
    showMatch( searchQuery);
});

// search functionality
function showMatch( searchQuery) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            
            let isCompleted =todo.status == "completed" ? "checked" : "";

            // Check if the task name includes the search query
            if (todo.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                li += `<li class="task">
                        <label for="${id}">
                            <p class="${isCompleted}">${todo.name}</p>
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}"${isCompleted}>
                        </label>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<h2>No matching tasks found.</h2>`;
}