import { Link, NavLink } from "react-router-dom";
import AuthContext from '../storage/auth-context';

import { useContext } from 'react';

function HeaderNavbar() {

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.authenticated;

    const logout = () => {
        authCtx.logoutHandler();
    };

    return (

        // if props = home then show home navbar else show rest navbar
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark navbar-bg-color">
            <a href = "#" className="navbar-brand">

                <img src="https://www.coalindia.in/static/images/logo.png" alt="logo" style={{ width: "140px" }} />
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto"></ul>

                <div className='ml-5'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mr-2">
                    {isLoggedIn && (
                            <li className="nav-item">
                                <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }} to='/vehicle-data'>Vehicle Data</Link></div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item">
                                <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }} to='/data-all'>Entry-Exit Data</Link></div>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }} to='/register'>Register</Link></div>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }} to='/login'>Login</Link></div>
                            </li>
                        )}


                        {/* if login show logout */}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <div className="nav-link" style={{ color: 'white', fontWeight: 'bold', fontSize: '20px',cursor:'pointer' }} onClick={logout}>Logout</div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        </nav>
    );
}

export default HeaderNavbar;
