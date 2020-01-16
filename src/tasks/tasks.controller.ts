import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAll(): Task[] {
        return this.tasksService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: string): Task {
        return this.tasksService.getOne(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.create(createTaskDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        this.tasksService.delete(id);
    }

    @Patch('/:id/status')
    update(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.update(id, status);
    }
}