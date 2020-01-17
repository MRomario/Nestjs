import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { TaskFilterDto } from './dto/filter.task.dto';
import { TaskStatusValidationPipe } from './pipes/task.status.validation.pipes';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }




    // @Get()
    // getAll(@Query(ValidationPipe) filterTaskDto: TaskFilterDto): Task[] {

    //     if (Object.keys(filterTaskDto).length) {
    //         return this.tasksService.getTasksFiter(filterTaskDto);
    //     } else {
    //         return this.tasksService.getAll();
    //     }

    // }

    // @Get('/:id')
    // getOne(@Param('id') id: string): Task {
    //     return this.tasksService.getOne(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // create(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.create(createTaskDto);
    // }

    // @Delete('/:id')
    // delete(@Param('id') id: string) {
    //     this.tasksService.delete(id);
    // }

    // @Patch('/:id/status')
    // update(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.update(id, status);
    // }
}
