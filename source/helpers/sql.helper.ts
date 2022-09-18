import { Connection, SqlClient, Error, QueryEvent } from "msnodesqlv8";
import { DB_CLIENT, DB_CONNECTION_STRING, ErrorCodes, GeneralMessage, StoreQueries } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helper";

export class SQLHelper {
    static sql: SqlClient = require(DB_CLIENT);

    public static executeQueryArray<T>(query: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SQLHelper.openConnection()

            .then((connection: Connection) => {
                connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(ErrorHelper.createError(ErrorCodes.QueryError, GeneralMessage.DBConnectionError));
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

    public static executeQuerySingle<T>(query: string, param: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SQLHelper.openConnection()
            .then((connection: Connection) => {
                connection.query(query, [param], (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(ErrorHelper.createError(ErrorCodes.QueryError, GeneralMessage.SQLQueryError));
                    } else {
                        const notFoundError: systemError = ErrorHelper.createError(ErrorCodes.NoData, GeneralMessage.NoDataFound);

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

    public static executeQueryUpdate(query: string, ...params: (number | string)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SQLHelper.openConnection()
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, rows: any[] | undefined) => {
                    if (queryError) {
                        reject(ErrorHelper.createError(ErrorCodes.QueryError, GeneralMessage.SQLQueryError));
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

    public static createNew<T>(query: string, original: T, ...params: (string | number | Date)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SQLHelper.openConnection()

            .then((connection: Connection) => {
                const queries: string[] = [query, StoreQueries.selectIdentity];
                const executeQuery: string = queries.join(";");
                let executionCounter: number = 0;
                connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(ErrorHelper.createError(ErrorCodes.QueryError, GeneralMessage.SQLQueryError));
                    } else {
                        executionCounter++;
                        const badQueryError: systemError = ErrorHelper.createError(ErrorCodes.QueryError, GeneralMessage.SQLQueryError);

                        if (executionCounter === queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length === 1) {
                                    (original as any).id = (queryResult[0] as any).id;
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

    private static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SQLHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.createError(ErrorCodes.ConnectionError, GeneralMessage.DBConnectionError));
                } else {
                    resolve(connection);
                }
            });
        });
    }
}