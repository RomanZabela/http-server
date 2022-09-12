import { StoreQueries, } from "../constants";
import { systemError, Stores } from "../entities";
import { SQLHelper } from "../helpers/sql.helper";

interface localStores {
    Store_ID: number;
    Store_Name: string;
    Store_Address: string;
    Store_Capacity: number;
}

interface IStoreService {
    getStores(): Promise<Stores[]>;
    getStore(id: number): Promise<Stores>;
    updateStore(Stores: Stores): Promise<void>;
}

export class StoreService implements IStoreService { 
   
    // get all stores name

    public getStores(): Promise<Stores[]> {
        return new Promise<Stores[]>((resolve, reject) => {
            const result: Stores[] = [];
            
            SQLHelper.executeQueryArray<localStores>(StoreQueries.getStores)
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
            SQLHelper.executeQuerySingle<localStores>(StoreQueries.getStoreByID, id)
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
            SQLHelper.executeQueryUpdate(StoreQueries.updateStoreCapacity, storeType.storeCapacity, storeType.storeName, storeType.id)
            .then(() => {
                resolve();
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
            storeCapacity: local.Store_Capacity
        }
    }
}