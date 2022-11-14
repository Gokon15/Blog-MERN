import { PopularPosts } from './PopularPosts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('PopularPosts', () => {
    const props = {
        post: {
            _id: 'postId',
            title: 'postTitle'
        }
    };

    it('renders PopularPosts', () => {
        render(<MemoryRouter initialEntries={['/']}>
                <PopularPosts {...props}/>
            </MemoryRouter>);

        expect(screen.getByRole('link')).toHaveAttribute('href', '/postId');
        expect(screen.getByText('postTitle')).toBeInTheDocument();
    });
    
});
