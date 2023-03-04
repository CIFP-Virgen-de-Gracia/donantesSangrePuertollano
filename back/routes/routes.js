const {Router} = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const contenido = require('../controllers/contenidoController');

// Mario y Alicia
// auth routes
router.post('/login', auth.login); //Mario
router.post('/register', auth.register); //Mario
router.get('/activarCorreo/:id', auth.activarCorreo); //Mario
router.get('/puedeModificar/:id', auth.puedeModificar); //Alicia
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd); //Mario
router.post('/recuperarpasswd/:id', auth.recuperarPasswd); //Mario
router.get('/activarNewsletter/:id', auth.activarNewsletter); //Alicia


// user routes
router.post('/suscripcionNewsletter', user.suscripcionNewsletter); //Alicia


// Contenido routes
// Todo Alicia
router.get('/getHistoria', contenido.getHistoria);
router.get('/getCargosJunta', contenido.getCargosJunta);
router.get('/getIntegrantesCargo', contenido.getIntegrantesCargo);
router.get('/getHorarios', contenido.getHorarios);
router.get('/getTelefonos', contenido.getTelefonos);
router.get('/getDirecciones', contenido.getDirecciones);
router.put('/updateHermandad', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.updateHermandad);
router.put('/updateContacto', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.updateContacto);



module.exports = router;