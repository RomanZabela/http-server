import { Application } from "express";
import authMiddleware from "../../core/midlleware/auth.middleware";
import { Roles } from "../../enum";
import { RouteConfig } from "../../framework/route.config";
import EmployeesController from "./employee.controller"

export class EmployeeRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "EmployeeRoutes", "general");
    }

    public configureRoutes() {
        this.app.route(`/${this.baseUrl}/employee/:id`).get(([authMiddleware.verifyToken([Roles.Administrator])]), [EmployeesController.getEmployeeById]);
        this.app.route(`/${this.baseUrl}/employee/:id`).put(([authMiddleware.verifyToken([Roles.Administrator])]), [EmployeesController.updateEmployeeById]);
        this.app.route(`/${this.baseUrl}/employee`).post(([authMiddleware.verifyToken([Roles.Administrator])]), [EmployeesController.addEmployee]);
        this.app.route(`/${this.baseUrl}/employee-delete/:id`).put(([authMiddleware.verifyToken([Roles.Administrator])]), [EmployeesController.deleteEmployee]);
        return this.app;
    }
}