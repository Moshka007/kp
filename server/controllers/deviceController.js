const {Device, DeviceInfo, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const { title } = require('process');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName)); //Перемещение файла в папку static 
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    });
                });
            }

            return res.json(device);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        let devices;
        limit = limit || 9;
        page = page || 1;
        let offset = page * limit - limit;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({include: [{model: Brand, as: 'brand'}], limit, offset});
        }

        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, include: [{model: Brand, as: 'brand'}], limit, offset});
        }

        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, include: [{model: Brand, as: 'brand'}], limit, offset});
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, include: [{model: Brand, as: 'brand'}], limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        );

        return res.json(device);
    }

    async deleteOne(req,res) {
        const {id} = req.params;
        await DeviceInfo.destroy({where: {deviceId: id}}),
        await Device.destroy( { where: {id}} )

        return res.json();
    }

    async updatePrice(req, res) {
        let {id} = req.params;
        let {price} = req.body
        await Device.update(
        {price: price}, 
        {
            where: {id: id}
        })
        return res.json();
    }
}


module.exports = new DeviceController();