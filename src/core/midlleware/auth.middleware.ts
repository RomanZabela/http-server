import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const log: IDebugger = debug("middleware:JWT");

class AuthMidlleware {

    authenticateJWT(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization    
        if (authHeader && authHeader !== "null") {

          // const token = authHeader.split(" ")[1];    
            log("auth Header", TOKEN_KEY)    
            jwt.verify(authHeader, TOKEN_KEY, (err: any, user: any) => {    
                if (err) {    
                    log("Error", err)
                    return res
                    .status(403)
                    .send({ success: false, message: "Token Expired" })
                }
            req.user = user
            next()    
          })
    
        } else {    
          res.status(403).json({ success: false, message: "UnAuthorized" })    
        }
    
      }
    
    }
    
    export default new AuthMidlleware();