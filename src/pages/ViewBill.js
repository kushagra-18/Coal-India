import { useState } from "react";
import { URL } from "../storage/const";
import "../styles/styles.css";
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
function ViewBill() {
    /**
     * fetch the bill post to edit
     */

    document.title = "Electrik Wayy | View Blog";

    // get id from url
    const { id } = useParams();

    let navigate = useNavigate();

    // fetch the bill
    const [bill, setBill] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const url = `${URL}bill/${id}`;

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((res) => {
                return res.json();
            }
            )
            .then((data) => {
                setBill(data);
                setIsLoading(false);
            }
            );
    }, [url]);


    if (isLoading) {
        return (
            <section>
                <center>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </center>
            </section>
        );
    }

    if (!bill) {

        return (
            <div className="home-main">
                <center>
                    <h1>No Bill Found</h1>
                </center>
            </div>
        );
    }

    return (

        (

            <div className="view-bill-main">
                <h2> Your bill</h2>
                <br />
                <h3>Bill Id: {bill._id}</h3>
                <h3>Name: {bill.name}</h3>
                <h3>Address: {bill.address}</h3>
                <h3>State: {bill.state}</h3>
                <h3>Unit: {bill.unit}</h3>
                <h3>Paid: {bill.paid ? (
                    <span style={{ color: "greem" }}>Paid</span>
                ) : (
                    <span style={{ color: "red" }}>Unpaid</span>
                )}
                </h3>

                <h3>Amount: {bill.amount}</h3>
                <h3>Date: {bill.created_at}</h3>

                <br></br>

                {/* show edit and delete button */}
                <div className="btn-group">
                    <button className="btn btn-primary">
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${bill._id}/edit`}>Edit</Link>
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this bill?")) {
                            fetch(`${URL}delete/${bill._id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((result) => {
                                    if (result.status === 200) {
                                        navigate("/");
                                    }
                                }
                                )
                                .catch((error) => {
                                    alert("Something went wrong");
                                }
                                );
                        }
                    }
                    }>Delete</button>

                </div>

            </div>
        )
    );

}

export default ViewBill;
