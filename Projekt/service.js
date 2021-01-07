// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//     res.statusCode =200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello world');
// })

// server.listen(port, hostname, () => {
//     console.log('server running at http://'+hostname+':'+port+'/');
// });

// const express = require('express');
// const app = express();

// app.get('/student', function(req, res){
//     res.send("student: h18linwe@du.se")
// })

// app.listen(3000);

const express = require('express');
const ex = require('./express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const { uppProduct } = require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/', routes);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("lyssnar på port 3000");
});