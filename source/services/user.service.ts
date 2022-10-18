import { reject, result } from "underscore";
import { SqlParameters, StoreQueries } from "../constants";
import { entityWithID, systemError, user } from "../entities";
import { Roles, Status } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { SQLHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface IUserService {
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;
}

export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
    ) { }

    public updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());

            SQLHelper.createNew(this.errorService, StoreQueries.AddUser, user, user.firstName, user.lastName, user.username as string, Roles.UsualUser, createDate, userId, Status.Active)
                .then ((result: entityWithID) => {
                    resolve(result as user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public add(user: user, userId: number): Promise<user>{
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date);

            SQLHelper.createNew(this.errorService, StoreQueries.AddUser, user, user.firstName, user.lastName, user.username as string, Roles.UsualUser, createDate, userId, Status.Active)
                .then((result: entityWithID) => {
                    resolve(result as user);
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