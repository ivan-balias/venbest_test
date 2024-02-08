import {Controller, Delete, Get, Patch, Post} from "@nestjs/common";


@Controller('user')
export class UserController {
    @Get('')
    async list() {
        return ''
    }

    @Post('')
    async create() {
        return ''
    }

    @Get(':id')
    async read() {
        return ''
    }

    @Patch(':id')
    async update() {
        return ''
    }

    @Delete(':id')
    async delete() {
        return ''
    }
}
