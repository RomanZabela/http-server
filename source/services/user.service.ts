import { reject, result } from "underscore";
import { SqlParameters, StoreQueries } from "../constants";
import { entityWithID, systemError } from "../entities";
import { Roles, Status } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { SQLHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface IUserService {
    updateById(user: User, userId: number): Promise<User>;
    add(user: User, userId: number): Promise<User>;
    deleteById(id: number, userId: number): Promise<void>;
}

export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
    ) { }

    public updateById(user: User, userId: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());

            SQLHelper.createNew(this.errorService, StoreQueries.AddUser, user, user.firstName, user.lastName, user.username as string, Roles.UsualUser, createDate, userId, Status.Active)
                .then ((result: entityWithID) => {
                    resolve(result as User);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public add(user: User, userId: number): Promise<User>{
        return new Promise<User>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date);

            SQLHelper.createNew(this.errorService, StoreQueries.AddUser, user, user.firstName, user.lastName, user.username as string, Roles.UsualUser, createDate, userId, Status.Active)
                .then((result: entityWithID) => {
                    resolve(result as User);
                })
                .catch((error: ErrorService) => {
                    reject(error);
                });
        });
    }

    public deleteById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();

            SQLHelper.executeQueryNoResult(this.errorService, StoreQueries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.Active, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: ErrorService) => {
                    reject(error);
                });
        });
   }
}