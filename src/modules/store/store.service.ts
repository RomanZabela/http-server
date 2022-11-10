import * as _ from "underscore";
import { StoreQueries } from "../../constants";
import { Stores, systemError, entityWithID } from "../../entities";
import { Status } from "../../enum";
import { SQLHelper } from "../../core/sql.helper";
import DbService from "../../core/db.service";
import { TableNames } from "../../db-entities";
import { DateHelper } from "../../framework/date.helper";

interface localStores extends entityWithID{
    Store_Name: string;
    Store_Address: string;
    Store_Capacity: number;
    Store_Field_Type: number;
    Store_Update_Date: string;
}

interface IStoreService {
    getStores(): Promise<Stores[]>;
    getStoreById(storeId: number): Promise<Stores>;
    updateStore(Stores: Stores, userId: number): Promise<Stores>;
    addStore(Stores: Stores, userId: number): Promise<Stores>;
    deleteByID(id: number, userId: number): Promise<number>
}

class StoreService implements IStoreService { 
   
    // get all stores name
    //private _errorService: ErrorService;

    constructor() {};

    public getStores(): Promise<Stores[]> {
        return new Promise<Stores[]>((resolve, reject) => {
            const result: Stores[] = [];
            
            SQLHelper.executeQueryArray<localStores>(StoreQueries.getStores, Status.Active)
            .then ((queryResult: localStores[]) => {
                queryResult.forEach((StoresType: localStores) => {
                    result.push(this.parseLocalStore(StoresType));
                });
                resolve(result);                
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    //get only one store by ID

    public async getStoreById(storeId: number): Promise<Stores> {
        return await DbService.getFromTableById(TableNames.Store, storeId);
    }

    //update store field by name

    public updateStore(storeType: Stores, userId: number): Promise<Stores> {
        return new Promise<Stores>((resolve, reject) => {
            const updateDate: Date = new Date();
            SQLHelper.executeQueryUpdate(StoreQueries.updateStoreById, storeType.storeCapacity, storeType.storeName, storeType.storeAdress, DateHelper.dateToString(updateDate), userId, storeType.ID, Status.Active)
            .then(() => {
                resolve(storeType);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public addStore(Stores: Stores, userId: number): Promise<Stores> {
        return new Promise<Stores>((resolve, reject) => {
            const updateDate: Date = new Date();

            SQLHelper.createNew(StoreQueries.addNewStore, Stores, Stores.storeName, Stores.storeAdress, Stores.storeCapacity, Status.Active, updateDate, userId)
                .then((result: entityWithID) => {
                    resolve(result as Stores);
                }) 
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deleteByID(id: number, userId: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const updateDate: Date = new Date();
            SQLHelper.executeQueryUpdate(StoreQueries.deleteStore, Status.NotActive, DateHelper.dateToString(updateDate), userId, id, Status.Active)
            .then(() => {
                resolve(id);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    private parseLocalStore(local: localStores): Stores {
        return {
            ID: local.ID,
            storeName: local.Store_Name,
            storeAdress: local.Store_Address,
            storeCapacity: local.Store_Capacity
        }
    }
}

export default new StoreService();