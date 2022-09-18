import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKEN_KEY } from "../constants";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers["authorization"]?.toString();
    
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        token = token.substring("Bearer ".length);

        const decoded = jwt.verify(token, TOKEN_KEY);

        
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;