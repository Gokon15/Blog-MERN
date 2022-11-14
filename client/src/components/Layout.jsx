import React from 'react'
import Navbar from './Navbar'
import PropTypes from 'prop-types';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <div className='container mx-auto'>
                <Navbar/>
                {children}
            </div>
        </React.Fragment>
    )
}

Layout.propTypes = {
    children: PropTypes.array
};

export default Layout;
