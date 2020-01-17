import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedValues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {

        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`is invalid status: ${value}`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedValues.indexOf(status);
        return index !== -1;
    }
}