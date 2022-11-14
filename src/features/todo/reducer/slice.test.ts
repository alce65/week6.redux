import { Task } from '../models/task';
import { taskReducer, actionTypes } from './slice';

describe('Given a reducer from one slice', () => {
    const taskMock: Task = {
        id: 1,
        title: '',
        responsible: '',
        isComplete: false,
    };

    let action: { type: string; payload: unknown };
    let state: Array<Task>;

    describe('When the action is load', () => {
        beforeEach(() => {
            // Forma literal de crear actions
            // action = {
            //     type: actionTypes.load.type,
            //     payload: [taskMock],
            // };
            action = actionTypes.load([taskMock]);
            state = [];
        });
        test('Then the returned state should be the action payload', () => {
            const result = taskReducer(state, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is add', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.add.type,
                payload: taskMock,
            };
            state = [];
        });
        test('Then the returned state should include the action payload', () => {
            const result = taskReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update.type,
                payload: { ...taskMock, title: 'Update task' },
            };
            state = [taskMock];
        });
        test('Then the returned state should include the action payload', () => {
            const result = taskReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update.type,
                payload: { ...taskMock, id: '2', title: 'Update task' },
            };
            state = [taskMock];
        });
        test('Then the returned state should be the original state', () => {
            const result = taskReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is delete', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete.type,
                payload: taskMock.id,
            };
            state = [taskMock];
        });
        test('Then the returned state should not include the action payload', () => {
            const result = taskReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action is delete and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete.type,
                payload: { ...taskMock, id: '2' },
            };
            state = [taskMock];
        });
        test('Then the returned state should should be the original state', () => {
            const result = taskReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is any other', () => {
        beforeEach(() => {
            action = {
                type: '',
                payload: null,
            };
            state = [taskMock];
        });
        test('Then the returned state should be ...', () => {
            const result = taskReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
