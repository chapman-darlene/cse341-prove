const http = require('http');
//const routes = require('./route01');

//const server = http.createServer(routes);

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html><head>Assignment01</head>
             <body><h1>Welcome</h1>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="submit"></button>
                </form>
            </body>
            </html>`
        );
        return res.end();
    }
    if (url === '/users') {
         res.setHeader('Content-Type', 'text/html');
         res.write(
            `<html><head>Assignment01</head>
             <body><h1>Welcome Users</h1>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                </ul>
            </body>
            </html>`
         );
        return res.end();
    }
    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        });
    }
    //can add default code html response with page not found

});

server.listen(3000);