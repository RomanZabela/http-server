import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import UserController from "./store.controller"

export class StoreRoute extends RouteConfig {

  constructor(app: Application) {
    super(app, "StoreRoute")
  }

  public configureRoutes() {
    this.app.route(`/stores`).get([UserController.getStores])
    return this.app
  }

}