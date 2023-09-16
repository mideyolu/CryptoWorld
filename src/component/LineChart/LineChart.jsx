import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";
import moment from "moment";
import "chartjs-adapter-moment"; // Import the moment adapter

// Register necessary Chart.js components
ChartJS.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Initialize arrays to store coin price and timestamps
  const coinPrice = [];
  const coinTimestamp = [];

  // Extract coin price and parse timestamps using moment
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      moment(coinHistory?.data?.history[i].timestamp).toDate()
    );
  }

  // Define chart data and options
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      {/* Chart header */}
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>

      {/* Render the Line chart */}
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
