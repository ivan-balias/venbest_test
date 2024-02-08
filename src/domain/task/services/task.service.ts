import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Task} from "../entity/task.entity";
import {FilterTasksDto} from "../dto/filter.dto";
import {calculateJobPricePerTime} from "../../../utils/time";


@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_REPOSITORY') private taskRepository: Repository<Task>,
    ) {
    }

    async getAllTasks(): Promise<Omit<Task, 'jobs'>[]> {
        return this.calculateTaskSpentPercentage()
    }

    async getTasksWithFilter(filterDto: FilterTasksDto): Promise<Omit<Task, 'jobs'>[]> {
        const {minPercentage, maxPercentage} = filterDto;
        const tasks  = await this.calculateTaskSpentPercentage();
        return tasks.filter((task) => {
            return task.spentPercentage > minPercentage && task.spentPercentage < maxPercentage;
        })
    }

    private async calculateTaskSpentPercentage() {
        const tasks = await this.taskRepository.find({relations: ['jobs', 'jobs.user']});
        return tasks.map((task) => {
            const price = task.jobs.reduce((acc, job) => {
                const calculatedPrice = calculateJobPricePerTime(job);
                return acc + calculatedPrice.price;
            }, 0);
            const spentPercentage = Math.ceil((100 * price) / task.cost)

            return {
                id: task.id,
                cost: task.cost,
                spentPercentage: spentPercentage,
                startTime: task.startTime,
                endTime: task.endTime,
            }
        });
    }
}
