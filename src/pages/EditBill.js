import { useRef } from "react";
import { useState } from "react";
import { URL } from "../storage/const";
import "../styles/styles.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
function EditBill() {
    /**
     * fetch the bill post to edit
     */

    document.title = "Electrik Wayy | Edit Blog";

    // get id from url
    const { id } = useParams();

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
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const name = useRef();
    const address = useRef();
    const state = useRef();
    const paid = useRef();
    const units = useRef();
    const amount = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: name.current.value,
            address: address.current.value,
            state: state.current.value,
            unit: units.current.value,
            paid: paid.current.checked,
            amount: amount.current.value,
        };

        console.log(data);

        const url = `${URL}bill/${id}`;

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => {
                if (result.status === 200) {
        
                    handleShow();
                }

                if (result.status === 500) {
                    alert("Something went wrong");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
      
        (

            <div className="add-bill-main">

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bill has been edited, succesfully</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* <HeaderTitle
                    icon="fa fa-pencil"
                    title="Start writing your story"
                ></HeaderTitle> */}

                <h3>Edit Bill - {bill._id}</h3>

                <form
                    id="checkout-form"
                    method="post"
                    encType="multipart/form-data"
                    className="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-row">

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" ref={name} defaultValue = {bill.name} required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" ref={address} defaultValue = {bill.address} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="bill">Bill</label>
                            <input type="text" className="form-control" id="bill" ref={units} defaultValue = {bill.unit} required />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" className="form-control" id="amount" ref={amount} defaultValue = {bill.amount} required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputState">State</label>
                            <select id="inputState" className="form-control" ref={state} defaultValue = {bill.state} required>
                              {/* option for Indian states */}
                                <option selected disabled>Choose...</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </div>

                    </div>
                    <div className="form-group">
                    <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitch1"
                                    name="ispaid"
                                    ref={paid}
                                    defaultValue = {bill.paid}
                                />
                                <label className="custom-control-label" htmlFor="customSwitch1">
                                    <b>Paid</b>
                                </label>
                            </div>
                    </div>

                    <hr className="mb-4" />
                    <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                    >Edit Bill</button>
                </form>
                <br></br>
            </div>
        )
    );

}

export default EditBill;
