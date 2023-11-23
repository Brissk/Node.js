const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const data = {
    "/": 0,
    "/about": 0
}

app.get('/', (req, res) => {
    fs.writeFileSync('file.json', JSON.stringify(data, null, 2));
    const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
    res.send(`<h1>Корневая страница</h1><p>Просмотров: ${file[req.url]}</p><a href="/about">Ссылка на страницу About</a>`);
    data[req.url] = data[req.url] + 1;
});

app.get('/about', (req, res) => {
    fs.writeFileSync('file.json', JSON.stringify(data, null, 2));
    const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
    res.send(`<h1>Страница About</h1><p>Просмотров: ${file[req.url]}</p><a href="/">Ссылка на страницу Main</a>`);
    data[req.url] = data[req.url] + 1;
});

app.get('*', (req, res) => {
    res.send('<h1>Error 404</h1>')
});
const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});




