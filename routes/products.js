const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, add, remove, edit, product } = require('../controllers/products');

// GET /api/devices/products/:device_id
router.get('/:device_id/', auth, all);

// GET /api/devices/products/:device_id/:product_id
router.get('/:device_id/:product_id', auth, product);

// POST /api/devices/products/:device_id/add
router.post('/:device_id/add', auth, add);

// POST /api/devices/products/:device_id/remove/:id
router.post('/:device_id/remove/:product_id', auth, remove);

// PUT /api/devices/products/:device_id/edit/:id
router.put('/:device_id/edit/:product_id', auth, edit);


module.exports = router;