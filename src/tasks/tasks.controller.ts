import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
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
}
