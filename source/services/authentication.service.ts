import bcrypt from "bcryptjs";
import { StoreQueries } from "../constants";
import { entityWithID, systemError } from "../entities";
import { AppError } from "../enum";
import { SQLHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localUser extends entityWithID {
    password: string;
}

interface IAuthenticationService {
    login(username: string, password: string): Promise<number>;
}

export class AuthenticationService implements IAuthenticationService {
    
    constructor(
        private errorService: ErrorService
    ) { }

    public login(username: string, password: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            SQLHelper.executeQuerySingle<localUser>(this.errorService, StoreQueries.GetUserByLogin, username)
                .then((user: localUser) => {
                    if (bcrypt.compareSync(password, user.password)) {
                        resolve(user.id);
                    } else {
                        reject(this.errorService.getError(AppError.NoData));
                    }
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }
}