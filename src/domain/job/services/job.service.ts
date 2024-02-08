import {BadRequestException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {Repository} from "typeorm";
import {Job} from "../entity/job.entity";
import {CreateJobDto} from "../dto/create_job.dto";
import {Task} from "../../task/entity/task.entity";
import {User} from "../../user/entity/user.entity";
import {calculateJobPricePerTime} from "../../../utils/time";

@Injectable()
export class JobService {

    constructor(
        @Inject('JOB_REPOSITORY') private jobRepository: Repository<Job>,
        @Inject('TASK_REPOSITORY') private taskRepository: Repository<Task>,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    ) {
    }

    async createJob(createJobDTO: CreateJobDto) {
        const {taskId, userId, startTime, endTime} = createJobDTO;
        const task = await this.taskRepository.findOne({where: {id: taskId}})
        if (!task)
            throw new NotFoundException(`Task not found`)

        const user = await this.userRepository.findOne({where: {id: userId}})
        if (!user)
            throw new NotFoundException(`User not found`)

        const jobs = await this.jobRepository.find({where: {task: {id: taskId}}, relations: ['user']})

        const jobsPrice: number = jobs.reduce((acc, job) => {
            const calculatedPrice = calculateJobPricePerTime(job)
            return acc + calculatedPrice.price;
        }, 0)

        const {cost} = task;

        const diffHours = Math.abs(new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);
        let hours = Math.floor(diffHours);
        let minutes = (diffHours - hours) * 60;

        const {rate} = user;
        if (minutes > 15)
            hours++;

        const price = hours * rate;
        if(jobsPrice + price > cost)
            throw new BadRequestException('Exceeding the budget limit for the task')

        const newJob = {
            user: user,
            task: task,
            startTime: startTime,
            endTime: endTime
        }
        await this.jobRepository.save(newJob);


        return Math.ceil((100 * (jobsPrice + price)) / cost);
    }
}
