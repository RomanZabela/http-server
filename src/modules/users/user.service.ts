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
    getUserIDByEmployeeID(user_Employee_ID: number): Promise<number>
    //deleteById(id: number, userId: number): Promise<void>;
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
                const createDate: string = DateHelper.dateToString(new Date);

                const hashedPassword = await hash(user.User_Password as string, 10);
    
                result = await SQLHelper.createNew(StoreQueries.AddUser, user, user.user_Employee_ID, user.User_Login as string, hashedPassword, Status.Active, createDate, userId);
            }
            
            //result = this.getById
            return result = user;

            }
        catch(error: any) {
            throw(error as systemError);
        };
    };

    public async getUserIDByEmployeeID(user_Employee_ID: number): Promise<number>{
        try {

            return await SQLHelper.executeQuerySingle(StoreQueries.GetUserIDByEmployeeID, user_Employee_ID);

            }
        catch(error: any) {
            throw(error as systemError);
        };
    };


//     public deleteById(id: number, userId: number): Promise<void> {
//         return new Promise<void>((resolve, reject) => {
//             const updateDate: Date = new Date();

//             SQLHelper.executeQueryNoResult(this.errorService, StoreQueries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.Active, id, Status.Active)
//                 .then(() => {
//                     resolve();
//                 })
//                 .catch((error: ErrorService) => {
//                     reject(error);
//                 });
//         });
//    }
}

export default new UserService();