import { Request, Response, NextFunction } from "express"
import { NON_EXISTING_ID } from "../../constants";
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
        try {
        const body: user = req.body;
        
        await UserService.updateById({
          ID: numericParamOrError,
          user_Employee_ID: body.user_Employee_ID,
          User_Login: body.User_Login,
          User_Password: body.User_Password
        }, (req as AuthenticationRequest).userData.userId)

        const result: user = await UserService.getById(numericParamOrError);

          return res.status(200).json(result);
        }
        catch(error: any) {
          return ResponseHelper.handleError(res, error);
        };
      } else {

      }
    } else {
      return ResponseHelper.handleError(res, numericParamOrError);
    }
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body: user = req.body;

      const result = await UserService.addUser({
          ID: NON_EXISTING_ID,
          user_Employee_ID: body.user_Employee_ID,
          User_Login: body.User_Login,
          User_Password: body.User_Password
      }, (req as AuthenticationRequest).userData.userId);

      return res.status(200).json(result.ID);
    }
    
    catch(error: any) {
        return ResponseHelper.handleError(res, error);
    };

}

}

export default new UserController()