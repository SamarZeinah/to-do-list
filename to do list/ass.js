//call elements
let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let taskDiv=document.querySelector(".tasks");

//empty array to store tasks
let arrayOftasks=[];
//check if there tasks in local storage
if(localStorage.getItem("taks")){
    //make empty array contain data that is in local storage
    arrayOftasks=JSON.parse(localStorage.getItem("tasks"));
}

// #3# call function to work
getDatafromLocalStorage();

//add task(check if input palce have value or not)
submit.onclick=function(){
    //input filed have value
    //start to add tasks to array and Distribute the elements"array" in the page and local storage
    if(input.value!==""){
     //function used to add task to array of tasks   
    addTasktoArray(input.value)
    // empty input filed after submit value
    input.value="";
    }
};
                                       //start using my elements
//click on task element  "update and delete"
taskDiv.addEventListener("click",(e)=>{
    //access delete button
    if(e.target.classList.contains("del")){
        //remove element from page
        //span child element from parent
        e.target.parentElement.remove();
        // function call to remove element from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    //task element(update of task)
    //this mean click on task element
    if(e.target.classList.contains("task")){
       //Toggle completed with the task
        toggleStatusTaskwith(e.target.getAttribute("data-id"));

        // If the task is there we will remove it 
        // and if it is not there we will add it
        e.target.classList.toggle("done");
    }
    
});

//establishing function that take parameter"taskText"==>value put in input filed
function addTasktoArray(taskText){
// task data "object contain data"
const task={
    id:Date.now(),
    title: taskText,
    // The situation is false because it hasn't been done yet
    completed:false,
};
//push task data to array
arrayOftasks.push(task)
                                           // #1# add tasks"array"To the page
addElementsToPageFrom(arrayOftasks);  
                                           // #2# add tasks to local storage
addDataToLocalStorageFrom(arrayOftasks);                                          
}
//  #1# establishing function that add Elements To Page From(arrayOftasks)
function addElementsToPageFrom(arrayOftasks){
//empty tasks div
taskDiv.innerHTML="";
//looping on array of tasks
arrayOftasks.forEach((task) => {

    // creat main div of the tasks
    let div=document.createElement("div");
    div.className="task";
    // in case the check line is achieved ==>Over ride on the line before it
    //check if task is done
    if(task.completed){
        div.className="task done";
    }
    div.setAttribute("data-id",task.id);
    // put task.title in this div "The words that the person wrote"
    div.appendChild(document.createTextNode(task.title));
    //creat button of delete in div of tasks
    let span=document.createElement("span");
    span.className="del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    //add task div to tasks container to apper in page
    taskDiv.appendChild(div);
});
}
// #2# establishing function that add Elements To local storage From(arrayOftasks)
function addDataToLocalStorageFrom(arrayOftasks){
    //JSON.stringify==>convert javaScript object notation to string
window.localStorage.setItem("tasks",JSON.stringify(arrayOftasks));
}
// #3#
function getDatafromLocalStorage(){
    //start to take tasks
    let data=window.localStorage.getItem("tasks");
    //if there is a task
    if(data){
        //tasks==>array that have data in local storage
        let tasks=JSON.parse(data);
        //when reload pade data in divThe data remains available
        addElementsToPageFrom(tasks);
    }
}
// function used to remove element from local storage
// will return all the ids except this id
function deleteTaskWith(taksId){
    //loop on element in array of tasks

                       //for explain only
//     for(let i=0;i<arrayOftasks.length;i++){
// console.log(`${arrayOftasks[i].id}===${taksId}`);
//     }

//the filtration phase is over
arrayOftasks=arrayOftasks.filter((task)=> task.id!=taksId);
addDataToLocalStorageFrom(arrayOftasks);
}

function toggleStatusTaskwith(taksId){
    for(let i=0;i<arrayOftasks.length;i++){
        if(arrayOftasks[i].id==taksId){
arrayOftasks[i].completed==false?(arrayOftasks[i].completed=true):(arrayOftasks[i].completed=false)
        }
            }
            addDataToLocalStorageFrom(arrayOftasks);
}