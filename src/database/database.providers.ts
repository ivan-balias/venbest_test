import {DataSource} from "typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: "mysql",
                database: configService.get<string>('db_name'),
                host: configService.get<string>('db_host'),
                port: configService.get<number>('db_port'),
                username: configService.get<string>('db_username'),
                password: configService.get<string>('db_password'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    }
]
