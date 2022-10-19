import * as _ from "underscore";
import { StoreQueries} from "../constants";
import { systemError, Stores, entityWithID } from "../entities";
import { Status } from "../enum";
import { SQLHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localStores {
    Store_ID: number;
    Store_Name: string;
    Store_Address: string;
    Store_Capacity: number;
    Store_Field_Type: number;
    Store_Update_Date: string;
}

interface IStoreService {
    getStores(): Promise<Stores[]>;
    getStore(id: number): Promise<Stores>;
    updateStore(Stores: Stores, userId: number): Promise<Stores>;
    addStore(Stores: Stores, userId: number): Promise<Stores>;
}

export class StoreService implements IStoreService { 
   
    // get all stores name
    private _errorService: ErrorService;

    constructor(
        private errorService: ErrorService
    ) { 
        this._errorService = errorService;
    }

    public getStores(): Promise<Stores[]> {
        return new Promise<Stores[]>((resolve, reject) => {
            const result: Stores[] = [];
            
            SQLHelper.executeQueryArray<localStores>(this._errorService, StoreQueries.getStores, Status.Active)
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

    public getStore(id: number): Promise<Stores> {
        return new Promise<Stores>((resolve, reject) => {
            SQLHelper.executeQuerySingle<localStores>(this.errorService, StoreQueries.getStoreByID, id, Status.Active)
            .then((queryResult: localStores) => {
                resolve(this.parseLocalStore(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    //update store field by name

    public updateStore(storeType: Stores, userId: number): Promise<Stores> {
        return new Promise<Stores>((resolve, reject) => {
            const updateDate: Date = new Date();
            SQLHelper.executeQueryUpdate(this._errorService, StoreQueries.updateStoreCapacity, storeType.storeCapacity, storeType.storeName, storeType.id, Status.Active)
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

            SQLHelper.createNew(this._errorService, StoreQueries.addNewStore, Stores, Stores.storeName, Stores.storeAdress, Stores.storeCapacity, Stores.storeActive, updateDate, Status.Active)
                .then((result: entityWithID) => {
                    resolve(result as Stores);
                }) 
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalStore(local: localStores): Stores {
        return {
            id: local.Store_ID,
            storeName: local.Store_Name,
            storeAdress: local.Store_Address,
            storeCapacity: local.Store_Capacity,
            storeActive: local.Store_Field_Type,
            storeUpdateDate: local.Store_Update_Date,
        }
    }
}