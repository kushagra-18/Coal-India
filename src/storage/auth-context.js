import React, {useState} from 'react';
import LogoutUser from "../components/Logout";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({
    authenticated: false,
    token: null,
    loginHandler: (token) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {

    const navigate = useNavigate();

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const authenticated = !!token;

    const loginHandler = (token) => { 

        setToken(token);
    };

    const logoutHandler = () => {
        setToken(null);
        LogoutUser();
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ authenticated, token, loginHandler, logoutHandler }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;