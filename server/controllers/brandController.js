const {Brand, Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async deleteOne(req, res) {
        const {id} = req.params; 
        await Device.destroy({where: {brandId: id}});
        await Brand.destroy( { where: {id}} )

    }
}

module.exports = new BrandController();