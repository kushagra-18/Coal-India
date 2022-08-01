import { Link, NavLink } from 'react-router-dom';

function HeaderNavbar() {


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Coal India</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
           
                </ul>
            </div>
            <Link to='/register'style={{ textDecoration: 'none', color: 'white' }} > <button className="btn btn-outline-primary ml-2">
                Add Bill</button></Link>
        </nav>
    );
}

export default HeaderNavbar;