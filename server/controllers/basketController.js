const {BasketDevice, Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async getAll(req, res) {
        const {id} = req.query;
        const data = await Device.findAll({ include: [{
                model: BasketDevice,
                where: {basketId: id}
            }],
        }); 
        return res.json(data);
    }

    async create(req, res) {
        const {basketId, deviceId} = req.body;
        const basket = await BasketDevice.create({basketId, deviceId});
        return res.json(basket);
    }

    async deleteOne(req, res) {
        const {id} = req.params; 
        await BasketDevice.destroy({where: {deviceId: id}});

    }
}

module.exports = new BrandController();