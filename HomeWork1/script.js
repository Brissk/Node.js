const http = require('http');
const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<a href="/about">Let\'s go to ABOUT</a>');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<a href="/">Let\'s go to MAIN</a>');
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Error 404</h1>');
            break;
    }
});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});