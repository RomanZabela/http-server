import { Response } from "express";
import { ErrorCodes, General } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helper";

export class RequestHelper {
    static handlerError(res: Response<any, Record<string, any>>, error: systemError): any {
        throw new Error('Method not implemented.');
    }

    public static ParseNumericInput(input: string): number | systemError {
        let result: number = -1;

        if (isNaN(Number(input))) {
            return ErrorHelper.createError(ErrorCodes.NonNumericInput, General.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        } else {
            return ErrorHelper.createError(ErrorCodes.InputParameterSupplied, General.InputParameterNotSupplied);
        }

        return result;
    }
}