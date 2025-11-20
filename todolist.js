document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textbox');
    const addButton = document.getElementById('add-task-button');
    const taskListContainer = document.getElementById('todo-list-container');

    function loadTask () {
        const tasks = JSON.parse(localStorage.getItem('myTask')) || [];

        tasks.forEach (task => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';

            const isChecked = task.checked ? 'checked' : '';

            todoItem.innerHTML = `
                <input type="checkbox" id="${task.id}" ${isChecked}>
                <label for="${task.id}">${task.text}</label>
                <i class="fa-solid fa-trash delete-button"></i>
            `;

            taskListContainer.appendChild(todoItem);
        });
    }

    function saveTask () {
        const tasks = [];
        const taskItems = document.querySelectorAll('.todo-item');

        taskItems.forEach(item => {
            const input = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');

            tasks.push({
                id: input.id,
                text: label.innerText,
                checked: input.checked
            });
        });

        localStorage.setItem('myTask', JSON.stringify(tasks));
    }

    function addTask () {
        const taskText = textInput.value.trim();

        if (taskText === '') {
            alert('Vui lòng nhập nội dung!!!');
            return;
        }

        const taskId = 'task-' + Date.now();

        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        todoItem.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}">${taskText}</label>
                <i class="fa-solid fa-trash delete-button"></i>
            `;

        taskListContainer.appendChild(todoItem);

        textInput.value = '';
        saveTask();
    }

    function deleteTask (event) {
        if (event.target.classList.contains('delete-button')) {
            const taskItem = event.target.closest('.todo-item');

            taskItem.remove();
            saveTask();
        }

        if (event.target.type === 'checkbox') {
            saveTask();
        }
    }

    loadTask();

    addButton.addEventListener('click', addTask);
    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskListContainer.addEventListener('click', deleteTask);
});
