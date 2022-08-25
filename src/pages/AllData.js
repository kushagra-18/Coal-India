import { useState, useEffect, useContext, useRef } from "react";
import { API_URL } from "../const";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../storage/auth-context";
import { Bars } from "react-loader-spinner";
import moment from "moment";

document.title = "Coal India | Entry-Exit Data";

function AllData() {
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
  ];

  const onRowClicked = (row) => {
    navigate(`/vehicle-data?number=${row.number}`);
  };

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(moment().toDate());

  const [searchData, setSearchData] = useState([]);

  const dataDate = useRef(moment().format("DD-MM-YYYY"));

  function handleDateChange(date) {
    const dateString = moment(date).format("DD-MM-YYYY");

    setStartDate(date);

    dataDate.current = dateString;

    const getData = async () => {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/recognition/archieved?date=${dateString}`
      );
      const data = await response.json();
      setData(data);
      setSearchData(data);
      setLoading(false);
    };
    getData();
  }

  // get data from api
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${API_URL}/recognition/today`);
      const data = await response.json();
      setData(data);
      setSearchData(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="all-data-main">
      {/* add a date picker */}

      <div className="all-data-options">
        <div className="date-picker">
          <b>Select Date</b>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />
        </div>

        {/* add search bar */}

        <div className="search-bar">
          <b> Select Vehicle Number</b>
          <br />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              const search = e.target.value.toUpperCase();
              const filteredData = searchData.filter((item) => {
                return item.number.includes(search);
              });
              setData(filteredData);
            }}
          />
        </div>
      </div>

      <div className="today-data-main">Showing data for {dataDate.current}</div>

      {!loading ? (
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          pagination
          theme="solarized"
          highlightOnHover
          pointerOnHover
          selectableRowsHighlight
          progressPending={loading}
          onRowClicked={onRowClicked}
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

export default AllData;
