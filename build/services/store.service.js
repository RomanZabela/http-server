"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const constants_1 = require("../constants");
const enum_1 = require("../enum");
const sql_helper_1 = require("../helpers/sql.helper");
class StoreService {
    // get all stores name
    constructor(errorService) {
        this.errorService = errorService;
    }
    getStores() {
        return new Promise((resolve, reject) => {
            const result = [];
            sql_helper_1.SQLHelper.executeQueryArray(this.errorService, constants_1.StoreQueries.getStores, enum_1.Status.Active)
                .then((queryResult) => {
                queryResult.forEach((StoresType) => {
                    result.push(this.parseLocalStore(StoresType));
                });
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    //get only one store by ID
    getStore(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SQLHelper.executeQuerySingle(this.errorService, constants_1.StoreQueries.getStoreByID, id, enum_1.Status.Active)
                .then((queryResult) => {
                resolve(this.parseLocalStore(queryResult));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    //update store field by name
    updateStore(storeType) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SQLHelper.executeQueryUpdate(this.errorService, constants_1.StoreQueries.updateStoreCapacity, storeType.storeCapacity, storeType.storeName, storeType.id, enum_1.Status.Active)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    addStore(Stores) {
        return new Promise((resolve, reject) => {
            const updateDate = new Date();
            sql_helper_1.SQLHelper.createNew(this.errorService, constants_1.StoreQueries.addNewStore, Stores, Stores.storeName, Stores.storeAdress, Stores.storeCapacity, Stores.storeActive, updateDate, enum_1.Status.Active)
                .then((result) => {
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    parseLocalStore(local) {
        return {
            id: local.Store_ID,
            storeName: local.Store_Name,
            storeAdress: local.Store_Address,
            storeCapacity: local.Store_Capacity,
            storeActive: local.Store_Field_Type,
            storeUpdateDate: local.Store_Field_Update,
        };
    }
}
exports.StoreService = StoreService;
