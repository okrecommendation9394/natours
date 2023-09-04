const express = require("express");
const tourController = require("./../contollers/tour-controller");

const router = express.Router();//this is middleware

router.param('id', tourController.checkID);//param middleware
router.route('/').get(tourController.getAllTours).post(tourController.checkBody,tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;