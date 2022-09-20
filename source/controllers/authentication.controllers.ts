import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorService } from '../services/error.service';
import { systemError, jwsUserData } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { TOKEN_KEY } from '../constants';
import jwt from 'jsonwebtoken';

interface localUser {
    username: string,
    password: string,
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const username = async (req: Request, res: Response, next: NextFunction) => {
    const user: localUser = req.body;

    authenticationService.login(user.username, user.password)
        .then((id: number) => {
            const jwtUser: jwsUserData = {
                userId: id
            };
            const token: string = jwt.sign(
                jwtUser,
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            return res.status(200).json({
                token: token
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error, true);
        });
};

export default { username };