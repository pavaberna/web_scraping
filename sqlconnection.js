import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Hiba a kapcsolódás során: ' + err.stack);
    return;
  }
  console.log('Csatlakozva mint ' + connection.threadId);
});

connection.query('SELECT * FROM appdb.registration', (err, results, fields) => {
  if (err) {
    console.error('Lekérdezési hiba: ' + err.stack);
    return;
  }
  console.log(results);
});

connection.end();