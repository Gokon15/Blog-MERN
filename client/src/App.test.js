/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

jest.mock('axios', () => {
  return {
    create: () => {
      return {
        interceptors: {
          request: {
            use: jest.fn()
          }
        }
      }
    }
  }
});

jest.mock('./components/Navbar', () => 'Navbar');
jest.mock('./pages/MainPage',  () => 'MainPage');
jest.mock('./pages/PostPage', () => 'PostPage');
jest.mock('./pages/PostsPage', () => 'PostsPage');
jest.mock('./pages/EditPostPage', () => 'EditPostPage');
jest.mock('./pages/AddPostPage', () => 'AddPostPage');
jest.mock('./pages/RegisterPage', () => 'RegisterPage');
jest.mock('./pages/LoginPage', () => 'LoginPage');
jest.mock('react-toastify', () => {
  return {
    ToastContainer: () => 'ToastContainer'
  }
});

describe('App', () => {
  it('renders MainPage, Navbar, ToastContainer', () => {
    const { container } = render(<MemoryRouter initialEntries={['/']}>
      <App/>
    </MemoryRouter>);
    const toastContainerEl = screen.getByText(/toastcontainer/i);
    const navbarEl = container.querySelector('navbar');
    const mainPageEl = container.querySelector('mainpage');

    expect(toastContainerEl).toBeInTheDocument();
    expect(mainPageEl).toBeInTheDocument();
    expect(navbarEl).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('renders PostsPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/posts']}>
      <App/>
    </MemoryRouter>);
    const postsPageEl = container.querySelector('postspage');

    expect(postsPageEl).toBeInTheDocument();
  });

  it('renders PostPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/:id']}>
      <App/>
    </MemoryRouter>);
    const postPageEl = container.querySelector('postpage');

    expect(postPageEl).toBeInTheDocument();
  });

  it('renders EditPostPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/:id/edit']}>
      <App/>
    </MemoryRouter>);
    const editPostPageEl = container.querySelector('editpostpage');

    expect(editPostPageEl).toBeInTheDocument();
  });

  it('renders AddPostPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/new']}>
      <App/>
    </MemoryRouter>);
    const addPostPageEl = container.querySelector('addpostpage');

    expect(addPostPageEl).toBeInTheDocument();
  });

  it('renders RegisterPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/register']}>
      <App/>
    </MemoryRouter>);
    const registerPageEl = container.querySelector('registerpage');

    expect(registerPageEl).toBeInTheDocument();
  });

  it('renders LoginPage', () => {
    const { container } = render(<MemoryRouter initialEntries={['/login']}>
      <App/>
    </MemoryRouter>);
    const loginPageEl = container.querySelector('loginpage');

    expect(loginPageEl).toBeInTheDocument();
  });
});
