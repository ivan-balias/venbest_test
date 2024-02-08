import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {JobService} from "../services/job.service";
import {CreateJobDto} from "../dto/create_job.dto";

@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService) {
    }

    @Post('')
    async create(@Body() createJobDTO: CreateJobDto) {
        try {
            return this.jobService.createJob(createJobDTO)
        } catch (e) {
            return e;
        }
    }
}
