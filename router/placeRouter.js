const router =  require('express').Router();
const placeController = require('../controller/placeController');
const { checkadmin } = require('../middleware/')
const { checkseller } = require('../middleware/')

router.post('/', placeController.getAllPlaceBy)
router.get('/', placeController.getRecomended)
router.post('/:id_users/createplace', checkadmin, placeController.upload.single('myFile'), placeController.createPlace)
router.get('/:id', placeController.getPlaceByid)
module.exports = router 