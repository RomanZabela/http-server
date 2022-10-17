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

    try {
        const userData: jwsUserData = await authenticationService.login(user.username, user.password);

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
    catch(error: any) {
        return ResponseHelper.handleError(res, error as systemError, true);
    }
    
};

export default { username };