import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./config/database.config";
import appConfig from "./config/app.config";
import {JobModule} from "./domain/job/job.module";
import {TaskModule} from "./domain/task/task.module";
import {UserModule} from "./domain/user/user.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig]
        }),
        JobModule,
        TaskModule,
        UserModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
