import { query } from "express";
import { Connection, SqlClient, Error, QueryEvent } from "msnodesqlv8";
import { ErrorCodes, General, DB_CONNECTION_STRING, StoreQueries, DB_CLIENT } from "../constants";
import { Stores } from "../entities";
import { ErrorHelper} from "../helpers/error.helper";

interface localStores {
    Store_ID: number;
    Store_Name: string;
    Store_Address: string;
    Store_Capacity: number;
}

interface IStoreService {
    getStores(): Promise<Stores[]>;
    getStore(id: number): Promise<Stores>;
}

export class StoreService implements IStoreService { 
   
    // get all stores name

    public getStores(): Promise<Stores[]> {
        return new Promise<Stores[]>((resolve, reject) => {
            let result: Stores[] = [];

            const sql: SqlClient = require(DB_CLIENT);

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = StoreQueries.getStores;
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError ));
                } else {                
                    connection.query(query, (queryError: Error | undefined, queryResult: localStores[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError));
                        } else {
                            const result: Stores[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(Stores => {
                                    result.push(
                                        this.parseLocalStore(Stores)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
        
    }

    //get only one store by ID

    public getStore(id: number): Promise<Stores> {
        let result: Stores;
        return new Promise<Stores>((resolve, reject) => {
            const sql: SqlClient = require(DB_CLIENT);

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = StoreQueries.getStoreByID;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError));
                } else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStores[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError));
                        } else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalStore(queryResult[0])
                            } else if (queryResult !== undefined && queryResult.length === 0) {

                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    //update store field by name

    public updateStore(id: number, capacity: number): Promise<Stores> {
        let result: Stores;
        return new Promise<Stores>((resolve, reject) => {
            const sql: SqlClient = require(DB_CLIENT);

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = StoreQueries.getStoreByID;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError));
                } else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStores[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SQLQueryError));
                        } else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalStore(queryResult[0])
                            } else if (queryResult !== undefined && queryResult.length === 0) {

                            }
                            resolve(result);
                        }
                    })
                }
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