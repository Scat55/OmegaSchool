const express = require("express");
const router = express.Router();

//const authMiddleware = require('../middlewaree/authMiddleware');
const commandosController = require('../controller/comandos_controller')



router.post('/create', commandosController.CreateComandos)

router.post('/login', commandosController.LoginComandos)

router.post('/info/:userID',commandosController.InfoComandos)

router.post('/listTask', commandosController.InfoComandos)

router.post('/task/:taskID',commandosController.InfoComandos)

module.exports = router;