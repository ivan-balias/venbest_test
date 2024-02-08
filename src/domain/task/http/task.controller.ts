import {Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {TaskService} from "../services/task.service";
import {FilterTasksDto} from "../dto/filter.dto";


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get('')
    async list(@Query() filter: FilterTasksDto): Promise<any> {
        if (Object.keys(filter).length) {
            return this.taskService.getTasksWithFilter(filter);
        } else {
            return this.taskService.getAllTasks();
        }
    }
}
