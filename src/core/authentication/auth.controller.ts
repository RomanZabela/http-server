import { Request, Response, NextFunction, json } from "express";

class AuthenticationController {

    constructor() {}

    async login(req: any, res: Response, next: NextFunction) {
        return res.status(200).json({
            success: true
        })
    }
}

export default new AuthenticationController();