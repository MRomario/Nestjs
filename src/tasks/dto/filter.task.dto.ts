import { TaskStatus } from "../task.model";

export class TaskFilterDto {
    title: string;
    description: string;
    status: TaskStatus;
}