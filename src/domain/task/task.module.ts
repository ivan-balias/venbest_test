import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database/database.module";
import {TaskController} from "./http/task.controller";
import {taskProviders} from "./providers/task.providers";
import {TaskService} from "./services/task.service";
import {JobModule} from "../job/job.module";


@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        TaskController
    ],
    providers: [
        ...taskProviders,
        TaskService
    ],
    exports: [
        ...taskProviders,
        TaskService
    ]
})
export class TaskModule{

}
