const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write(
            `<html><head>Enter User</head>
             <body><h1>Welcome</h1>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                </ul>
                <form action="/user" method="POST">
                    <input type="text" name="user">
                    <button type="submit"></button>
                </form>
            </body>
            </html>`

            // `<html>
            // <head><title>Enter Message</title></head>
            // <body>
            //     <form action="/message" method="POST">
            //         <input type="text" name="message">
            //         <button type="submit">Submit</button>
            //     </form>
            // </body>
            // </html>
            // `
        
        );
        return res.end();
    }
    if (url === '/user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            //console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            fs.writeFile('user.txt', user, (err) => {
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

module.exports = requestHandler;



// const fs = require('fs');

// const requestHandler = (req, res) => {
//     const url = req.url;
//     const method = req.method;

//     if (url === '/') {
//         res.write(
//             `<html><head></head>
//             <body><h1>Welcome</h1>
//                 <ul>
//                 <li>User 1</li>
//                 <li>User 2</li>
//                 <li>User 3</li>
//                 </ul>
//                 <form action="/user" method="POST">
//                     <label for="user">User Name</label>
//                     <input type="text" name="user">
//                     <button type="submit"></button>
//                 </form>
//             </body>
//             </html>`
//         );
//         return res.end();
//     }  
//     if (url === '/user' && method === 'POST') {
//         const body = [];
//         req.on('data', chunk => {
//             //console.log(chunk);
//             body.push(chunk);
//         });
//         return req.on('end', () => {
//             const parsedBody = Buffer.concat(body).toString();
//             //what is it doing here?
//             const user = parsedBody.split('=')[1];
//             fs.writeFile('user.txt', user, (err) => {
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 return res.end();
//             });          
//         });
//     }
//     res.setHeader('Content-Type', 'text/html');
//     res.write(
//         `<html>
//             <head><title>My First Page</title></head>
//             <body><h1>Hello from my Node.js Server!</h1></body>
//         </html>`
//     );
//     res.end();     
// };

// module.exports = requestHandler;