import * as _ from "underscore";
import { StoreQueries, TEMP_USER_ID} from "../constants";
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
    Store_Field_Update: Date;
}

interface IStoreService {
    getStores(): Promise<Stores[]>;
    getStore(id: number): Promise<Stores>;
    updateStore(Stores: Stores): Promise<void>;
    addStore(Stores: Stores): Promise<Stores>;
}

export class StoreService implements IStoreService { 
   
    // get all stores name

    constructor(
        private errorService: ErrorService
    ) { }

    public getStores(): Promise<Stores[]> {
        return new Promise<Stores[]>((resolve, reject) => {
            const result: Stores[] = [];
            
            SQLHelper.executeQueryArray<localStores>(this.errorService, StoreQueries.getStores, Status.Active)
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

    public updateStore(storeType: Stores): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.executeQueryUpdate(this.errorService, StoreQueries.updateStoreCapacity, storeType.storeCapacity, storeType.storeName, storeType.id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public addStore(Stores: Stores): Promise<Stores> {
        return new Promise<Stores>((resolve, reject) => {
            const updateDate: Date = new Date();

            SQLHelper.createNew(this.errorService, StoreQueries.addNewStore, Stores, Stores.storeName, Stores.storeAdress, Stores.storeCapacity, Stores.storeActive, updateDate, Status.Active)
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
            storeUpdateDate: local.Store_Field_Update,
        }
    }
}