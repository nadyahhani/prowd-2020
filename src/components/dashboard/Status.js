import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import T4 from "../typography/T4";

const useStyles = makeStyles({
  root: {
    padding: ".6vh .6vw",
    borderRadius: ".6vh",
    width: "fit-content",
    color: "#fff",
    marginLeft: "1vw"
  },
  green: { backgroundColor: "#4caf50" },
  yellow: { backgroundColor: "#ffab00" },
  red: { backgroundColor: "#bf360c" }
});
function Status(props) {
  const classes = useStyles();
  if (props.gini <= 0.25) {
    return (
      <a className={`${classes.root} ${classes.green}`}>
        <T4>Balanced</T4>
      </a>
    );
  } else if (props.gini >= 0.6) {
    return (
      <a className={`${classes.root} ${classes.red}`}>
        <T4>Very Imbalanced</T4>
      </a>
    );
  } else {
    return (
      <a className={`${classes.root} ${classes.yellow}`}>
        <T4>Imbalanced</T4>
      </a>
    );
  }
}
export default Status;
