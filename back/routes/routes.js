const { Router } = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const midsCitas = require('../middlewares/citasMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const midsValidar = require('../middlewares/validarMiddlewares');
const auth = require('../controllers/authController');
const contenido = require('../controllers/contenidoController');
const citas = require('../controllers/citasController');
const stats = require('../controllers/statsController');
const { check } = require('express-validator');
const { mismaHora } = require('../helpers/validators/contacto-validators');

// Mario y Alicia
// auth routes
router.post('/login', auth.login); //Mario
router.post('/register', auth.register); //Mario
router.get('/activarCorreo/:id/:vKey', auth.activarCorreo); //Mario
router.get('/puedeModificar/:id', [ vJwt.validarJwt ], auth.puedeModificar); //Alicia
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd); //Mario
router.post('/recuperarpasswd/:id', auth.recuperarPasswd); //Mario
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
router.get('/getMemorias', contenido.getMemorias);
router.get('/upload/img/:nombre', contenido.getImagen);
router.get('/upload/doc/:nombre', contenido.getDocumento);
router.get('/download/:nombre', contenido.descargarDocumento);
router.put('/updateHermandad', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.updateHermandad);
router.put('/updateContacto', [ 
    vJwt.validarJwt, 
    midsUser.midAdmin,
    check('horarios.guardar').custom(mismaHora),
    check('horarios.guardar.*.hEntrada', 'Hora de entrada obligatoria').not().isEmpty(),
    check('horarios.guardar.*.hSalida', 'Hora de salida obligatoria').not().isEmpty(),
    check('telefonos.guardar.*.numero', 'Número de teléfono no válido')
        .not().isEmpty()
        .matches(/^(\(?(\+34|0034|34)\)?[ -]+)?([0-9][ -]*){9}/),
    check('telefonos.guardar.*.extension', 'Extensión no válida').matches(/^([0-9]*)$/),
    check('direcciones.*.cp', 'Código postal no válido').matches(/^[0-9]{5}$/),
    midsValidar.validarCampos,
], contenido.updateContacto);
router.put('/addOrUpdateMemoria', [ 
    vJwt.validarJwt, 
    midsUser.midAdmin, 
    check('anio', 'El año es obligatorio').not().isEmpty(),
    midsValidar.validarCampos 
], contenido.addOrUpdateMemoria);
router.delete('/deleteMemoria/:id', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.deleteMemoria);


// pedir cita routes
router.get('/citas/gethorasdisponibles/:fecha', [vJwt.validarJwt, midsUser.midUser],citas.getHorasDisponibles);
router.get('/citas/gethorascitas',[vJwt.validarJwt, midsUser.midAdmin], citas.getHorasCitas);
router.post('/citas/pedircita', [vJwt.validarJwt, midsCitas.yaHaPedidoUnaCita, midsCitas.hayCapacidad, midsUser.midUser], citas.pedirCita);
router.put('/citas/cancelarcita/', [vJwt.validarJwt, midsUser.midUser], citas.cancelarCita);
router.get('/citas/usernotienecita/:id', [vJwt.validarJwt, midsUser.midUser], citas.userNoTieneCita);
router.get('/citas/hayhuecohora/:fecha', [vJwt.validarJwt, midsUser.midUser], citas.hayHuecoHora);
router.get('/citas/getcitapendienteuser/:id', [vJwt.validarJwt, midsUser.midUser], citas.getCitaPendienteUser);
router.get('/citas/getcitaspasadasuser/:id', [vJwt.validarJwt, midsUser.midUser], citas.getCitasPasadasUser);
router.get('/citas/getcitaspendientes', [vJwt.validarJwt, midsUser.midAdmin],citas.getCitasPendientes);
router.get('/citas/getcitaspasadas', [vJwt.validarJwt, midsUser.midAdmin],citas.getCitasPasadas);
router.put('/citas/aplazarcita', [vJwt.validarJwt, midsUser.midAdmin],citas.updateFechaCita);
router.put('/citas/updateasistencia',[vJwt.validarJwt, midsUser.midAdmin], citas.confirmarAsistencia);
router.get('/citas/yatienecita/:id', [vJwt.validarJwt, midsUser.midUser], citas.yaHaPedidoUnaCita);

router.put('/citas/updatenumpersonascita', [vJwt.validarJwt, midsUser.midAdmin], citas.modNumPersonaCita);
router.post('/citas/inserthoracita', [vJwt.validarJwt, midsUser.midAdmin], citas.insertHoraCita);
router.delete('/citas/deletehoracita/:hora', [vJwt.validarJwt, midsUser.midAdmin], citas.deleteHoraCita);

router.get('/citas/obtenerultima/:id',[vJwt.validarJwt,midsUser.midUser], citas.getUltimaCita);//Isa


// Estadísticas routes
router.get('/stats/getDonaciones/', stats.getDonaciones);
router.get('/stats/getAltas/', stats.getAltas);


module.exports = router;