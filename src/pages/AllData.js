import { useState, useEffect } from "react";
import { API_URL } from "../const";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

document.title = "Coal India | All Data";

function AllData() {
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

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(moment().toDate());

  const [searchData, setSearchData] = useState([]);

  const [dataDate, setDataDate] = useState(moment().format("DD-MM-YYYY"));

  function handleDateChange(date) {
    const dateString = moment(date).format("DD-MM-YYYY");

    setStartDate(date);

    setDataDate(dateString);

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

      <div className="today-data-main">Showing data for {dataDate}</div>

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
          <center>
            {/* add loading spiner */}
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>

            <h2>Loading...</h2>
          </center>
        </div>
      )}
    </div>
  );
}

export default AllData;
