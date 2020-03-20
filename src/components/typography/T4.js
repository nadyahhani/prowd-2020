import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lato",
    fontSize: ".85rem",
    fontWeight: "300",
    letterSpacing: ".03rem",
    lineHeight: "1.1"
  }
});
function T4(props) {
  const classes = useStyles();
  return (
    <span {...props} className={classes.root}>
      {props.children}
    </span>
  );
}

export default T4;
