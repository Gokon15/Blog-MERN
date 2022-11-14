import PostItem from './PostItem';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('PostItem', () => {
    const props = {};

    it('renders empty PostItem', () => {
        render(<MemoryRouter initialEntries={['/']}>
                <PostItem {...props}/>
            </MemoryRouter>);

        expect(screen.getByTestId('emptyP')).toBeInTheDocument();
    });

    it('renders PostItem with props without comments and invalid date', () => {
        props.post = {
            _id: 'postId',
            imgUrl: '',
            username: 'username',
            createdAt: 'createdAt',
            title: 'postTitle',
            text: 'postText',
            comments: []
        }
        render(<MemoryRouter initialEntries={['/']}>
                <PostItem {...props}/>
            </MemoryRouter>);

        expect(screen.getByText('username')).toBeInTheDocument();
        expect(screen.getByText('Invalid date')).toBeInTheDocument();
        expect(screen.getByText('postTitle')).toBeInTheDocument();
        expect(screen.getByText('postText')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders PostItem with props with comments and valid date', () => {
        props.post = {
            _id: 'postId',
            imgUrl: 'imgUrl',
            username: 'newUsername',
            createdAt: '11',
            title: 'newPostTitle',
            text: 'newPostText',
            comments: ['firstComment', 'secondComment']
        }
        render(<MemoryRouter initialEntries={['/']}>
                <PostItem {...props}/>
            </MemoryRouter>);

        expect(screen.getByText('newUsername')).toBeInTheDocument();
        expect(screen.getByText('1 Nov 2001')).toBeInTheDocument();
        expect(screen.getByText('newPostTitle')).toBeInTheDocument();
        expect(screen.getByText('newPostText')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
