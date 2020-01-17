import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create.task.dto";
import { TaskStatus } from "./task.status.enum";
import { TaskFilterDto } from "./dto/filter.task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async findAll(filterDto: TaskFilterDto): Promise<Task[]> {

        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    }

    /**
     * Create one task
     */
    async createTask(creatTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = creatTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
}