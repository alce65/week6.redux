import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
    describe('When we render the component And the route is home', () => {
        beforeEach(() => {
            render(
                <Router initialEntries={['/', '/todo']} initialIndex={0}>
                    <AppRoutes />
                </Router>
            );
        });
        test('Then it should display the HomePage', () => {
            const title = new RegExp('Home', 'i');
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
