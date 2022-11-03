import { Request, Response, NextFunction, json } from "express";
import { authenticationToken, jwsUserData, systemError } from "../../entities";
import AuthenticationService from "../authentication/authentication.service";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../constants";
import { ResponseHelper } from "../../framework/response.helper";

interface localUser {
    username: string;
    password: string;
}

class AuthenticationController {

    constructor() {}

    async login(req: any, res: Response, next: NextFunction) {
        const user: localUser = req.body;

        try {
            const userData: jwsUserData = await AuthenticationService.login(user.username, user.password);

            const authenticationToken: authenticationToken = {
                userData: userData
            };

            const token: string = jwt.sign(
                authenticationToken,
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            return res.status(200).json({
                token: token
            });
        }
        catch (error: any) {
            return ResponseHelper.handleError(res, error as systemError, true);
        }
    }
}

export default new AuthenticationController();