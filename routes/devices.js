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
// POST /api/devices:device_id/remove/
router.post('/:device_id/remove', auth, remove);
// PUT /api/devices/:device_id/edit
router.put('/:device_id/edit', auth, edit);


module.exports = router;

