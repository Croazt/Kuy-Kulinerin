const router =  require('express').Router();
const placeController = require('../controller/placeController');


router.post('/', placeController.getAllPlaceBy)
router.get('/', placeController.getRecomended)
router.get('/:id', placeController.getPlaceByid)
module.exports = router