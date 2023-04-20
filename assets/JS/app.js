const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");



const validadeInput = () =>  inputElement.value.trim().length > 0;


const handleAddTask = () => {
    const inputIsValid = validadeInput();

    console.log(inputIsValid);

    if (!inputIsValid){
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement ('div');
        taskItemContainer.classList.add ('task-item');

    const taskContent = document.createElement('p');
        taskContent.innerText = inputElement.value;

        taskContent.addEventListener ('click', () => handleClick(taskContent))

    const deleteItem = document.createElement ('i');
        deleteItem.classList.add ('fa-solid');
        deleteItem.classList.add ('fa-trash-can'); 

        deleteItem.addEventListener ('click', () =>
         handleDeleteClick(taskItemContainer, taskContent)
        );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage()
};

const handleClick = (taskContent) =>{

    const tasks = tasksContainer.childNodes;

    for (const task of tasks)  {
        const currentTaskIsBeingClicek = task.firstChild.isSameNode(taskContent);

        if (currentTaskIsBeingClicek){
            task.firstChild.classList.toggle('completed');
        }
    }
    updateLocalStorage()
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const task = tasksContainer.childNodes;
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicek = task.firstChild.isSameNode(taskContent);
        
        if ( currentTaskIsBeingClicek) {
            taskItemContainer.remove()
        }
    }
    updateLocalStorage()
};

const handleInputChange = () => {
    const inputIsValid = validadeInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed')

        return {description: content.innerText, isCompleted: isCompleted};

    });

   localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

const refeshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    
    //if (!tasksFromLocalStorage) return;
   

   for (const tasks of tasksFromLocalStorage){
    const taskItemContainer = document.createElement ('div');
    taskItemContainer.classList.add ('task-item');

const taskContent = document.createElement('p');
    taskContent.innerText = tasks.description;

    if (tasks.isCompleted){
        taskContent.classList.add('completed');
    }

    taskContent.addEventListener ('click', () => handleClick(taskContent))

const deleteItem = document.createElement ('i');
    deleteItem.classList.add ('fa-solid');
    deleteItem.classList.add ('fa-trash-can'); 

    deleteItem.addEventListener ('click', () =>
     handleDeleteClick(taskItemContainer, taskContent)
    );

taskItemContainer.appendChild(taskContent);
taskItemContainer.appendChild(deleteItem);

tasksContainer.appendChild(taskItemContainer);
   }
}

refeshTasksUsingLocalStorage();


addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
