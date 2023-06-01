const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/devices/products/:device_id
 * @desc Получение всех продуктов
 * @access Private
 */
const all = async (req, res) => {
  try {
    if(!req.params.device_id) {
      throw Error('no device_id')
    }

    const { device_id } = req.params

    const products = await prisma.product.findMany({
      where: {
        deviceId: device_id
      }
    });

    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: 'Не удалось получить продукты' });
  }
}

/**
 * @route POST /api/devices/products/:device_id/add
 * @desc Добавление продукта
 * @access Private
 */
const add = async (req, res) => {
  try {
    if(!req.params.device_id) {
      throw Error('no device_id')
    }

    const { device_id } = req.params
    const data = req.body;

    if (!data.name || !data.count || !data.price) {
      return res.status(400).json({ message: 'Все поля обязательны' })
    }
    const product = await prisma.product.create({
      data: {
        ...data,
        userId: req.user.id,
        deviceId: device_id,
      }
    });
    return res.status(201).json(product);
  } catch(error) {
    return res.status(500).json({ message: `Не удалось добавить продукт` })
  }
}

/**
 * 
 * @route POST /api/devices/products/:device_id/remove/:product_id
 * @desc Удаление продукта
 * @access Private
 */
const remove = async (req, res) => {
  try {
    if(!req.params.product_id) {
      throw Error('no product_id')
    }
    console.log('remove params =>',req.params)
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
 * @route PUT /api/devices/products/:device_id/edit/:product_id
 * @desc Редактирование продукта
 * @access Private
 */
const edit = async (req, res) => {
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

/**
 * 
 * @route GET /api/devices/products/:device_id/:product_id
 * @desc Получение продукта
 * @access Private
 */
const product = async (req, res) => {
  try {
    if(!req.params.product_id) {
      throw Error('no product_id')
    }
    const { product_id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: product_id,
      }
    });

    res.status(200).json(product);
  } catch {
    return res.status(500).json({ message: 'Не удалось получить продукт' })
  }
}

module.exports = {
  all,
  add,
  remove,
  edit,
  product
}
