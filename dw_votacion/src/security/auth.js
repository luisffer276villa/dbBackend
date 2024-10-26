const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../server/db.js'); // Conexión a PostgreSQL
const router = express.Router();

// Llave secreta movida a las variables de entorno
const SECRET_KEY = "clave_secreta_dw";

router.post('/login', async (req, res) => {
  console.log('Secret key auth:', SECRET_KEY); // Asegúrate de que esto imprima el valor correcto
  console.log('Solicitud recibida en /auth/login');
  const { numeroColegiado, dpi, clave, fechaNacimiento } = req.body;
  console.log("Datos recibidos en el backend desde el auth:", req.body);

  try {
    // Consulta para buscar al usuario en la base de datos
    const query = 'SELECT * FROM votaciones.usuarios WHERE numero_colegiado = $1 AND dpi = $2 AND fecha_nacimiento = $3';
    const result = await pool.query(query, [numeroColegiado, dpi, fechaNacimiento]);
    console.log(result.data)
    // Si el usuario no existe, responde con error
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado o credenciales incorrectas desde el auth' });
    }

    const user = result.rows[0];
    console.log(user)
    // Verificar la clave con bcrypt
    const claveValida = await bcrypt.compare(clave, user.contraseña);
    if (!claveValida) {
      return res.status(401).json({ message: 'Clave incorrecta' });
    }

    // Generar el token JWT si las credenciales son correctas
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Retornar el token y el tipo de usuario al cliente
    return res.json({ token, id_tipo_usuario: user.id_tipo_usuario });  // Asegúrate de que el campo "tipo" existe en la base de datos

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});


module.exports = router;
