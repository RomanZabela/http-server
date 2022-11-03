import { Application } from "express";
import { RouteConfig } from "../../framework/route.config";
import AuthenticationController from "./auth.controller" 

export class AuthenticationRoutes extends RouteConfig {
    
    constructor(app: Application) {
        super(app, "AuthenticationRoutes", "auth");
    }

    public configureRoutes() {
        this.app.route(`/${this.baseUrl}/login`).post([AuthenticationController.login]);
        return this.app;
    }
}