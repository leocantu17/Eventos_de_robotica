const express = require('express');
const ctrl_evento = require('../controllers/controllers_rt/ctrl_evento');
const ctrl_equipo = require('../controllers/controllers_rt/ctrl_equipo');
const router = express.Router();

router.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
  
    // Verifica las credenciales en la base de datos
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    dbConnection.query(query, [usuario, contraseña], (err, results) => {
      if (err) {
        console.error('Error al verificar las credenciales:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      if (results.length > 0) {
        // Credenciales válidas, crea la sesión
        req.session.authenticated = true;
        req.session.user = usuario;
  
        // Configura la cookie de sesión (puedes ajustar la vigencia según tus necesidades)
        res.cookie('sesion', req.sessionID, { maxAge: 3600000 }); // 1 hora
  
        res.send('Inicio de sesión exitoso');
      } else {
        // Credenciales inválidas
        res.status(401).send('Credenciales inválidas');
      }
    });
  });
  
router.post('/rt-agregar-evento',ctrl_evento.rtAgregarEvento)
router.post('/rt-agregar-equipo',ctrl_equipo.rtAgregarEquipo)

module.exports=router