import axiosInstance from "../../config/http-common";
import React, { useEffect, useState } from 'react';
import DashboardCSS from "./dashboard.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Dashboard() {

  const [orderbackendData, setorderBackendData] = useState([]);
  const [bookbackendData, setbookBackendData] = useState(0);
  const [chartbackendData, setchartBackendData] = useState([]);


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

  const getchartdata = () => {
    axiosInstance.get(`http://localhost:4000/dashboard/chartdata/`)
      .then(response => {
        setchartBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  };

  useEffect(() => {
    getorderdata();
    getchartdata();
    getBookData();
  }, []);




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
                beginAtZero: true ,
              }
            }
          }}
        >

        </Line>
      </div>
    </>
  );
}

export default Dashboard;
