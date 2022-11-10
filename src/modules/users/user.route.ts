import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import UserController from "./user.controller"
import authMiddleware from "../../core/midlleware/auth.middleware";
import { Roles } from "../../enum";
export class UserRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "UserRoutes", "user");
  }

  public configureRoutes() {
    this.app.route(`/${this.baseUrl}/:id`).get([authMiddleware.verifyToken([Roles.Administrator]), UserController.getUsersById])
    this.app.route(`/${this.baseUrl}/:id`).put([authMiddleware.verifyToken([Roles.Administrator]), UserController.updateById])
    this.app.route(`/${this.baseUrl}`).post([authMiddleware.verifyToken([Roles.Administrator]), UserController.addUser])
    this.app.route(`/${this.baseUrl}`).put([authMiddleware.verifyToken([Roles.Administrator]), UserController.deleteUserByID])
    return this.app
  }

}