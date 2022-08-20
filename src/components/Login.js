import "../styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import AuthContext from "../storage/auth-context";
import {API_URL} from '../const';
import { Bars } from  'react-loader-spinner'

function Login() {
  document.title = "Coal India | Login";

  const email = useRef();
  const password = useRef();

  const [loadingButton, setLoadingButton] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setLoadingButton(true);

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    const url = API_URL + "/users/login";

    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (a) {
        return a.json();
      })
      .then(function (json) {
        setLoadingButton(false);
        if (json.status === 200) {
          localStorage.setItem("token", json.token);
          authCtx.loginHandler(json.token);
          setLoginStatus(true);
          navigate("/");
        }
        else
          setError(json.message);
      });
  }

  return (

   <div className="home-main"> 
    <div className="login-page">
      <div className="jumbotron">
        <h1 className="display-5 hello-guest">Hello, Guest!</h1>
        <h3> Login Now</h3>
        <hr className="my-4 hr-jumbo" />
      </div>

      <div className="container-login">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading"></div>
              <div className="panel-body">
                <form
                  className="form-horizontal"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="email" className="col-md-4 control-label">
                      E-Mail Address
                    </label>

                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        autoFocus
                        ref={email}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="col-md-4 control-label"
                    >
                      Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        ref={password}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-8 col-md-offset-4">
                      <br />
                      {!loadingButton ? (
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      ) : (
                        <Bars
                        height="60"
                        width="60"
                        color="#00BFFF"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                      )}
                      <br />
                      <br /> 
                      {error ? (
                          <div className="alert alert-danger sm" role="alert">
                            {error}
                          </div>
                        ) : null}
                      <Link
                        style={{ textDecoration: "none", color: "blue" }}
                        to="/register"
                      >
                  
                        New to Coal India?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;