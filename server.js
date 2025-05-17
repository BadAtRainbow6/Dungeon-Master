//const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const path = require('path');
const app = express()
//const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello, World!\n');
//});

app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', function(request, response){
  //  response.sendFile("public/index.html");
//});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
