import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entity/user.entity";
import {Task} from "../../task/entity/task.entity";

@Entity()
export class Job{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Task, task=> task.jobs)
    task: Task;

    @ManyToOne(() => User, user => user.jobs)
    user: User;

    @Column({type: 'datetime'})
    startTime: Date;

    @Column({type: 'datetime'})
    endTime: Date;
}
