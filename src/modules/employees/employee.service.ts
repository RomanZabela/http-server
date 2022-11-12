import { EmployeeQueries, SqlParameters } from "../../constants";
import dbService from "../../core/db.service";
import { SQLHelper } from "../../core/sql.helper";
import { TableNames } from "../../db-entities";
import { Employee, entityWithID, systemError } from "../../entities";
import { Status } from "../../enum";
import { DateHelper } from "../../framework/date.helper";
import userService from "../users/user.service";

interface IEmployeeService{

}

class EmployeeService implements IEmployeeService {

    constructor() {}

    public async getEmployeeById(EmployeeID: number): Promise<Employee> {
        return await dbService.getFromTableById(TableNames.Employee, EmployeeID);
    }

    public async updateEmployeeById(employee: Employee, userId: number): Promise<void>{
        try {
            const updateDate: Date = new Date();

            await SQLHelper.executeQueryUpdate(EmployeeQueries.UpdateEmployeeByLogin, employee.FirstName, employee.LastName, DateHelper.dateToString(updateDate), userId, employee.ID, Status.Active);

        }
        catch(error) {
            throw(error as systemError);
        }

    }

    public async addEmployee(employee: Employee, userId: number): Promise<entityWithID>{
        try {

            const updateDate: Date = new Date();

            return await SQLHelper.createNew(EmployeeQueries.AddEmployee, employee, employee.FirstName, employee.LastName, Status.Active, DateHelper.dateToString(updateDate), userId);

        }
        catch (error) {
            throw (error as systemError);
        }
    }

    public async deleteEmployee(employeeId: number, userId: number): Promise<void>{
        try{
            const updateDate: Date = new Date();
            

            await SQLHelper.executeQueryNoResult(EmployeeQueries.DeleteEmployee, false, Status.NotActive, DateHelper.dateToString(updateDate), userId, employeeId, Status.Active);

            try {
                const userIdToDelete: entityWithID = await userService.getUserIDByEmployeeID(employeeId);
                await userService.deleteById(userIdToDelete.ID, userId);
            }
            catch(error){
                throw(error as systemError)
            }
        }

        catch(error){
            throw(error as systemError);
        }
    }

}

export default new EmployeeService();