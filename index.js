const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, 'public/html/index.html')));

app.listen(4000, '0.0.0.0', () => console.log('Sudoku Helper is running on 4000'));