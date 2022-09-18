import { Connection, SqlClient, Error, QueryEvent, Query } from "msnodesqlv8";
import { DB_CLIENT, DB_CONNECTION_STRING, ErrorCodes, GeneralMessage, StoreQueries } from "../constants";
import { entityWithID, systemError } from "../entities";
import { AppError } from "../enum";
import { ErrorService } from "../services/error.service";

export class SQLHelper {
    static sql: SqlClient = require(DB_CLIENT);

    public static executeQueryArray<T>(errorService: ErrorService, query: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SQLHelper.openConnection(errorService)

            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
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

    public static executeQuerySingle<T>(errorService: ErrorService, query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SQLHelper.openConnection(errorService)
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
                    } else {
                        const notFoundError: systemError = errorService.getError(AppError.NoData);

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
                
            })
            .catch((error: systemError) => {
                reject(error);
            })                       
        });
    }

    public static executeQueryUpdate(errorService: ErrorService, query: string, ...params: (number | string)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection(errorService)
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, rows: any[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
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

    public static createNew(errorService: ErrorService, query: string, original: entityWithID, ...params: (string | number | Date)[]): Promise<entityWithID> {
        return new Promise<entityWithID>((resolve, reject) => {
            SQLHelper.openConnection(errorService)

            .then((connection: Connection) => {
                const queries: string[] = [query, StoreQueries.selectIdentity];
                const executeQuery: string = queries.join(";");
                let executionCounter: number = 0;
                connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: entityWithID[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
                    } else {
                        executionCounter++;
                        const badQueryError: systemError = errorService.getError(AppError.QueryError);

                        if (executionCounter === queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length === 1) {
                                    original.id = queryResult[0].id;
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

    public static executeQuesryNoResult(errorService: ErrorService, query: string, ignoreNoRowsAffected: boolean, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection: Connection) => {
                    const q: Query = connection.query(query, params, (queryError: Error | undefined) => {
                        if (queryError) {
                            switch (queryError.code) {
                                case 547:
                                    reject(errorService.getError(AppError.DeletionConflict));
                                    break;
                                default:
                                    reject(errorService.getError(AppError.QueryError));
                                    break;
                            }
                        }
                    });

                    q.on('rowcount', (rowCount: number) => {
                        if (!ignoreNoRowsAffected && rowCount ===0) {
                            reject(errorService.getError(AppError.NoData));
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

    private static openConnection(errorService: ErrorService): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SQLHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(errorService.getError(AppError.ConnectionError));
                } else {
                    resolve(connection);
                }
            });
        });
    }
}