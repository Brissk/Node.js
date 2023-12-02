const { count } = require('console');
const express = require('express');
const fs = require('fs');
const joi = require('joi');

const app = express();
app.use(express.json());

const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().max(150).required(),
    city: joi.string().min(1)
})

app.get('/users', (req, res) => {
    if (fs.existsSync('file.json')) {
        fs.stat('file.json', function (err, stats) {
            if (stats.size) {
                const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
                res.send({ file });
            } else {
                res.status(404);
                res.send({ user: null });
            }
        });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.get('/users/:id', (req, res) => {
    if (fs.existsSync('file.json')) {
        fs.stat('file.json', function (err, stats) {
            if (stats.size) {
                const userID = +req.params.id;
                const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
                const user = file.find((user) => user.id === userID);
                if (user) {
                    res.send({ user });
                }
            } else {
                res.status(404);
                res.send({ user: null });
            }
        });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', (req, res) => {
    let lastID = 1;
    if (fs.existsSync('file.json')) {
        fs.stat('file.json', function (err, stats) {
            if (stats.size) {
                let file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
                lastID = file[file.length - 1].id + 1;
                file.push({ id: lastID, ...req.body });
                fs.writeFileSync('file.json', JSON.stringify(file, null, 2));
                res.send({ id: lastID });
            } else {
                fs.writeFileSync('file.json', JSON.stringify([{ id: 1, ...req.body }], null, 2));
                res.send({ id: lastID });
            }
        });
    } else {
        fs.writeFileSync('file.json', JSON.stringify([{ id: 1, ...req.body }], null, 2));
        res.send({ id: lastID });
    }
});

app.put('/users/:id', (req, res) => {
    if (fs.existsSync('file.json')) {
        fs.stat('file.json', function (err, stats) {
            if (stats.size) {
                const result = userSchema.validate(req.body);
                if (result.error) {
                    return res.status(404).send({ error: result.error.details });
                }
                const userID = +req.params.id;
                const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
                const user = file.find((user) => user.id === userID);
                if (user) {
                    const { firstName, secondName, city, age } = req.body;
                    user.firstName = firstName;
                    user.secondName = secondName;
                    user.city = city;
                    user.age = age;
                    fs.writeFileSync('file.json', JSON.stringify(file, null, 2));
                    res.send({ user });
                } else {
                    res.status(404);
                    res.send({ user: null });
                }
            } else {
                res.status(404);
                res.send({ user: null });
            }
        });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    if (fs.existsSync('file.json')) {
        fs.stat('file.json', function (err, stats) {
            if (stats.size) {
                const userID = +req.params.id;
                const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
                const user = file.find((user) => user.id === userID);
                if (user) {
                    const userIndex = file.indexOf(user);
                    file.splice(userIndex, 1);
                    fs.writeFileSync('file.json', JSON.stringify(file, null, 2));
                    res.send({ user });
                } else {
                    res.status(404);
                    res.send({ user: null });
                }
            } else {
                res.status(404);
                res.send({ user: null });
            }
        });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.get('*', (req, res) => {
    res.send('<h1>Error 404</h1>')
});

app.listen(3000);




