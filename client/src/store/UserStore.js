import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._isAdmin = false
        this._userId = null
        this._basketDevices = []
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setAdmin(bool) {
        this._isAdmin = bool
    }

    setId(id) {
        this._userId = id
    }
    
    setBasketDevice(devices) {
        this._basketDevices = devices
    }

    get isAuth() {
        return this._isAuth
    }
    
    get user() {
        return this._user
    }

    get isAdmin() {
        return this._isAdmin
    }

    get userId() {
        return this._userId
    }

    get basketDevices() {
        return this._basketDevices
    }
}