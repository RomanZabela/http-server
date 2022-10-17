"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const enum_1 = require("../enum");
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
const error_service_1 = require("../services/error.service");
const store_service_1 = require("../services/store.service");
const errorService = new error_service_1.ErrorService();
const storeService = new store_service_1.StoreService(errorService);
const getStores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    storeService.getStores()
        .then((result) => {
        return res.status(200).json({
            message: result
        });
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
const getStoreByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            storeService.getStore(numericParamOrError)
                .then((result) => {
                return res.status(200).json(result);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const updateStoreByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body = req.body;
            storeService.updateStore({
                id: numericParamOrError,
                storeCapacity: body.storeCapacity,
                storeName: body.storeName,
                storeAdress: "",
                storeActive: 1,
                storeUpdateDate: new Date(),
            })
                .then(() => {
                return res.sendStatus(200);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const addStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    storeService.addStore({
        id: constants_1.NON_EXISTING_ID,
        storeCapacity: body.storeCapacity,
        storeName: body.storeName,
        storeAdress: body.storeAdress,
        storeActive: enum_1.Status.Active,
        storeUpdateDate: new Date(),
    })
        .then((result) => {
        return res.status(200).json(result);
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
exports.default = { getStores, getStoreByID, updateStoreByID, addStore };
