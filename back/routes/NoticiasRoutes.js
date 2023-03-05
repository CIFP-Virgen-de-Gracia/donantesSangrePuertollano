const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/noticiasController');
const mid=require("../middlewares/userMiddlewares");
const { validarJwt } = require('../middlewares/validarJwt');

//Todo Isa
router.post('/get', controlador.getNoticia);
router.get('/:seccion',controlador.getListado);
router.post('/registrar', controlador.registrarNoticia);
router.delete('/borrar/:id',controlador.borrarNoticia);
router.get('/upload/:id',controlador.mostrarImagen);
router.put('/modificar',controlador.modificarNoticia);

module.exports = router;