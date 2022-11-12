import bcrypt from "bcryptjs";
import { UserQueries } from "../../constants";
import { entityWithID, jwsUserData, systemError } from "../../entities";
import { AppError, Roles, Status } from "../../enum";
import { SQLHelper } from "../sql.helper";
import ErrorService from "../error.service";

interface localUser extends entityWithID{
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
            const user: localUser = await SQLHelper.executeQuerySingle<localUser>(UserQueries.GetUserByLogin, username, Status.Active)
            if (bcrypt.compareSync(password, user.User_password)) {
                const result: jwsUserData = {
                    userId: user.ID,
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