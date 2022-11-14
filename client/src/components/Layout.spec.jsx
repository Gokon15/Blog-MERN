/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import Layout from './Layout';
import { render, screen } from '@testing-library/react';

jest.mock('./Navbar', () => 'Navbar');

describe('Layout', () => {
    const props = {
        children: 'children'
    };

    it('renders Layout', () => {
        const { container } = render(<Layout {...props}/>);

        expect(container.querySelector('navbar')).toBeInTheDocument();
        expect(screen.getByText('children')).toBeInTheDocument();
    });
    
});
