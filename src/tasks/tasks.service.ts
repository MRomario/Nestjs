import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { TaskFilterDto } from './dto/filter.task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository
    ) { }

    /**
     * Find all tasks
     * @param id 
     */
    async findAll(filterTaskDto: TaskFilterDto): Promise<Task[]> {
        return this.taskRepository.findAll(filterTaskDto);
    }

    /**
     * Find one task by id
     * 
     * @param id 
     * @returns Task
     */
    async findOne(id: number) {

        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with id : ${id} : not found `);
        }

        return found;
    }

    /**
     * Create one task
     */
    async create(createTaskDto: CreateTaskDto): Promise<Task> {

        return this.taskRepository.createTask(createTaskDto);

    }

    /**
     * Delete task
     */
    async delete(id: number): Promise<void> {

        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`task with id : ${id} : not found `);
        }

    }

    /**
     * Update task
     */
    async update(id: number, taskStatus: TaskStatus): Promise<Task> {

        const task = await this.findOne(id);
        task.status = taskStatus;
        await task.save();
        return task;

    }

    // private tasks: Task[] = [];

    // getAll(): Task[] {
    //     return this.tasks;
    // }

    // getTasksFiter(filterTaskDto: TaskFilterDto): Task[] {
    //     const { status, search } = filterTaskDto;

    //     let tasks = this.getAll();

    //     // search by status
    //     if (status) {
    //         tasks = tasks.filter(
    //             task =>
    //                 task.status === status
    //         );
    //     }

    //     // search by search string
    //     if (search) {
    //         tasks = tasks.filter(
    //             task =>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }

    // getOne(id: string): Task {

    //     const dataSearch = this.tasks.find(task => task.id === id);

    //     if (!dataSearch) {
    //         throw new NotFoundException(`Task with ID : ${id} : NOT FOUND`);
    //     }

    //     return dataSearch;;
    // }

    // create(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto
    //     const task: Task = { id: uuid(), title, description, status: TaskStatus.OPEN };
    //     this.tasks.push(task);
    //     return task;
    // }

    // delete(id: string) {

    //     const found = this.getOne(id);

    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // update(id: string, status: TaskStatus): Task {
    //     const task = this.getOne(id);
    //     task.status = status;
    //     return task;
    // }
}
