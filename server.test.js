const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = require('./server'); // Предполагается, что ваш сервер экспортируется из server.js

// Подключение к базе данных
const db = new sqlite3.Database('./fulling.sql');

beforeAll((done) => {
    db.run('CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT NOT NULL, subject TEXT NOT NULL, teacher TEXT NOT NULL)', done);
});

afterAll((done) => {
    db.close(done);
});

describe('API тесты', () => {
    it('GET /api/schedule - должно вернуть список занятий', async () => {
        const response = await request(app).get('/api/schedule');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /api/schedule - должно добавлять занятие', async () => {
        const newClass = { time: '15:00 - 16:30', subject: 'География', teacher: 'Смирнов С.С.' };
        const response = await request(app).post('/api/schedule').send(newClass);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.time).toBe(newClass.time);
        expect(response.body.subject).toBe(newClass.subject);
        expect(response.body.teacher).toBe(newClass.teacher);
    });

    it('DELETE /api/schedule/:id - должно удалять занятие', async () => {
        const response = await request(app).delete('/api/schedule/1'); // Замените 1 на ID существующего занятия
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('deletedID');
    });
});