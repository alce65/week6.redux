import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Home from './about.page';
import { Provider } from 'react-redux';
import { appStore } from '../../../infrastructure/store/store';

describe('Given About component', () => {
    describe('When we render the component', () => {
        beforeEach(() => {
            render(
                <Provider store={appStore}>
                    <Router>
                        <Home />
                    </Router>
                </Provider>
            );
        });
        test('Then it should display the title', () => {
            const title = new RegExp('About', 'i');
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
