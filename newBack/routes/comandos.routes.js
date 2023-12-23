const express = require("express");
const router = express.Router();

//const authMiddleware = require('../middlewaree/authMiddleware');
const commandosController = require('../controller/comandos_controller')

const commandosMiddleware = require('../middlewaree/commandosMiddlewaer');


router.get('/',commandosController.getinfo)

router.post('/create', commandosController.CreateComandos)

router.post('/login', commandosController.LoginComandos) //тут получаешь токен

router.put('/changer',commandosMiddleware, commandosController.updateUsersByCommand);

router.get('/info', commandosMiddleware, commandosController.InfoComandos) //тут нужен токен

router.post('/createTest',commandosController.createTestAndTasks)
// router.post('/listTask', commandosController.InfoComandos)
router.get('/getTasks', commandosMiddleware, commandosController.GetTasks)

router.post('/SubmitAnswer',commandosMiddleware, commandosController.SubmitAnswer)
// router.post('/task/:taskID',commandosController.InfoComandos)

module.exports = router;