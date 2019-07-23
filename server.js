const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(80, () => {
  console.log('App listen on port 80');
});
