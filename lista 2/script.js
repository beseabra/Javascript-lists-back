const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const taskText = taskInput.value;
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('remove-btn');
    li.appendChild(removeButton);

  
    taskList.appendChild(li);
    taskInput.value = '';

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    
    removeButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        li.remove();
    });
});
