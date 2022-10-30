import { Application } from "express";
import { RouteConfig } from "../../framework/route.config";
import AuthenticationController from "./auth.controller" 

export class AuthenticationRoutes extends RouteConfig {
    
    constructor(app: Application) {
        super(app, "AuthenticationRoutes");
    }

    public configureRoutes() {
        this.app.route('/login').post([AuthenticationController.login]);
        return this.app;
    }
}