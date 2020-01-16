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

    getOne(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    create(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = { id: uuid(), title, description, status: TaskStatus.OPEN };
        this.tasks.push(task);
        return task;
    }

    delete(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    update(id: string, status: TaskStatus): Task {
        const task = this.getOne(id);
        task.status = status;
        return task;
    }
}
