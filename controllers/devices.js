const { prisma } = require('../prisma/prisma-client')

/**
 * @route GET /api/devices/
 * @desc Получение всех аппаратов
 * @access Private
 */
const allDevice = async (req, res) => {
	try {
		const devices = await prisma.device.findMany({
			where: {
				userId: req.user.id,
			},
		})

		res.status(200).json(devices)
	} catch {
		res.status(500).json({ message: 'Не удалось получить аппараты' })
	}
}
/**
 * @route POST /api/devices/addDevice
 * @desc Добавление аппарата
 * @access Private
 */
const addDevice = async (req, res) => {
	try {
		const data = req.body

		if (!data.modelName || !data.location) {
			return res.status(400).json({ message: 'Все поля обязательны' })
		}

		const device = await prisma.device.create({
			data: {
				...data,
				userId: req.user.id,
			},
		})

		return res.status(201).json(device)
	} catch {
		return res.status(500).json({ message: 'Не удалось добавить аппарат' })
	}
}

/**
 *
 * @route POST /api/devices/:device_id/remove
 * @desc Удаление аппарата
 * @access Private
 */
const removeDevice = async (req, res) => {
	// const { id } = req.body;
	try {
		if (!req.params.device_id) {
			throw Error('no device_id')
		}

		const { device_id } = req.params

		await prisma.product.deleteMany({
			where: {
				deviceId: device_id,
			},
		})
		await prisma.device.delete({
			where: {
				id: device_id,
			},
		})
		res.status(204).json({ message: 'Аппарат успешно удален' })
	} catch {
		return res.status(500).json({ message: 'Не удалось удалить аппарат' })
	}
}

/**
 *
 * @route PUT /api/devices/:device_id/edit
 * @desc Редактирование аппарата
 * @access Private
 */
const editDevice = async (req, res) => {
	// const id = data.id;
	try {
		if (!req.params.device_id) {
			throw Error('no device_id')
		}

		const data = req.body
		const { device_id } = req.params
		await prisma.device.update({
			where: {
				id: device_id,
			},
			data,
		})
		res.status(204).json({ message: 'Аппарат успешно изменен' })
	} catch {
		return res.status(500).json({ message: 'Не удалось редактировать аппарат' })
	}
}

/**
 *
 * @route GET /api/devices/:device_id
 * @desc Получение аппарата
 * @access Private
 */
const device = async (req, res) => {
	try {
		if (!req.params.device_id) {
			throw Error('no device_id')
		}

		const { device_id } = req.params
		const device = await prisma.device.findUnique({
			where: {
				id: device_id,
			},
		})

		res.status(200).json(device)
	} catch {
		return res.status(500).json({ message: 'Не удалось получить аппарат' })
	}
}

/**
 * @route GET /api/devices/:device_id/products
 * @desc Получение всех продуктов
 * @access Private
 */
const allProducts = async (req, res) => {
	try {
		console.log('req.params', req.params)
		if (!req.params.device_id) {
			throw Error('no device_id')
		}
		const { device_id } = req.params

		const products = await prisma.product.findMany({
			where: {
				deviceId: device_id,
			},
		})

		res.status(200).json(products)
	} catch {
		res.status(500).json({ message: 'Не удалось получить продукты' })
	}
}

/**
 *
 * @route GET /api/devices/:device_id/products/:product_id
 * @desc Получение продукта
 * @access Private
 */
const product = async (req, res) => {
	try {
		if (!req.params.product_id) {
			throw Error('no product_id')
		}
		console.log('object', req.params)
		const { product_id } = req.params
		const product = await prisma.product.findUnique({
			where: {
				id: product_id,
			},
		})

		res.status(200).json(product)
	} catch {
		return res.status(500).json({ message: 'Не удалось получить продукт' })
	}
}

/**
 * @route POST /api/devices/:device_id/products/add
 * @desc Добавление продукта
 * @access Private
 */
const addProduct = async (req, res) => {
  console.log('body',req.body)
  console.log('params',req.params)
	try {
		if (!req.params.device_id) {
			throw Error('no device_id')
		}

		const { device_id } = req.params
		const data = req.body

		if (!data.name || !data.count || !data.price) {
			return res.status(400).json({ message: 'Все поля обязательны' })
		}
		const product = await prisma.product.create({
			data: {
				...data,
				userId: req.user.id,
				deviceId: device_id,
			},
		})
		return res.status(201).json(product)
	} catch (error) {
		return res.status(500).json({ message: `Не удалось добавить продукт` })
	}
}

/**
 * 
 * @route POST /api/devices/:device_id/products/:product_id/remove
 * @desc Удаление продукта
 * @access Private
 */
const removeProduct = async (req, res) => {
  try {
    if(!req.params.product_id) {
      throw Error('no product_id')
    }

    const { product_id } = req.params;
    
    await prisma.product.delete({
      where: {
        id: product_id,
      }
    });
    res.status(204).json({ message: 'Продукт успешно удален' })
  } catch {
    return res.status(500).json({ message: 'Не удалось удалить продукт' })
  }
}

/**
 * 
 * @route PUT /api/devices/:device_id/products/:product_id/edit
 * @desc Редактирование продукта
 * @access Private
 */
const editProduct = async (req, res) => {
  try {
    if(!req.params.product_id) {
      throw Error('no product_id')
    }
    
    const data = req.body;
    const { product_id } = req.params;
    
    await prisma.product.update({
      where: {
        id: product_id,
      },
      data
    });
    res.status(204).json({ message: 'Продукт успешно изменен' })
  } catch {
    return res.status(500).json({ message: 'Не удалось редактировать продукт' })
  }
}

module.exports = {
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
}
