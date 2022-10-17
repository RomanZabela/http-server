"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_controllers_1 = __importDefault(require("../controllers/store.controllers"));
const route = express_1.default.Router();
route.get('/stores', store_controllers_1.default.getStores);
route.get('/store/:id', store_controllers_1.default.getStoreByID);
route.put('/store-capacity/:id', store_controllers_1.default.updateStoreByID);
route.post('/store-add-new', store_controllers_1.default.addStore);
exports.default = { route };
