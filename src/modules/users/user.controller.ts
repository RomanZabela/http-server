import { Request, Response, NextFunction } from "express"
import { RequestHelper } from "../../core/request.helper";
import { AuthenticationRequest, systemError, user } from "../../entities"
import { ResponseHelper } from "../../framework/response.helper";
import UserService from "./user.service";

class UserController {
  constructor() {}

  async getUsersById(req: any, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof numericParamOrError === "number") {
      if (numericParamOrError > 0) {
        const result: user = await UserService.getById(numericParamOrError);
        return res.status(200).json(result);
      } else {

      }
    } else {
      return ResponseHelper.handleError(res, numericParamOrError);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof(numericParamOrError) === "number") {
      if (numericParamOrError > 0) {
        const body: user = req.body;
        const result: user = await UserService.getById(numericParamOrError);
        UserService.updateById({
          id: numericParamOrError,
          User_FirstName: body.User_FirstName,
          User_LastName: body.User_LastName
        }, (req as AuthenticationRequest).userData.userId)
        .then ((result: user) => {
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
  }
}

export default new UserController()