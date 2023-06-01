const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/devices/
 * @desc Получение всех аппаратов
 * @access Private
 */
const all = async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      where: {
        userId: req.user.id
      }
    });

    res.status(200).json(devices);
  } catch {
    res.status(500).json({ message: 'Не удалось получить аппараты' });
  }
}
/**
 * @route POST /api/devices/add
 * @desc Добавление аппарата
 * @access Private
 */
const add = async (req, res) => {
  try {
     const data = req.body;

     if (!data.modelName || !data.location) {
      return res.status(400).json({ message: 'Все поля обязательны' })
     }

    const device = await prisma.device.create({
      data: {
        ...data,
        userId: req.user.id
      }
     });

     return res.status(201).json(device);
  } catch {
    return res.status(500).json({ message: 'Не удалось добавить аппарат' })
  }
}

/**
 * 
 * @route POST /api/devices/remove/:device_id
 * @desc Удаление аппарата
 * @access Private
 */
const remove = async (req, res) => {
  // const { id } = req.body;
  const { device_id } = req.params;
  try {
    await prisma.device.delete({
      where: {
        id: device_id,
      }
    });
    res.status(204).json({ message: 'Аппарат успешно удален' })
  } catch {
    return res.status(500).json({ message: 'Не удалось удалить аппарат' })
  }
}

/**
 * 
 * @route PUT /api/devices/edit/:device_id
 * @desc Редактирование аппарата
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  // const id = data.id;
  const { device_id } = req.params;
  try {
    await prisma.device.update({
      where: {
        id: device_id
      },
      data
    });
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
  const { device_id } = req.params;
  try {
    const device = await prisma.device.findUnique({
      where: {
        id: device_id
      }
    });

    res.status(200).json(device);
  } catch {
    return res.status(500).json({ message: 'Не удалось получить аппарат' })
  }
}

module.exports = {
  all,
  add,
  remove,
  edit,
  device
}
