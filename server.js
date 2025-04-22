const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

 Подключение к базе данных
const db = new sqlite3.Database('.schedule.db');

 Используем CORS для разрешения запросов с клиента
app.use(cors());

 Получение расписания
app.get('apischedule', (req, res) = {
    const sql = `
        SELECT classes.time, subjects.name AS subject, teachers.name AS teacher
        FROM classes
        JOIN subjects ON classes.subject_id = subjects.id
        JOIN teachers ON classes.teacher_id = teachers.id
    `;
    db.all(sql, [], (err, rows) = {
        if (err) {
            res.status(500).json({ error err.message });
            return;
        }
        res.json(rows);
    });
});

 Запуск сервера
app.listen(PORT, () = {
    console.log(`Сервер запущен на httplocalhost${PORT}`);
});
// Добавление занятия
app.post('/api/schedule', (req, res) => {
    const { time, subject, teacher } = req.body;
    const sql = 'INSERT INTO schedule (time, subject, teacher) VALUES (?, ?, ?)';
    db.run(sql, [time, subject, teacher], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, time, subject, teacher });
    });
});

// Удаление занятия
app.delete('/api/schedule/:id', (req, res) => {
    const sql = 'DELETE FROM schedule WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: req.params.id });
    });
});
module.exports = app; // Экспортируем приложение