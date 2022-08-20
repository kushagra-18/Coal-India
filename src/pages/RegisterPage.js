import "../styles/styles.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { API_URL } from "../const";
import {Bars} from 'react-loader-spinner'
import { useState } from "react";

import swal from "sweetalert";
function RegisterPage() {
    document.title = "Coal India | Register";

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [loadingButton, setLoadingButton] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setLoadingButton(true);

        const user = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
        };

        const url = API_URL + "/users";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => {
                setLoadingButton(false);
                if (result.status === 200) {
                    swal({
                        title: "The account has been created!",
                        text: "Please verify your email address and login.",
                        icon: "success",
                        button: "Done!",
                    });
                } else if (result.status === 409) {
                    swal({
                        title: "Unable to create account",
                        text: "Email already exists",
                        icon: "error",
                        button: "Done!",
                    });
                } else {
                    swal({
                        title: "Unable to create account",
                        text: "Something went wrong",
                        icon: "error",
                        button: "Done!",
                    });
                }
            })
            .catch((error) => {
                setLoadingButton(false);
            });
    }

    function handleConfirmPassword(e) {
        if (password.current.value !== confirmPassword.current.value) {
            document.getElementById("note").innerHTML = "Passwords do not match";
            document.getElementById("submit").disabled = true;
        } else {
            document.getElementById("note").innerHTML = "";
            document.getElementById("submit").disabled = false;
        }
    }

    const handlePassword = (e) => {
        if (password.current.value.length < 6) {
            document.getElementById("note-pswrd").innerHTML =
                "Password must be at least 6 characters";
            document.getElementById("submit").disabled = true;
        } else {
            document.getElementById("note-pswrd").innerHTML = "";
            document.getElementById("submit").disabled = false;
        }
    };

    return (
        <div className="register-page">
            <title>Register</title>
            <div className="jumbotron">
                <h1 className="display-5 hello-guest">Hello, Guest!</h1>
                <h3>Sign up now!!</h3>
                <hr className="my-4 hr-jumbo" />
                <h4>It is super easy</h4>
            </div>
            <div className="container-register">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form
                                    className="form-horizontal"
                                    method="POST"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-md-4 control-label">
                                            Full Name
                                        </label>
                                        <div className="col-md-6">
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                required
                                                autoFocus
                                                ref={name}
                                            />
                                        </div>
                                    </div>

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
                                                onKeyUp={handlePassword}
                                                ref={password}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <p id="note-pswrd" className="text-danger"></p>
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="password-confirm"
                                            className="col-md-4 control-label"
                                        >
                                            Confirm Password
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="password-confirm"
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                onKeyUp={handleConfirmPassword}
                                                required
                                                ref={confirmPassword}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <p id="note" className="text-danger"></p>
                                        </div>

                                        {/* add security question with select field */}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            {!loadingButton ? (
                                                <button
                                                    type="submit"
                                                    id="submit"
                                                    className="btn btn-primary"
                                                    disabled
                                                >
                                                    Register
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
                                            <Link
                                                style={{ textDecoration: "none", color: "blue" }}
                                                to="/login"
                                            >
                                                Already have an account??
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
    );
}

export default RegisterPage;
