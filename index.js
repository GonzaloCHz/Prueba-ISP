const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: 'db', 
  user: 'user',
  password: 'secret',
  database: 'app_db'
});
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
  });
app.get('/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/contacts', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO contacts (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contacto añadido', id: result.insertId });
  });
});
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
