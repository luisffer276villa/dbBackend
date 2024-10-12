const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de tener tu modelo de usuario configurado

const router = express.Router();

router.post('/login', async (req, res) => {
  const { numeroColegiado, dpi, clave, fechaNacimiento } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { numeroColegiado, dpi, fechaNacimiento } });
    if (!user) {
      console.log("es este el comentario?")
      return res.status(400).json({ message: 'Usuario no encontradasdfasdo' });
    }

    // Verificar la clave
    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      return res.status(400).json({ message: 'Clave incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id }, 'llave_secreta', { expiresIn: '1h' });
    
    // Enviar token al frontend
    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
