"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHelper = void 0;
const constants_1 = require("../constants");
const enum_1 = require("../enum");
class RequestHelper {
    // static handlerError(res: Response<any, Record<string, any>>, error: systemError): any {
    //     throw new Error('Method not implemented.');
    // }
    static ParseNumericInput(errorService, input) {
        let result = constants_1.NON_EXISTING_ID;
        if (isNaN(Number(input))) {
            return errorService.getError(enum_1.AppError.NonNumericInput);
        }
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return errorService.getError(enum_1.AppError.InputParameterSupplied);
        }
        return result;
    }
}
exports.RequestHelper = RequestHelper;
