import { TableNames } from "../../db-entities";
import { entityWithID, systemError, user } from "../../entities";
import DbService from "../../core/db.service";
import { SQLHelper } from "../../core/sql.helper";
import { StoreQueries } from "../../constants";
import { Status } from "../../enum";
import { DateHelper } from "../../framework/date.helper";
import { hash } from "bcryptjs";
import errorService from "../../core/error.service";


interface IUserService {
    getById(userId: number): Promise<user>;
    updateById(user: user, userId: number): Promise<void>;
    addUser(user: user, userId: number): Promise<entityWithID>;
    getUserIDByEmployeeID(user_Employee_ID: number): Promise<void>
    deleteById(id: number, userId: number): Promise<void>;
}

class UserService implements IUserService {

    constructor() { }

    public async getById(userId: number): Promise<user> {
        return await DbService.getFromTableById(TableNames.User, userId);
    }

    public async updateById(user: user, userId: number): Promise<void> {
        try {
        //return new Promise<user>((resolve, reject) => {
            const createDate: Date = new Date();

            const hashedPassword = await hash(user.User_Password as string, 10);

            await SQLHelper.executeQueryUpdate(StoreQueries.UpdateUserById, user.User_Login as string, hashedPassword, userId, DateHelper.dateToString(createDate), user.ID, Status.Active);
        }
        catch(error: any) {
            throw (error as systemError);
        }
    };

    public async addUser(user: user, userId: number): Promise<entityWithID>{
        try {

            let result: entityWithID;

            try{
                await this.getUserIDByEmployeeID(user.user_Employee_ID);
            }
            catch(error){
                if ((error as systemError).code === 102)
                {
                    const createDate: string = DateHelper.dateToString(new Date);

                    const hashedPassword = await hash(user.User_Password as string, 10);
    
                    result = await SQLHelper.createNew(StoreQueries.AddUser, user, user.user_Employee_ID, user.User_Login as string, hashedPassword, Status.Active, createDate, userId);
                }

            }
            
            return result = user;

            }
        catch(error: any) {
            throw(error as systemError);
        };
    };

    public async getUserIDByEmployeeID(user_Employee_ID: number): Promise<void>{
        try {

            await SQLHelper.executeQuerySingle(StoreQueries.GetUserIDByEmployeeID, user_Employee_ID, Status.Active);

            }
        catch(error: any) {
            throw(error as systemError);
        };
    };


    public async deleteById(id: number, userId: number): Promise<void> {
        try {
            const updateDate: Date = new Date();

            const user: user = await this.getById(id);

            await SQLHelper.executeQueryNoResult(StoreQueries.DeleteUser, false, Status.NotActive, userId, DateHelper.dateToString(updateDate), 0, id, Status.Active);
        }                
        
        catch(error) {
            throw(error as systemError);
            };
        };
}

export default new UserService();