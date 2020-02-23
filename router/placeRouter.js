const router =  require('express').Router();
const placeController = require('../controller/placeController');
const { checkadmin } = require('../middleware/')

router.post('/searchplace', placeController.getAllPlaceBy)
router.get('/', placeController.getRecomended)
router.post('/createplace', checkadmin, placeController.upload.single('myFile'), placeController.createPlace)
router.get('/:id', placeController.getPlaceByid)
router.delete('/:id_user/deleteplace/:id', checkadmin, placeController.delPlaceByid)
module.exports = router 