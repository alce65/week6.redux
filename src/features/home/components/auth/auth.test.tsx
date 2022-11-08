import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Auth } from './auth';

describe('Given Auth component', () => {
    describe('When we render the component', () => {
        beforeEach(() => {
            render(
                <Router>
                    <Auth />
                </Router>
            );
        });
        test('Then it should display the title', () => {
            const title = new RegExp('Auth', 'i');
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
