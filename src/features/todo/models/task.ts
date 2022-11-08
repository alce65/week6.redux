export type ProtoTask = {
    title: string;
    responsible: string;
    isComplete: boolean;
};

export type Task = {
    id: string;
    title: string;
    responsible: string;
    isComplete: boolean;
};

export class TaskModel {
    isComplete: boolean;
    constructor(public title: string, public responsible: string) {
        this.isComplete = false;
    }
}
