import { TableNames } from "../../db-entities";
import { systemError, user } from "../../entities";
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
    //add(user: user, userId: number): Promise<user>;
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

            const hashedPassword = await hash(user.User_Password as string, 12);

            await SQLHelper.executeQueryUpdate(StoreQueries.UpdateUserById, user.User_Login as string, hashedPassword, userId, DateHelper.dateToString(createDate), user.id, Status.Active);
        }
        catch(error: any) {
            throw (error as systemError);
        }
    };

//     public add(user: user, userId: number): Promise<user>{
//         return new Promise<user>((resolve, reject) => {
//             const createDate: string = DateHelper.dateToString(new Date);

//             SQLHelper.createNew(this.errorService, StoreQueries.AddUser, user, user.User_FirstName, user.User_LastName, user.User_Login as string, Roles.UsualUser, createDate, userId, Status.Active)
//                 .then((result: entityWithID) => {
//                     resolve(result as user);
//                 })
//                 .catch((error: ErrorService) => {
//                     reject(error);
//                 });
//         });
//     }

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