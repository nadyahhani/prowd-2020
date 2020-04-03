import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import T4 from "./typography/T4";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(256,256,256,.9)",
    zIndex: "100",
    position: "absolute"
  }
});
const Loader = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({ show: false });
  const { promiseInProgress } = usePromiseTracker();

  React.useEffect(() => {
    setTimeout(() => {
      setState(s => ({ ...s, show: true }));
    }, 3000);
  }, []);
  return (
    promiseInProgress && (
      <div className={classes.root}>
        <CircularProgress />
        <br />
        {state.show ? <T4>This may take a while...</T4> : <React.Fragment />}
      </div>
    )
  );
};

export default Loader;
