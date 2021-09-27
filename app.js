const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log(req.url, req.method);

  res.setHeader('Content-Type', 'application/json');

  const data = JSON.stringify([
    {name: 'Tommy', age: 35},
    {name: 'Alex', age: 40}
  ]);

  res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}...`);
});
