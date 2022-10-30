import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { NON_EXISTING_ID } from "../constants";
import { TableNames } from "../db-entities";
import { AuthenticationRequest, systemError, user } from "../entities";
import { RequestHelper } from "../helpers/request.helper";
import { ResponseHelper } from "../helpers/response.helper";
import { DbService } from "../services/db.service";
import { ErrorService } from "../services/error.service";
import { UserService } from "../services/user.service";

const errorService: ErrorService = new ErrorService();
const userService: UserService = new UserService(errorService);
const dbService: DbService = new DbService(errorService);

const getById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const result: user = await dbService.getFromTableById(TableNames.User, numericParamOrError);
            return res.status(200).json(result);
        } else {

        }

    } else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const add = async (req: Request, res: Response, next: NextFunction) => {
    const body: user = req.body;

    const hashedPassword: string = bcrypt.hashSync(body.User_Password as string);

    userService.add({
        id: NON_EXISTING_ID,
        User_FirstName: body.User_FirstName,
        User_LastName: body.User_LastName,
        User_Login: body.User_Login,
        User_Password: hashedPassword
    }, (req as AuthenticationRequest).userData.userId)
        .then((result: user) => {
            const returnedUser: user = {
                id: result.id,
                User_FirstName: result.User_FirstName,
                User_LastName: result.User_LastName
            };
            return res.status(200).json(returnedUser);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: user = req.body;

            userService.updateById({
                id: numericParamOrError,
                User_FirstName: body.User_FirstName,
                User_LastName: body.User_LastName
            }, (req as AuthenticationRequest).userData.userId)
            .then((result: user) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        } else {

        }
    } else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            userService.deleteById(numericParamOrError, (req as AuthenticationRequest).userData.userId)
            .then(() => {
                return res.sendStatus(200);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        } else {

        }
    } else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
}

export default { getById, add, updateById, deleteById};