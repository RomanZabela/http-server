"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../constants");
const enum_1 = require("../enum");
const sql_helper_1 = require("../helpers/sql.helper");
class AuthenticationService {
    constructor(errorService) {
        this.errorService = errorService;
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SQLHelper.executeQuerySingle(this.errorService, constants_1.StoreQueries.GetUserByLogin, username)
                .then((user) => {
                if (bcryptjs_1.default.compareSync(password, user.password)) {
                    resolve(user.id);
                }
                else {
                    reject(this.errorService.getError(enum_1.AppError.NoData));
                    console.log("didn't match!");
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
