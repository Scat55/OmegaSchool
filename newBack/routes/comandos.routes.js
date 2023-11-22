const express = require("express");
const router = express.Router();

//const authMiddleware = require('../middlewaree/authMiddleware');
const commandosController = require('../controller/comandos_controller')

const commandosMiddleware = require('../middlewaree/commandosMiddlewaer');


router.post('/create', commandosController.CreateComandos)

router.post('/login', commandosController.LoginComandos) //тут получаешь токен

router.get('/info', commandosMiddleware, commandosController.InfoComandos) //тут нужен токен
//
// router.post('/listTask', commandosController.InfoComandos)
//
// router.post('/task/:taskID',commandosController.InfoComandos)

module.exports = router;