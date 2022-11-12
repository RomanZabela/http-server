import { Request, Response, NextFunction } from "express";
import { NON_EXISTING_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticationRequest, Employee, systemError } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import employeeService from "./employee.service";

class EmployeesController {

    constructor() {}

    async getEmployeeById(req: Request, res: Response, next: NextFunction){
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if(typeof(numericParamOrError) === 'number') {
            if(numericParamOrError > 0) {
                const result: Employee = await employeeService.getEmployeeById(numericParamOrError);
                return res.status(200).json(result);
            } else {

            }
        } else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }

    }

    async updateEmployeeById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if(typeof(numericParamOrError) === 'number'){
            if (numericParamOrError > 0) {
                try {
                    const body: Employee = req.body;

                    await employeeService.updateEmployeeById({
                        ID: numericParamOrError,
                        FirstName: body.FirstName,
                        LastName: body.LastName
                    }, (req as AuthenticationRequest).userData.userId);

                    const result = await employeeService.getEmployeeById(numericParamOrError);

                    return res.status(200).json(result);
                }
                catch (error: any) {
                    return ResponseHelper.handleError(res, error)
                }
            } else {

            }
        } else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async addEmployee(req: Request, res: Response, next: NextFunction){
        try {
            const body: Employee = req.body;

            const result = await employeeService.addEmployee({
                ID: NON_EXISTING_ID,
                FirstName: body.FirstName,
                LastName: body.LastName
            }, (req as AuthenticationRequest).userData.userId)

            return res.status(200).json(result.ID);
        }
        catch(error: any){
            return ResponseHelper.handleError(res, error);
        }
    }

    async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if (typeof (numericParamOrError) === 'number') {
            if (numericParamOrError > 0) {
                try {
                    await employeeService.deleteEmployee(numericParamOrError, (req as AuthenticationRequest).userData.userId)                    

                    return res.status(200).json(numericParamOrError);
                }
                catch (error: any) {
                    return ResponseHelper.handleError(res, error);
                }
            } else {

            }
        } else {
            return ResponseHelper.handleError(res, numericParamOrError)
        }
    }
}

export default new EmployeesController()