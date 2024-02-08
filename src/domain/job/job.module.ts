import {Module} from "@nestjs/common";
import {JobController} from "./http/job.controller";
import {jobProviders} from "./providers/job.providers";
import {JobService} from "./services/job.service";
import {DatabaseModule} from "../../database/database.module";
import {TaskModule} from "../task/task.module";
import {UserModule} from "../user/user.module";


@Module({
    imports: [
        DatabaseModule,
        TaskModule,
        UserModule
    ],
    controllers: [JobController],
    providers: [
        ...jobProviders,
        JobService
    ],
    exports: [
        ...jobProviders
    ]
})
export class JobModule {

}
