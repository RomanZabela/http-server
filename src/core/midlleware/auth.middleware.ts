import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticationRequest, jwsUserData } from "../../entities";
import { Roles } from "../../enum";
import { TOKEN_KEY } from "../../constants";

interface jwtBase {
    userData: jwsUserData;
    exp: number;
    iat: number;
}

class AuthMidlleware {

    public verifyToken = (roles: Roles[]) => (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined = req.headers["authorization"]?.toString();

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        try {
            //'Bearer'
            token = token.substring("Bearer ".length);
            const decoded: string | JwtPayload = jwt.verify(token, TOKEN_KEY);
            if (roles.indexOf((decoded as jwtBase).userData.roleID) === -1) {
                return res.sendStatus(401);
            }
            (req as AuthenticationRequest).userData = (decoded as jwtBase).userData;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }

        return next();
    }
    
    }
    
    export default new AuthMidlleware();