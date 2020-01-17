import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';
import * as uuid from 'uuid/v1';
import { TaskFilterDto } from './dto/filter.task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    getTasksFiter(filterTaskDto: TaskFilterDto): Task[] {
        const { status, search } = filterTaskDto;

        let tasks = this.getAll();

        // search by status
        if (status) {
            tasks = tasks.filter(
                task =>
                    task.status === status
            );
        }

        // search by search string
        if (search) {
            tasks = tasks.filter(
                task =>
                    task.title.includes(search) ||
                    task.description.includes(search)
            );
        }
        return tasks;
    }

    getOne(id: string): Task {

        const dataSearch = this.tasks.find(task => task.id === id);

        if (!dataSearch) {
            throw new NotFoundException();
        }

        return dataSearch;;
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
