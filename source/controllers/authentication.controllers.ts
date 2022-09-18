import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorService } from '../services/error.service';
import { systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';

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
            const token: string = "1";
            return res.status(200).json({
                token: token
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error, true);
        });
};

export default { username };