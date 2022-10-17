"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLHelper = void 0;
const constants_1 = require("../constants");
const enum_1 = require("../enum");
class SQLHelper {
    static executeQueryArray(errorService, query, ...params) {
        return new Promise((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection) => {
                connection.query(query, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enum_1.AppError.QueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            resolve(queryResult);
                        }
                        else {
                            resolve([]);
                        }
                    }
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQuerySingle(errorService, query, ...params) {
        return new Promise((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection) => {
                connection.query(query, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enum_1.AppError.QueryError));
                    }
                    else {
                        const notFoundError = errorService.getError(enum_1.AppError.NoData);
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
                        }
                        else {
                            reject(notFoundError);
                        }
                    }
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQueryUpdate(errorService, query, ...params) {
        return new Promise((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection) => {
                connection.query(query, params, (queryError, rows) => {
                    if (queryError) {
                        reject(errorService.getError(enum_1.AppError.QueryError));
                    }
                    else {
                        resolve();
                    }
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static createNew(errorService, query, original, ...params) {
        return new Promise((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection) => {
                const queries = [query, constants_1.StoreQueries.selectIdentity];
                const executeQuery = queries.join(";");
                let executionCounter = 0;
                connection.query(executeQuery, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enum_1.AppError.QueryError));
                    }
                    else {
                        executionCounter++;
                        const badQueryError = errorService.getError(enum_1.AppError.QueryError);
                        if (executionCounter === queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length === 1) {
                                    original.id = queryResult[0].id;
                                    resolve(original);
                                }
                                else {
                                    reject(badQueryError);
                                }
                            }
                            else {
                                reject(badQueryError);
                            }
                        }
                    }
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQuesryNoResult(errorService, query, ignoreNoRowsAffected, ...params) {
        return new Promise((resolve, reject) => {
            SQLHelper.openConnection(errorService)
                .then((connection) => {
                const q = connection.query(query, params, (queryError) => {
                    if (queryError) {
                        switch (queryError.code) {
                            case 547:
                                reject(errorService.getError(enum_1.AppError.DeletionConflict));
                                break;
                            default:
                                reject(errorService.getError(enum_1.AppError.QueryError));
                                break;
                        }
                    }
                });
                q.on('rowcount', (rowCount) => {
                    if (!ignoreNoRowsAffected && rowCount === 0) {
                        reject(errorService.getError(enum_1.AppError.NoData));
                        return;
                    }
                    resolve();
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static openConnection(errorService) {
        return new Promise((resolve, reject) => {
            SQLHelper.sql.open(constants_1.DB_CONNECTION_STRING, (connectionError, connection) => {
                if (connectionError) {
                    reject(errorService.getError(enum_1.AppError.ConnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
}
exports.SQLHelper = SQLHelper;
SQLHelper.sql = require(constants_1.DB_CLIENT);
