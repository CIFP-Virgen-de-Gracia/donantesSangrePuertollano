const {Router} = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const contenido = require('../controllers/contenidoController');

// Mario y Alicia
// auth routes
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/activarCorreo/:id', auth.activarCorreo);
router.get('/puedeModificar/:id', auth.puedeModificar);
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd);
router.post('/recuperarpasswd/:id', auth.recuperarPasswd);
router.get('/activarNewsletter/:id', auth.activarNewsletter);


// user routes
router.post('/suscripcionNewsletter', user.suscripcionNewsletter);


// Contenido routes
router.get('/getHistoria', contenido.getHistoria);
router.get('/getCargosJunta', contenido.getCargosJunta);
router.get('/getIntegrantesCargo', contenido.getIntegrantesCargo);
router.put('/updateConfigHermandad', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.updateConfigHermandad);




module.exports = router;