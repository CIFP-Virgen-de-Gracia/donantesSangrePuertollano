const {Router} = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
// const mids = require("../middlewares/userMiddlewares");

const auth = require('../controllers/authController');
const {midEjemplo} = require('../middlewares/userMiddlewares');
const controlador=require('../controllers/noticiasController');
// auth routes

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/activarusuario/:id', auth.activarUsuario);

module.exports = router;