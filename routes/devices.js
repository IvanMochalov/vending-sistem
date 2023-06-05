const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
	allDevice,
	addDevice,
	removeDevice,
	editDevice,
	device,
	allProducts,
	product,
	addProduct,
  removeProduct,
  editProduct,
} = require('../controllers/devices')

// GET /api/devices
router.get('/', auth, allDevice)
// GET /api/devices/:device_id
router.get('/:device_id', auth, device)
// POST /api/devices/add
router.post('/add', auth, addDevice)
// POST /api/devices:device_id/remove/
router.post('/:device_id/remove', auth, removeDevice)
// PUT /api/devices/:device_id/edit
router.put('/:device_id/edit', auth, editDevice)

// GET /api/devices/:device_id/products
router.get('/:device_id/products', auth, allProducts)
// GET /api/devices/:device_id/products/:product_id
router.get('/:device_id/products/:product_id', auth, product)
// POST /api/devices/:device_id/products/add
router.post('/:device_id/products/add', auth, addProduct)
// POST /api/devices/:device_id/products/:product_id/remove
router.post('/:device_id/products/:product_id/remove', auth, removeProduct)
// PUT /api/devices/:device_id/products/:product_id/edit
router.put('/:device_id/products/:product_id/edit', auth, editProduct)

module.exports = router
