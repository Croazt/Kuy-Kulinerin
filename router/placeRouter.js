const router =  require('express').Router();
const placeController = require('../controller/placeController');
const { checkadmin } = require('../middleware/')
const { checkuser } = require('../middleware/')

router.post('/searchplace', placeController.getAllPlaceBy)
router.get('/', placeController.getRecomended)
router.post('/createplace', checkadmin, placeController.upload.single('myFile'), placeController.createPlace)
router.get('/:id', placeController.getPlaceByid)
router.delete('/deleteplace/:id', checkadmin, placeController.delPlaceByid)
router.post('/ratePlace/:id', checkuser, placeController.ratePlace)
router.post('/commentPlace/:id', checkuser, placeController.commentPlace)
module.exports = router 