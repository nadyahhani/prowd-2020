// configurations
const url = "http://prowd.id:5000";

// custom functions
const linearLine = (begin, end, points) => {
  let temp = [];
  let tempVal = begin;
  temp.push(begin);
  const dif = (end - begin) / (points - 1);
  for (let i = 0; i < points - 1; i++) {
    tempVal += dif;
    temp.push(tempVal);
  }
  return temp;
};

// gini chart options
const giniOptions = {
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: true,
  legend: {
    display: false
  },
  tooltips: {
    titleSpacing: 6,
    xPadding: 20,
    yPadding: 20
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 1
        }
      }
    ]
  }
};

// gini data config
const giniData = data => {
  return {
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
        data: data ? linearLine(data[0], data[9], 10) : null,
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
        data: data,
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
        data: data,
        fill: false,
        backgroundColor: "#71B37C",
        borderColor: "#71B37C",
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#71B37C"
      }
    ]
  };
};

// entity sorting
const sortEntity = (order, entities) => {
  const temp = [...entities];
  switch (order) {
    case "desc":
      temp.sort(
        (a, b) =>
          parseInt(`${b.percentile.replace("%", "")}${b.propertyCount}`) -
          parseInt(`${a.percentile.replace("%", "")}${a.propertyCount}`)
      );
      return temp;
    default:
      temp.sort(
        (a, b) =>
          parseInt(`${a.percentile.replace("%", "")}${a.propertyCount}`) -
          parseInt(`${b.percentile.replace("%", "")}${b.propertyCount}`)
      );
      return temp;
  }
};

export { linearLine, url, giniOptions, giniData, sortEntity };
