import { Task } from '../models/task';
import { Repository } from './repository';

export class TaskRepository implements Repository<Task> {
    url: string;
    constructor(url = '') {
        this.url = url ? url : (process.env.REACT_APP_URL_TASKS as string);
    }

    // read / get
    getAll(): Promise<Array<Task>> {
        return fetch(this.url).then((response) => {
            if (response.ok) return response.json();
            const message = `Error ${response.status}: ${response.statusText}`;
            const error = new Error(message);
            error.name = 'HTTPError';
            throw error;
        });
    }

    // create / post
    create(task: Partial<Task>): Promise<Task> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => response.json());
    }

    // delete
    delete(id: number): Promise<boolean> {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        }).then((response) => response.ok);
    }

    // uptate / patch
    update(partialTask: Partial<Task>): Promise<Task> {
        return fetch(`${this.url}/${partialTask.id}`, {
            method: 'PATCH',
            body: JSON.stringify(partialTask),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => response.json());
    }
}
