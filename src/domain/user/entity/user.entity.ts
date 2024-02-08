import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Job} from "../../job/entity/job.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({type: 'int'})
    rate: number;

    @OneToMany(()=> Job, job => job.user)
    jobs: Job[]
}
