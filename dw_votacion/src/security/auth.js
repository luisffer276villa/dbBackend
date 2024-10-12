const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../server/db.js'); // Asumiendo que tienes un archivo db.js que exporta tu conexión a PostgreSQL
const router = express.Router();

const SECRET_KEY = 'llave segura';

router.post('/login', async (req, res) => {
    const { numeroColegiado, dpi, clave, fechaNacimiento } = req.body;
  
    // Asegúrate de que los datos están llegando correctamente
    console.log("Datos recibidos en el servidor:", req.body);
  
    try {
      // Consulta para buscar al usuario en la base de datos
      console.log("llega hasta este punto?")
      const query = 'SELECT * FROM votaciones.usuarios WHERE numero_colegiado = $1 AND dpi = $2 AND fecha_nacimiento = $3';
      const result = await pool.query(query, [numeroColegiado, dpi, fechaNacimiento]);
      
  
      console.log('Resultado de la consulta:', result.rows);  // Verifica que obtienes resultados
      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado o credenciales incorrectas' });
      }
      
      const user = result.rows[0];
      
      // Verificar la clave
      const claveValida = bcrypt.compareSync(clave, user.contraseña);
      if (!claveValida) {
        return res.status(401).json({ message: 'Clave incorrecta' });
      }
      
  
      // Generación del token JWT
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      console.log('Token generado:', token);  // Verifica que se genera el token correctamente
      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
  

module.exports = router;
