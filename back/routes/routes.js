const {Router} = require('express');
const router = Router();
// const mids = require("../middlewares/userMiddlewares");

const auth = require('../controllers/authController');

// auth routes

router.post('/login', auth.login);
router.post('/register', auth.register);
// router.post('/cerrarsesion{id}', auth.cerrarSesion);
router.get('/activarusuario/:id', auth.activarUsuario);


module.exports = router;