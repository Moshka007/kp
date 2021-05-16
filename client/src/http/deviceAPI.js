import {$authHost, $host} from './index';

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const deleteOneBrand = async (id) => {
    const {data} = await $host.delete('api/brand/' + id)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const deleteOneDevice = async (id) => {
    const {data} = await $host.delete('api/device/' + id)
    return data
}

export const updatePrice = async (id, price) => {
    const {data} = await $host.put('api/device/' + id, {
        price
    })
    return data
}

export const deleteOneType = async (id) => {
    const {data} = await $host.delete('api/type/' + id)
    return data
}

export const addToBasket = async (basketId, deviceId) => {
    const {data} = await $host.post('api/basket', {basketId, deviceId})
    return data
}

export const fetchBasketDevices = async (id) => {
    const {data} = await $host.get('api/basket/', {params: {id}})
    return data
}

export const deleteBasketDevice = async (id) => {
    const {data} = await $host.delete('api/basket/'+ id)
    return data
}