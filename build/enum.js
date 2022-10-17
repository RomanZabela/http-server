"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.Roles = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Active"] = 1] = "Active";
    Status[Status["NotActive"] = 2] = "NotActive";
})(Status = exports.Status || (exports.Status = {}));
var Roles;
(function (Roles) {
    Roles[Roles["Aministrator"] = 1] = "Aministrator";
    Roles[Roles["UsualUser"] = 2] = "UsualUser";
})(Roles = exports.Roles || (exports.Roles = {}));
var AppError;
(function (AppError) {
    AppError["General"] = "General";
    AppError["ConnectionError"] = "ConnectionError";
    AppError["QueryError"] = "QueryError";
    AppError["NoData"] = "NoData";
    AppError["NonNumericInput"] = "NonNumericInput";
    AppError["InputParameterSupplied"] = "InputParameterSupplied";
    AppError["DeletionConflict"] = "DeletionConflict";
})(AppError = exports.AppError || (exports.AppError = {}));
