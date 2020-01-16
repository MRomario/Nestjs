import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';
import * as uuid from 'uuid/v1'; 

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    create(createTaskDto: CreateTaskDto): Task {

        // if use DTO destruct dto
        const {title, description} = createTaskDto

        const task : Task = {id: uuid(), title, description, status: TaskStatus.OPEN };
        this.tasks.push(task);
        return task;
    }
}
