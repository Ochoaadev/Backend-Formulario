const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'dataform', 
});

// Conectando base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

//Middleware
app.use(express.urlencoded({ extended: true }));

// Ruta para procesar el formulario
app.post('/form', (req, res) => {
  const { Nombre_Apellido, Correo, Numero_telf, Mensaje } = req.body;

  // Inserta los datos en la base de datos
  const sql = `INSERT INTO contactos (Nombre_Apellido, Correo, Numero_telf, Mensaje) 
               VALUES (?, ?, ?, ?)`;
  connection.query(sql, [Nombre_Apellido, Correo, Numero_telf, Mensaje], (error, results) => {
    if (error) {
      console.error('Error al insertar los datos: ' + error.stack);
      return res.status(500).send('Error al insertar los datos en la base de datos');
    }

    return res.send('Datos insertados correctamente en la base de datos');
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto:${port}`);
});
