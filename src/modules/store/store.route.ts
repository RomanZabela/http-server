import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import StoreController from "./store.controller"
import AuthMiddleware from "../../middleware/auth.middleware";
import { Roles } from "../../enum";

export class StoreRoute extends RouteConfig {

  constructor(app: Application) {
    super(app, "StoreRoute", "general");
  }

  public configureRoutes() {
    this.app.route(`/${this.baseUrl}/stores`).get(([AuthMiddleware.verifyToken([Roles.Administrator, Roles.UsualUser])]),[StoreController.getStores]);
    this.app.route(`/${this.baseUrl}/store/:id`).get(([AuthMiddleware.verifyToken([Roles.Administrator, Roles.UsualUser])]),[StoreController.getStoreByID]);
    return this.app
  }

}