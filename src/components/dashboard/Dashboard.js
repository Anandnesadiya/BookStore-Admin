import axiosInstance from "../../config/http-common";
import React, { useEffect, useState } from 'react';
import DashboardCSS from "./dashboard.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";


function Dashboard() {

  const [orderbackendData, setorderBackendData] = useState([]);
  const [bookbackendData, setbookBackendData] = useState(0);
  const [chartbackendData, setchartBackendData] = useState([]);
  const [maxDate, setMaxDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  let totalorderprice = 0;
  let totalcountoforder = 0;

  const getorderdata = () => {
    axiosInstance.get(`http://localhost:4000/dashboard/orderprice/`)
      .then(response => {
        setorderBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  };

  const getBookData = () => {
    axiosInstance.get(`http://localhost:4000/dashboard/booksdata/`)
      .then(response => {
        const totalBooks = response.data[0].TotalBooks;
        setbookBackendData(totalBooks);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  };

  // const getchartdata = () => {
  //   axiosInstance.get(`http://localhost:4000/dashboard/chartdata/`)
  //     .then(response => {
  //       setchartBackendData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching book data:', error);
  //     });
  // };

  const onSubmit = () => {
    if (startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }
    const bookData = {
      StartDate: startDate,
      EndDate: endDate
    };
    getchartdata(bookData)
  };

  function getchartdata(bookData) {
    return new Promise((resolve, reject) => {
      axiosInstance.post("http://localhost:4000/dashboard/chartdata/", bookData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (res.status !== 200) {
            reject(new Error('Failed to add book'));
          }
          setchartBackendData(res.data);
          resolve(res.data);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }


  useEffect(() => {
    getorderdata();
    getchartdata();
    getBookData();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <>
      {orderbackendData.map((orderdata, index) => {
        totalorderprice += (orderdata.OrderPrice) * orderdata.Quantity;
        totalcountoforder = totalcountoforder + 1;
        return (
          <></>
        );
      })}

      <div className={DashboardCSS.maindiv}>
        <div className={DashboardCSS.totalorderpricediv}>
          <h5 className={DashboardCSS.totalorderpriceparagraph}>Total Number of Books : {bookbackendData}</h5>
        </div>
        <div className={DashboardCSS.totalorderpricediv}>
          <h5 className={DashboardCSS.totalorderpriceparagraph}>Total Revenue : {totalorderprice} &#8377;</h5>
        </div>
        <div className={DashboardCSS.totalorderpricediv}>
          <h5 className={DashboardCSS.totalorderpriceparagraph}>Total Orders : {totalcountoforder}</h5>
        </div>
        <div></div>
      </div>
      <div className="dataCard revenueCard" id={DashboardCSS.chartdiv}>
        <Line data={{
          labels: chartbackendData.map((data) => data.OrderDate),
          datasets: [
            {
              label: "Revenue",
              data: chartbackendData.map((data) => data.TotalOrderPrice),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0"
            }
          ]
        }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              }
            }
          }}
        >
        </Line>
        <div className={DashboardCSS.filterdiv}>
          <div className={DashboardCSS.dateInput}>
            <label htmlFor="startDateInput">Start Date : </label>
            <input
              type="date"
              id={DashboardCSS.endDateInput}
              max={maxDate}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className={DashboardCSS.dateInput}>
            <label htmlFor="endDateInput">End Date : </label>
            <input
              type="date"
              id={DashboardCSS.endDateInput}
              max={maxDate}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className={DashboardCSS.dateInput}>
            <input className={`${DashboardCSS.editbutton} ${DashboardCSS.editbutton1}`} type="submit" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
