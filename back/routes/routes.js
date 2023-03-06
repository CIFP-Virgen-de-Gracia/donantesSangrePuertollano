const { Router } = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const midsCitas = require('../middlewares/citasMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const midsValidar = require('../middlewares/validarMiddlewares');
const auth = require('../controllers/authController');
const contenido = require('../controllers/contenidoController');
const citas = require('../controllers/citasController');
const { check } = require('express-validator');


// Mario y Alicia
// auth routes
router.post('/login', auth.login); //Mario
router.post('/register', auth.register); //Mario
router.get('/activarCorreo/:id/:vKey', auth.activarCorreo); //Mario
router.get('/puedeModificar/:id', [ vJwt.validarJwt ], auth.puedeModificar); //Alicia
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd); //Mario
router.post('/recuperarpasswd/:id', auth.recuperarPasswd); //Mario
router.get('/activarNewsletter/:id', auth.activarNewsletter); //Alicia
router.get('/desactivarNewsletter/:id', auth.desactivarNewsletter); //Alicia


// user routes
router.post('/suscripcionNewsletter', [
    check('email', 'Formato de correo no válido').isEmail(),
    midsValidar.validarCampos
], auth.mandarEmailNewsletter); //Alicia
router.get('/activarNewsletter/:id/:vKey', auth.activarNewsletter); //Alicia
router.get('/desactivarNewsletter/:id/:vKey', auth.desactivarNewsletter); //Alicia


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



// pedir cita routes
router.get('/citas/gethorasdisponibles/:fecha', citas.getHorasDisponibles);
router.post('/citas/pedircita', [midsCitas.yaHaPedidoUnaCita], citas.pedirCita);
router.put('/citas/cancelarcita/', citas.cancelarCita);
router.get('/citas/usernotienecita/:id', citas.userNoTieneCita);
router.get('/citas/hayhuecohora/:fecha', citas.hayHuecoHora);
router.get('/citas/getcitapendienteuser/:id', citas.getCitaPendienteUser);
router.get('/citas/getcitaspasadasuser/:id', citas.getCitasPasadasUser);
router.get('/citas/yatienecita/:id', citas.yaHaPedidoUnaCita);



module.exports = router;