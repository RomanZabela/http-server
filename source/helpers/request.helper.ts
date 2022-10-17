import { NON_EXISTING_ID } from "../constants";
import { systemError } from "../entities";
import { AppError } from "../enum";
import { ErrorService } from "../services/error.service";

export class RequestHelper {

    public static ParseNumericInput(errorService: ErrorService, input: string): number | systemError {
        let result: number = NON_EXISTING_ID;

        if (isNaN(Number(input))) {
            return errorService.getError(AppError.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        } else {
            return errorService.getError(AppError.InputParameterSupplied);
        }

        return result;
    }
}