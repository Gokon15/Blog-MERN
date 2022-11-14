import Navbar from './Navbar';
import { useSelector } from 'react-redux'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useNavigate: jest.fn(),
    useDispatch: () => mockDispatch
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: txt => txt,
            i18n: {
                changeLanguage: jest.fn()
            }
        };
    }
}))

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

describe('Navbar', () => {
    it('renders Navbar if logout', () => {
        useSelector.mockImplementation(() => {
            return false;
        });
        render(<MemoryRouter initialEntries={['/']}>
                <Navbar/>
            </MemoryRouter>);

        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('UA')).toBeInTheDocument();
        expect(screen.getByText('navBar.main')).toBeInTheDocument();
        expect(screen.getByText('navBar.login')).toBeInTheDocument();
    });

    it('renders Navbar if login', () => {
        useSelector.mockImplementation(() => {
            return true;
        });

        render(<MemoryRouter initialEntries={['/']}>
                <Navbar/>
            </MemoryRouter>);

        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('UA')).toBeInTheDocument();
        expect(screen.getByText('navBar.main')).toBeInTheDocument();
        expect(screen.getByText('navBar.posts')).toBeInTheDocument();
        expect(screen.getByText('navBar.add')).toBeInTheDocument();
        expect(screen.getByText('navBar.logout')).toBeInTheDocument();
    });
    
});
