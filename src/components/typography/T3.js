import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lato",
    fontSize: "1.15rem",
    fontWeight: "700"
  }
});
function T3(props) {
  const classes = useStyles();
  return <span className={classes.root}>{props.children}</span>;
}

export default T3;
