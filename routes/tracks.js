const TrackController = require('./TrackController');
const express = require('express');

const controller = new TrackController();
const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.track);
router.get('/:id/beats', controller.beats);
router.get('/:id/beats/stream', controller.stream);

module.exports = router;
