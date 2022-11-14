import { CommentItem } from './CommentItem';
import { render, screen } from '@testing-library/react';

describe('CommentItem', () => {
    const props = {
        cmt: {
            comment: 'comment'
        }
    };

    it('renders CommentItem', () => {
        render(<CommentItem {...props}/>);

        expect(screen.getByText(/comment/i)).toBeInTheDocument();
        expect(screen.getByText('CO')).toBeInTheDocument();
    });
    
});
