const taskInput =document.querySelector(".task-input input");
taskBox=document.querySelector(".task-box");
addBtn=document.getElementById("add");

let todos=JSON.parse(localStorage.getItem("todo-list"));//getting local storage todo-list

function showTodo(){
    let li="";
    if(todos){
        todos.forEach((todo,id)=> {
            //console.log(id,todo);
            li+=`<li class="task">
                    <label for="${id}">
                        <p>${todo.name}</p>
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                    </label>
                </li>`;
        });
    }
    taskBox.innerHTML =li;
}
showTodo();

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
        showTodo();
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
        showTodo();
    }
});