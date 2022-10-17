"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
const enum_1 = require("../enum");
class ErrorService {
    constructor() {
        this._error = {};
        this.initializeErrors();
    }
    getError(key) {
        return this._error[key];
    }
    initializeErrors() {
        this._error[enum_1.AppError.General] = {
            key: enum_1.AppError.General,
            code: 99,
            message: "General error. Take a look here!"
        };
        this._error[enum_1.AppError.ConnectionError] = {
            key: enum_1.AppError.ConnectionError,
            code: 100,
            message: "DB server connection error"
        };
        this._error[enum_1.AppError.QueryError] = {
            key: enum_1.AppError.QueryError,
            code: 101,
            message: "Incorrect query"
        };
        this._error[enum_1.AppError.NoData] = {
            key: enum_1.AppError.NoData,
            code: 102,
            message: "Data Not found!"
        };
        this._error[enum_1.AppError.NonNumericInput] = {
            key: enum_1.AppError.NonNumericInput,
            code: 103,
            message: "Non numeric input supplier!"
        };
        this._error[enum_1.AppError.InputParameterSupplied] = {
            key: enum_1.AppError.InputParameterSupplied,
            code: 104,
            message: "Input parametr not supplied!"
        };
        this._error[enum_1.AppError.DeletionConflict] = {
            key: enum_1.AppError.DeletionConflict,
            code: 105,
            message: "Delete failed due to conflict!"
        };
    }
}
exports.ErrorService = ErrorService;
