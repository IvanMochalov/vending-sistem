const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, add, remove, edit, device } = require('../controllers/devices');

// GET /api/devices
router.get('/', auth, all);
// GET /api/devices/:device_id
router.get('/:device_id', auth, device);
// POST /api/devices/add
router.post('/add', auth, add);
// POST /api/devices/remove/:device_id
router.post('/remove/:device_id', auth, remove);
// PUT /api/devices/edit/:device_id
router.put('/edit/:device_id', auth, edit);


module.exports = router;

