export class Task {
    id: string;
    taskName: string;
    taskPriority: string;
    taskDescription: string;
    taskDate: string;
    taskStatus: string;

    constructor(id, object) {

            this.id = id;
            this.taskName= object.taskName;
            this.taskPriority= object.taskPriority;
            this.taskDescription= object.taskDescription;
            this.taskDate= object.taskDate;
            this.taskStatus = object.taskStatus;

    }
}