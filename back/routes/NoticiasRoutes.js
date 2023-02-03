const {Router} = require('express');
const router = Router();
const controlador=require('../controllers/noticiasController');

router.post('/get',controlador.getNoticia);
router.get('/:seccion',controlador.getListado);
router.post('/registrar',controlador.registrarNoticia);
router.delete('/borrar',controlador.borrarNoticia);
//router.put('/modificar',controlador.modificarNoticia);

module.exports = router;