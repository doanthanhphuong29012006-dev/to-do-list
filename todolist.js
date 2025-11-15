document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textbox');
    const addButton = document.getElementById('add-task-button');
    const taskListContainer = document.getElementById('todo-list-container');

    let taskIdCnt = 4;

    function addTask () {
        const taskText = textInput.value.trim();

        if (taskText === '') {
            alert('Vui lòng nhập nội dung!!!');
            return;
        }

        const taskId = 'task' + taskIdCnt;
        taskIdCnt++;

        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        todoItem.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}">${taskText}</label>
                <i class="fa-solid fa-trash delete-button"></i>
            `;

        taskListContainer.appendChild(todoItem);

        textInput.value = '';
    }

    function deleteTask (event) {
        if (event.target.classList.contains('delete-button')) {
            const taskItem = event.target.closest('.todo-item');

            taskItem.remove();
        }
    }

    addButton.addEventListener('click', addTask);
    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskListContainer.addEventListener('click', deleteTask);
});