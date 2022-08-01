import { useState, useEffect } from "react";
import { URL } from "../storage/const";
import { Link } from "react-router-dom";

function AllBills() {
  document.title = "Electrik Wayy";

  /**
   * @description - This function is used to get the blogs from the API.
   */

  const [isLoading, setIsLoading] = useState(true);

  const [loadedBills, setLoadedBills] = useState([]);

  const [isSorted,setIsSorted] = useState(true);

  const [changed, setChanged] = useState(false);


  const sortAmountHandler = () => {

    setIsSorted(!isSorted);
    setIsLoading(true);

    var sortedBills = "";
    if(isSorted){
        sortedBills = loadedBills.sort((a,b) => {
            return a.amount - b.amount;
        }
        );
    }else{
        sortedBills = loadedBills.sort((a,b) => {
            return b.amount - a.amount;
        }
        );
    }

    
      setIsLoading(false);
      setLoadedBills(sortedBills);
      setChanged(true);     

  }

  if(changed){
    setChanged(false);
    // return (
        
    // );

  }


  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const bills = [];

        for (const key in data) {
          const bill = {
            id: key,
            ...data[key],
          };

          bills.push(bill);
        }

        setIsLoading(false);
        setLoadedBills(bills);
      });
  }, []);

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

  return (
    <div className="home-main">
      <div className="sort-article">
        <div className="sort-article-options">
          <i className="fa fa-sort">
            <button className="sort-article-button" onClick={sortAmountHandler}>
              Sort by Bill Amount
            </button>
          </i>
        </div>
      </div>
      <br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>State</th>
            <th>Bill Amount</th>
            <th>Bill Date</th>
            <th>Bill Status</th>
            <th>Units Consumed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loadedBills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill._id}</td>
              <td>{bill.name}</td>
              <td>{bill.address}</td>
              <td>{bill.state}</td>
              <td>{bill.amount}</td>
              <td>{bill.created_at}</td>
              {/* if paid is false show red color else paid*/}
              {bill.paid ? (
                <td style={{ color: "greem" }}>Paid</td>
              ) : (
                <td style={{ color: "red" }}>Unpaid</td>
              )}

              <td>{bill.unit}</td>
            
              <td>
                <Link to={`/bill/${bill._id}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllBills;
