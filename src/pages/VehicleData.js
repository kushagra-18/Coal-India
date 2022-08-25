import { useState, useEffect ,useContext,useRef} from "react";
import { API_URL } from "../const";
import DataTable from "react-data-table-component";
import { Bars } from  'react-loader-spinner'
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../storage/auth-context";


function VehicleData() {

  document.title = "Coal India | Vehicle Data";

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const isLoggedIn = authCtx.authenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);


  const columns = [
    {
      name: "Vehicle Number",
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: "In Time",
      selector: (row) => row.in_time,
      sortable: true,
    },
    {
      name: "Out Time",
      selector: (row) => row.out_time,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];


  // get number from url
  const url = window.location.href;
  const number = url.split("=")[1];
  
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState([]);

  const search = useRef('Please enter the vehicle number');


  useEffect(() => {
    if(number){
      pageHandler(number);
    }
  } ,[number]);


  function pageHandler(text)
  {

    if(text.length > 0)
    {
      search.current = 'Showing results for vehicle number: ' + text;
    }else{
      search.current = 'Please enter the vehicle number';
    }
    

    setSearchData(text);
    const getData = async () => {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/recognition/vehicle?number=${text}`
      );
      const data = await response.json();
      setData(data);
      setSearchData(data);
      setLoading(false);
    }
    getData();
  }


  function searchHandler(e)
  {
   
    const text = e.target.value;

    if(text.length > 0)
    {
      search.current = 'Showing results for vehicle number: ' + text;
    }else{
      search.current = 'Please enter the vehicle number';
    }
    

    setSearchData(text);
    const getData = async () => {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/recognition/vehicle?number=${text}`
      );
      const data = await response.json();
      setData(data);
      setSearchData(data);
      setLoading(false);
    }
    getData();
  }


  return (
    <div className="all-data-main">
      {/* add a date picker */}
      <div className="all-data-options">
        {/* add search bar */}
        <div className="search-bar">
          <b> Select Vehicle Number</b>
          <br />
          <input
            type="text"
            placeholder="Search..."
            onChange={searchHandler}
          />
        </div>
      </div>

      <div className="today-data-main">{search.current}</div>

      {!loading ? (
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          pagination
          theme="solarized"
          highlightOnHover
          selectableRowsHighlight
          progressPending={loading}
        />
      ) : (
        <div className="spinner-loading">
          {/* add loading spiner */}
          <Bars
            height="80"
            width="80"
            color="#00BFFF"
            ariaLabel="bars-loading"
            wrapperClass="wrapper-class"
            wrapperStyle={{
              position: "fixed",
              top: "50%",
              left: "50%",
              // transform: "translate(-50%, -50%)",
            }}
            visible={true}
          />
        </div>
      )}
    </div>
  );
}

export default VehicleData;
