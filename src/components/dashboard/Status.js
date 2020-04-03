import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import T4 from "../typography/T4";

const useStyles = makeStyles({
  root: {
    padding: ".6vh .6vw",
    borderRadius: ".6vh",
    width: "fit-content",
    color: "#fff",
    marginLeft: "1vw",
    alignItems: "center",
    justifyContent: "center"
  },
  green: { backgroundColor: "#4caf50" },
  yellow: { backgroundColor: "#ffab00" },
  red: { backgroundColor: "#bf360c" }
});
function Status(props) {
  const classes = useStyles();
  if (props.gini < 0.2) {
    return (
      <span className={`${classes.root} ${classes.green}`}>
        <T4>Balanced</T4>
      </span>
    );
  } else if (props.gini >= 0.4) {
    return (
      <span className={`${classes.root} ${classes.red}`}>
        <T4>Heavily Imbalanced</T4>
      </span>
    );
  } else {
    return (
      <span className={`${classes.root} ${classes.yellow}`}>
        <T4>Imbalanced</T4>
      </span>
    );
  }
}
export default Status;
