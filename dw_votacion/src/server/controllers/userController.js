const pool = require('../db');

exports.createUser = async (req, res) => {
  const { numeroColegiado, dpi, nombre, correo, clave, fechaNacimiento } = req.body;
  console.log(req.body)
  try {
    const result = await pool.query(
      'INSERT INTO votaciones.usuarios ( numero_colegiado,nombre, correo_electronico, dpi, fecha_nacimiento, contraseña,  id_tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [numeroColegiado, nombre ,correo, dpi, fechaNacimiento,clave, 1],
      console.log( [numeroColegiado, nombre ,correo, dpi, fechaNacimiento,clave, 1])
    );
    res.status(201).json(result.rows[0]); // Devuelve el nuevo usuario insertado
  } catch (error) {
    console.log(error + "error al momento de guardar en bd")
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
};
