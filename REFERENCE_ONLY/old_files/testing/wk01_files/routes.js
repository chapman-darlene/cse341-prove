const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write(
            `<html>
            <head><title>Enter Message</title></head>
            <body>
                <form action="/message" method="POST" class="input_message">
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
            `);
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            //console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });          
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write(
        `<html>
            <head><title>My First Page</title></head>
            <body><h1>Hello from my Node.js Server!</h1></body>
        </html>`
    );
    res.end();
};

//various ways to export the module

//module.exports = requestHandler;

//module.exports.handler = requestHandler;
//module.exports.someText = 'You can do this';

//exports.handler = requestHandler;
//exports.someText = 'You can do this';

//export as an object
module.exports = {
    handler: requestHandler,
    SomeText: 'You can do this!'
};