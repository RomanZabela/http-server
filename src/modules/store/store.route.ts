import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import StoreController from "./store.controller"
import AuthMiddleware from "../../core/midlleware/auth.middleware";
import { Roles } from "../../enum";

export class StoreRoute extends RouteConfig {

  constructor(app: Application) {
    super(app, "StoreRoute", "general");
  }

  public configureRoutes() {
    this.app.route(`/${this.baseUrl}/stores`).get(([AuthMiddleware.verifyToken([Roles.Administrator, Roles.UsualUser])]),[StoreController.getStores]);
    this.app.route(`/${this.baseUrl}/store/:id`).get(([AuthMiddleware.verifyToken([Roles.Administrator, Roles.UsualUser])]),[StoreController.getStore]);
    this.app.route(`/${this.baseUrl}/store`).post(([AuthMiddleware.verifyToken([Roles.Administrator, Roles.UsualUser])]),[StoreController.addStore]);
    this.app.route(`/${this.baseUrl}/store/:id`).put([AuthMiddleware.verifyToken([Roles.Administrator]), StoreController.updateStoreByID]);
    this.app.route(`/${this.baseUrl}/stores/delete`).put([AuthMiddleware.verifyToken([Roles.Administrator]), StoreController.deleteStoreByID]);
    return this.app
  }

}