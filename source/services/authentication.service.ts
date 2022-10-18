import bcrypt from "bcryptjs";
import { StoreQueries } from "../constants";
import { entityWithID, jwsUserData, systemError } from "../entities";
import { AppError, Roles } from "../enum";
import { SQLHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localUser extends entityWithID {
    password: string;
    role_id: Roles;
}

interface IAuthenticationService {
    login(username: string, password: string): Promise<jwsUserData>;
}

export class AuthenticationService implements IAuthenticationService {
    
    constructor(
        private errorService: ErrorService
    ) { }

    public async login(username: string, password: string): Promise<jwsUserData> {
        try {
            const user: localUser = await SQLHelper.executeQuerySingle<localUser>(this.errorService, StoreQueries.GetUserByLogin, username)
            if (bcrypt.compareSync(password, user.password)) {
                const result: jwsUserData = {
                    userId: user.id,
                    roleID: user.role_id
                }
                return result;
            } else {
                    throw (this.errorService.getError(AppError.NoData));
                    }
        }
        catch(error: any) {
            throw (error as systemError);
            }
    };
}