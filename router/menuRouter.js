const router =  require('express').Router();
const createMenuController = require('../controller/menuController');


router.post('/:id_place/createmenu', createMenuController.createMenu)
router.post('/:id_place/menu/:id/update', createMenuController.updateMenu)
router.post('/:id_place/menu/',createMenuController.getAllMenu)

module.exports = router 