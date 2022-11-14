import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { rootState, rootStore } from '../../../../infrastructure/store/store';
import { TaskModel } from '../../models/task';
import { taskReducer } from '../../reducer/reducer';
import { TaskList } from './task.list';

describe('Given TaskList component', () => {
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
            render(
                <Router>
                    <Provider store={mockStore}>
                        <TaskList />
                    </Provider>
                    ;
                </Router>
            );
        });
        test('Then it should display the title', () => {
            const title = new RegExp('Tareas');
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
