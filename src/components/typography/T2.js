import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lato",
    fontSize: "1.5rem",
    fontWeight: "700",
    textDecoration: "none"
  }
});
function T2(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.href ? (
        <a href={props.href} className={classes.root}>
          {props.children}
        </a>
      ) : (
        <span className={classes.root}>{props.children}</span>
      )}
    </React.Fragment>
  );
}

export default T2;
