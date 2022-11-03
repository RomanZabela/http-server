import bcrypt from "bcryptjs";
import { StoreQueries } from "../../constants";
import { jwsUserData, systemError } from "../../entities";
import { AppError, Roles } from "../../enum";
import { SQLHelper } from "../sql.helper";
import ErrorService from "../error.service";

interface localUser {
    User_id: number;
    User_password: string;
    Role_ID: Roles;
}

interface IAuthenticationService {
    login(username: string, password: string): Promise<jwsUserData>;
}

class AuthenticationService implements IAuthenticationService {
    
    constructor() { }

    public async login(username: string, password: string): Promise<jwsUserData> {
        try {
            const user: localUser = await SQLHelper.executeQuerySingle<localUser>(StoreQueries.GetUserByLogin, username)
            if (bcrypt.compareSync(password, user.User_password)) {
                const result: jwsUserData = {
                    userId: user.User_id,
                    roleID: user.Role_ID
                }
                return result;
            } else {
                    throw (ErrorService.getError(AppError.NoAuthentication));
                    }
        }
        catch(error: any) {
            throw (error as systemError);
            }
    };
}

export default new AuthenticationService();