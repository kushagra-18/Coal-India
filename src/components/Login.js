import "../styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
// import AuthContext from "../store.js/auth-context";
// import { URL } from "../store.js/const";

function Login() {
  document.title = "Coal India | Login";

  const email = useRef();
  const password = useRef();


//   const [loginStatus, setLoginStatus] = useState(false);

//   const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    const url = URL + "/users/login";

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
        if (json.status === 200) {
        //   authCtx.loginHandler(json.token, json.user.role);
          localStorage.setItem("token", json.token);
          localStorage.setItem("user", json.user.role);
        //   setLoginStatus(true);
          navigate("/");
        }
        else
          alert("Invalid email or password");
      });
  }

  return (

   <div className="home-main"> 
    <div className="login-page">
      <div className="jumbotron">
        <h1 className="display-5 hello-guest">Hello, Guest!</h1>
        <h3> Login Now</h3>
        <hr className="my-4" />
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
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      <br />
                      <br /> 
                      <Link
                        style={{ textDecoration: "none", color: "blue" }}
                        to="/register"
                      >
                        New to Coal India
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