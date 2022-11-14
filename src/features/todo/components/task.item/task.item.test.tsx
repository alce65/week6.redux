import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { rootState, rootStore } from '../../../../infrastructure/store/store';
import { TaskModel } from '../../models/task';
import { taskReducer } from '../../reducer/reducer';
import { TaskItem } from './task.item';

describe('Given TaskItem component', () => {
    const preloadedState: rootState = {
        tasks: [
            {
                ...new TaskModel('Testing', ''),
                id: 1,
            },
        ],
    };
    const mockStore: rootStore = configureStore({
        reducer: {
            tasks: taskReducer,
        },
        preloadedState,
    });

    describe('When we render the component', () => {
        beforeEach(() => {
            const mockTask = { ...new TaskModel('Test task', ''), id: 1 };
            // Otra alternativa gracias al duck typing sería:
            // const mockTask: Task = {id: 0, title: '', responsible: '', isComplete: false}
            render(
                <Provider store={mockStore}>
                    <Router>
                        <TaskItem item={mockTask} />
                    </Router>
                </Provider>
            );
        });
        test('Then it should display the title', () => {
            const title = /Test task/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
