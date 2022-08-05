import { Link, NavLink } from "react-router-dom";

function HeaderNavbar() {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                Coal India
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

                    <li className="nav-item">
                        <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white' }} to='/register'>Register</Link></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link"><Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login</Link></div>
                    </li>
                </ul>
            </div>
            </div>

        </nav>
    );
}

export default HeaderNavbar;
