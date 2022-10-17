import { ErrorService } from "../services/error.service";
import { UserService } from "../services/user.service";

const errorService: ErrorService = new ErrorService();
const userService: UserService = new UserService(errorService);
