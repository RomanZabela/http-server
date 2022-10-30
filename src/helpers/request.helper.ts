import { NON_EXISTING_ID } from "../constants";
import { systemError } from "../entities";
import { AppError } from "../enum";
import ErrorService from "../core/error.service";

export class RequestHelper {

    public static ParseNumericInput(input: string): number | systemError {
        let result: number = NON_EXISTING_ID;

        if (isNaN(Number(input))) {
            return ErrorService.getError(AppError.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        } else {
            return ErrorService.getError(AppError.InputParameterNotSupplied);
        }

        return result;
    }
}