import React from "react";

// configurations
const url = "https://gini-python-api.herokuapp.com";

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

export { linearLine, url };
