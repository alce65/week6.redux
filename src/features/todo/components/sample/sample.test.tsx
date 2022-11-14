import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { rootState, rootStore } from '../../../../infrastructure/store/store';
import { TaskModel } from '../../models/task';
import { taskReducer } from '../../reducer/reducer';
import { Sample } from './sample';

describe('Given Sample component', () => {
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
                <Provider store={mockStore}>
                    <Router>
                        <Sample />
                    </Router>
                </Provider>
            );
        });
        test('Then it should display the title', () => {
            const title = /Sample/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should display thetask from the redux store', async () => {
            const title = /Testing/i;
            const element = await screen.findByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
