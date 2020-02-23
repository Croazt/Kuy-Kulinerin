const router =  require('express').Router();
const createMenuController = require('../controller/menuController');
const { checkadmin } = require('../middleware/')

router.post('/:id_place/createmenu', checkadmin, createMenuController.createMenu)
router.post('/:id_place/menu/:id/update', checkadmin, createMenuController.updateMenu)
router.post('/:id_place/menu/',createMenuController.getAllMenu)

module.exports = router 