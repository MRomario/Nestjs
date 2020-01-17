import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { TaskFilterDto } from './dto/filter.task.dto';
import { TaskStatusValidationPipe } from './pipes/task.status.validation.pipes';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    /**
     * Find all task
     * 
     * @return Task[]
     */
    @Get()
    findAll(@Query(ValidationPipe) filterDto: TaskFilterDto) {
        return this.tasksService.findAll(filterDto);
    }


    /**
     * Find one task by id
     * 
     * @param id
     * @return Task
     */
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.tasksService.findOne(id);
    }

    /**
     * Create one task
     */
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.delete(id);
    }

    @Patch('/:id/status')
    update(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.update(id, status);
    }



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
