import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Job} from "../../job/entity/job.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    cost: number;

    @Column({type: 'timestamp'})
    startTime: Date;

    @Column({type: 'timestamp'})
    endTime: Date;

    @OneToMany(() => Job, job => job.task)
    jobs: Job[];
}
