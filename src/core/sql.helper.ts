import { Connection, SqlClient, Error, Query, ProcedureManager } from "msnodesqlv8";
import { DB_CLIENT, DB_CONNECTION_STRING, StoreQueries } from "../constants";
import { entityWithID, systemError } from "../entities";
import { AppError } from "../enum";
import ErrorService from "./error.service";

export class SQLHelper {
    static sql: SqlClient = require(DB_CLIENT);

    public static executeQueryArray<T>(query: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SQLHelper.openConnection()

            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(ErrorService.getError(AppError.QueryError));
                    } else {
                        if (queryResult !== undefined) {
                            resolve(queryResult);
                        } else {
                            resolve([]);
                        }
                    }
                });
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public static executeQuerySingle<T>(query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const connection: Connection = await SQLHelper.openConnection();
                
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(ErrorService.getError(AppError.QueryError));
                    } else {
                        const notFoundError: systemError = ErrorService.getError(AppError.NoData);
    
                        if (queryResult !== undefined) {
                            switch (queryResult.length) {
                                case 0:
                                    reject(notFoundError);
                                    break;
    
                                case 1:
                                    resolve(queryResult[0]);
                                    break;
                                    
                                default:
                                    resolve(queryResult[0]);
                                    break;
                            }

                        } else {
                            reject(notFoundError);
                        }
                    }
                });
            }                
            catch(error: any) {
                reject(error as systemError);                      
            }
        });
    }



    public static executeQueryNoResult(query: string, ignoreNoRowsAffected: boolean, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection()
            .then((connection: Connection)=> {
                const q: Query = connection.query(query, params, (queryError: Error | undefined) => {
                    if (queryError) {
                        switch (queryError.code) {
                            case 547:
                                reject(ErrorService.getError(AppError.DeletionConflict));
                                break;
                            default:
                                reject(ErrorService.getError(AppError.QueryError));
                                break;
                        }
                    }
                });

                q.on('rowcount', (rowCount: number) => {
                    if (!ignoreNoRowsAffected && rowCount === 0) {
                        reject(ErrorService.getError(AppError.NoData));
                        return;
                    }

                    resolve();
                });
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public static executeQueryUpdate(query: string, ...params: (number | string)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection()
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, rows: any[] | undefined) => {
                    if (queryError) {
                        reject(ErrorService.getError(AppError.QueryError));
                    } else {
                        resolve();
                    }
                });
            })
            .catch((error: systemError) => {
                reject(error);
            })
        });
    }

    public static createNew(query: string, original: entityWithID, ...params: (string | number | Date)[]): Promise<entityWithID> {
        return new Promise<entityWithID>((resolve, reject) => {
            SQLHelper.openConnection()

            .then((connection: Connection) => {
                const queries: string[] = [query, StoreQueries.selectIdentity];
                const executeQuery: string = queries.join(";");
                let executionCounter: number = 0;
                connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: entityWithID[] | undefined) => {
                    if (queryError) {
                        reject(ErrorService.getError(AppError.QueryError));
                    } else {
                        executionCounter++;
                        const badQueryError: systemError = ErrorService.getError(AppError.QueryError);

                        if (executionCounter === queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length === 1) {
                                    original.ID = queryResult[0].ID;
                                    resolve(original);
                                } else {
                                    reject(badQueryError);
                                }
                            } else {
                                reject(badQueryError);
                            }
                        }
                    }
                });
            })
            .catch((error: systemError) => {
                reject(error);
            })
        });
    }

    public static executeQuerysNoResult(query: string, ignoreNoRowsAffected: boolean, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection()
                .then((connection: Connection) => {
                    const q: Query = connection.query(query, params, (queryError: Error | undefined) => {
                        if (queryError) {
                            switch (queryError.code) {
                                case 547:
                                    reject(ErrorService.getError(AppError.DeletionConflict));
                                    break;
                                default:
                                    reject(ErrorService.getError(AppError.QueryError));
                                    break;
                            }
                        }
                    });

                    q.on('rowcount', (rowCount: number) => {
                        if (!ignoreNoRowsAffected && rowCount ===0) {
                            reject(ErrorService.getError(AppError.NoData));
                            return;
                        }

                        resolve();
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SQLHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorService.getError(AppError.ConnectionError));
                } else {
                    resolve(connection);
                }
            });
        });
    }

    private static treatInsertResut(queryResult: entityWithID[] | undefined): number | null {

        if (queryResult !== undefined) {
            if (queryResult.length === 1) {
                return queryResult[0].ID;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}