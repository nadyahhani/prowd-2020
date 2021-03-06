import React from "react";
import { Bar } from "react-chartjs-2";
import { linearLine } from "../global";
import T3 from "./typography/T3";
import Status from "./dashboard/Status";
import Clue from "./dashboard/Clue";

function GiniChart(props) {
  const data = {
    type: "bar",
    labels: [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%"
    ],
    datasets: [
      {
        type: "line",
        data: props.data ? linearLine(props.data[0], props.data[9], 10) : null,
        fill: true,
        borderColor: "#EC932F",
        backgroundColor: "rgba(64, 190, 254,.2)",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        id: "1"
      },
      {
        type: "line",
        data: props.data,
        fill: true,
        borderColor: "#EC932F",
        backgroundColor: "rgba(202, 154, 0,.2)",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        id: "2"
      },
      {
        data: props.data,
        fill: false,
        backgroundColor: "#71B37C",
        borderColor: "#71B37C",
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#71B37C"
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1
          },
          scaleLabel: {
            display: true,
            labelString: "Speed in Miles per Hour",
            fontColor: "green"
          }
        }
      ]
    },
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      titleSpacing: 6,
      xPadding: 20,
      yPadding: 20
    }
    // elements: {
    //   line: {
    //     fill: false
    //   }
    // }
  };

  React.useEffect(() => {});

  return (
    <div className={props.className}>
      {props.data ? (
        <div style={{ height: "90%" }}>
          <div>
            <T3>Gini Coefficient = {props.gini}</T3>
            <Status gini={props.gini} />
            <Clue padded tooltip={props.insight} />
          </div>
          <br />
          <Bar
            data={data}
            options={options}
          />
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default GiniChart;
