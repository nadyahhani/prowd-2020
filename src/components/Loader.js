import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(256,256,256,.6)",
    zIndex: "100",
    position: "absolute"
  }
});
const Loader = props => {
  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  );
};

export default Loader;
