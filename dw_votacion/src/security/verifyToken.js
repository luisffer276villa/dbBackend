const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token desde el header de autorización
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, 'llave_secreta', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
