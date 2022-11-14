import { TaskModel } from '../models/task';
import { TaskRepository } from './task.repository';

describe('Given an instance of TaskApi Service', () => {
    let service: TaskRepository;
    beforeEach(() => {
        service = new TaskRepository('http://forCoverOptionLine');
        service = new TaskRepository();
    });

    // Para cada método se crea una suite con las opciones válidas y no válidas
    // describe('When we use the method...', () => {
    //     test.todo(`Then if all are OK, it should return a Promise of ...`);
    //     test.todo(`Then if there are problems, it should throw an error...`);
    // });

    describe('When we use service.getTask()', () => {
        test(`Then if all are OK, it should return a Promise of an Array of Task`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue([]),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.getAll();
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(async () => await service.getAll()).rejects.toThrow();
        });
    });

    describe('When we use service.createTask()', () => {
        const mockTask = new TaskModel('', '');
        test(`Then if all are OK,
                it should return a Promise of the crated task`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockTask),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.create(mockTask);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockTask);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.create(mockTask)
            ).rejects.toThrow();
        });
    });

    describe('When we use service.delete', () => {
        test(`Then if id are OK (1), it should return a Promise void`, async () => {
            const itemId = 1;
            const response = {
                ok: true,
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.delete(itemId);
            expect(fetch).toHaveBeenCalled();
            expect(result).toBeUndefined();
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const itemId = 0;
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.delete(itemId)
            ).rejects.toThrowError();
        });
    });

    describe('When we use service.update()', () => {
        const mockUpdateTask = { id: 1, isComplete: true };
        const mockFinalTask = {
            ...new TaskModel('', ''),
            id: 1,
            isComplete: true,
        };

        test(`Then if all are OK, it should return a Promise of ...`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockFinalTask),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.update(mockUpdateTask);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockFinalTask);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const mockUpdateTask = { id: 0 };
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.update(mockUpdateTask)
            ).rejects.toThrow();
        });
    });
});
