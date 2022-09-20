import jwt, { JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKEN_KEY } from "../constants";

interface AuthenticationRequest extends Request {
    userID: number;
}

interface jwtBase {
    userID: number;
    exp: number;
    iat: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers["authorization"]?.toString();
    
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        token = token.substring("Bearer ".length);

        const decoded: string | JwtPayload = jwt.verify(token, TOKEN_KEY);
        (req as AuthenticationRequest).userID = (decoded as jwtBase).userID;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
        return next();
};

export default { verifyToken };