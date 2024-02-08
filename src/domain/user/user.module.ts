import {Module} from "@nestjs/common";
import {UserController} from "./http/user.controller";
import {userProviders} from "./providers/user.providers";
import {UserService} from "./services/user.service";
import {DatabaseModule} from "../../database/database.module";

@Module({
    imports: [
      DatabaseModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        ...userProviders,
        UserService
    ],
    exports: [
        ...userProviders
    ]
})
export class UserModule{
}
