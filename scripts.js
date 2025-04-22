// Функция для загрузки расписания
function loadSchedule() {
    fetch('http://localhost:3000/api/schedule')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('schedule-body');
            tableBody.innerHTML = ''; // Очищаем таблицу перед добавлением данных

            data.forEach(row => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${row.time}</td>
                    <td>${row.subject}</td>
                    <td>${row.teacher}</td>
                    <td><button onclick="removeClass(this)">Удалить</button></td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Ошибка:', error));
}

// Функция для удаления занятия
function removeClass(button) {
    const row = button.parentNode.parentNode; // Получаем строку таблицы
    row.parentNode.removeChild(row); // Удаляем строку из таблицы
}

// Функция для добавления занятия
document.getElementById('add-class-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const time = document.getElementById('time').value;