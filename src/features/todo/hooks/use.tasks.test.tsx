import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { rootState, rootStore } from '../../../infrastructure/store/store';
import { ProtoTask, Task } from '../models/task';
import { useTasks } from './use.tasks';
import { TaskRepository } from '../services/task.repository';
import { taskReducer } from '../reducer/reducer';
import { act } from 'react-dom/test-utils';

jest.mock('../services/task.repository');

describe('Given the custom hook useTasks', () => {
    let mockProtoTask: ProtoTask;
    let mockTask: Task;
    let mockAddedTask: Task;
    let mockUpdatedTask: Task;

    beforeEach(() => {
        mockProtoTask = {
            title: 'Initial task',
            responsible: 'Test user',
            isComplete: false,
        };
        mockTask = {
            ...mockProtoTask,
            id: 1,
        };
        mockAddedTask = {
            id: 2,
            title: 'Added task',
            responsible: 'Test user',
            isComplete: false,
        };
        mockUpdatedTask = {
            id: 1,
            title: 'Updated task',
            responsible: 'Test user',
            isComplete: false,
        };
    });
    describe('When we simulate its use in a component', () => {
        interface Current {
            tasks: Array<Task>;
            handleLoad: () => void;
            handleAdd: (newTask: ProtoTask) => void;
            handleDelete: (id: Task['id']) => void;
            handleUpdate: (updateTask: Partial<Task>) => void;
        }

        let current: Current;
        let mockStore: rootStore;

        // renderHook simula un componente
        // envuelto en un provider de react-redux que accede al store
        // el useTask accede al store y selecciona el state que  necesita
        // el useEffect llama al mock del servicio repository
        // que retorna un mock de datos []
        // con los cuales se actualiza el state en el store
        // Y esto último se comprueba en el expect
        beforeEach(async () => {
            TaskRepository.prototype.getAll = jest
                .fn()
                .mockResolvedValue([mockTask]);
            TaskRepository.prototype.create = jest
                .fn()
                .mockResolvedValue(mockAddedTask);
            TaskRepository.prototype.update = jest
                .fn()
                .mockResolvedValue(mockUpdatedTask);
            TaskRepository.prototype.delete = jest
                .fn()
                .mockResolvedValue(undefined);

            const preloadedState: rootState = { tasks: [] };
            mockStore = configureStore({
                reducer: {
                    tasks: taskReducer,
                },
                preloadedState,
            });

            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useTasks(), { wrapper }));
        });

        // test('Then the state is accesible by the hook', async () => {
        test(`Then hook call to the repository for the initial data
                and dispatch an action for load the data in the state`, async () => {
            current.handleLoad();
            expect(TaskRepository.prototype.getAll).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to add a new task 
            and dispatch an action for add the task to the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.tasks).toEqual([]);
            current.handleAdd(mockProtoTask);
            expect(TaskRepository.prototype.create).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to update a task
            and dispatch an action for update the task in the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.tasks).toEqual([]);
            current.handleUpdate(mockUpdatedTask);
            await waitFor(() => {
                expect(TaskRepository.prototype.update).toHaveBeenCalled();
            });
        });

        test(`Then the hock call to the repository to delete a task
            and dispatch an action for delete the task from the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.tasks).toEqual([]);
            current.handleDelete(1);
            await waitFor(() => {
                expect(TaskRepository.prototype.delete).toHaveBeenCalled();
            });
        });
    });
});
