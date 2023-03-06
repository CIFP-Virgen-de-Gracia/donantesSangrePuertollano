const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/musicaController');

//Todo Isa
router.post('/insertar', controlador.registrarCancion);
router.get('/upload/:id', controlador.obtenerCancion);
router.post('/get', controlador.getCancion);
router.get('/listado', controlador.Listado);
router.delete('/borrar/:id', controlador.borrarCancion);
router.get('/download/:id', controlador.descargar);
router.put('/modificar', controlador.editarCancion);

module.exports = router;