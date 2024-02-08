import {DataSource} from "typeorm";
import {Job} from "../entity/job.entity";

export const jobProviders = [
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
        inject: ['DATA_SOURCE']
    }
]
