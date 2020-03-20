import React from "react";
import GiniChart from "../components/GiniChart";
import TextField from "../components/inputs/TextField";
import Button from "../components/buttons/Button";
import T1 from "../components/typography/T1";
import T2 from "../components/typography/T2";
import T3 from "../components/typography/T3";
import T4 from "../components/typography/T4";
import { makeStyles } from "@material-ui/core/styles";
import { usePromiseTracker } from "react-promise-tracker";
import { getGini } from "../services/profile";
import ReactVirtualizedTable from "../components/ReactVirtualizedTable";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100vh",
    backgroundColor: "#edf2f7"
  },
  gini: {
    width: "34vw",
    height: "100%"
    // "& canvas": {
    //   height: "35vh !important"
    // }
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    height: "90vh",
    width: "85vw"
  },
  "@keyframes blink": {
    "0%": { borderColor: "rgba(80,181,255,0)" },
    "50%": { borderColor: "rgba(80,181,255,1)" },
    "100%": { borderColor: "rgba(80,181,255,0)" }
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: "1px solid rgba(80,181,255,0)",
    backgroundColor: "#fff",
    borderRadius: "1vh",
    padding: "5vh 3vw",
    width: "50vw",
    height: "25vh"
  },
  animate: {
    animationName: "$blink",
    animationDuration: "2s",
    animationIterationCount: "infinite"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: "1vh",
    padding: "5vh 3vw",
    marginLeft: "1vh",
    width: "100%",
    height: "25vh"
  },
  data: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "43vh",
    margin: "1vh 0",
    borderRadius: "1vh",
    backgroundColor: "#fff",
    padding: "4vh 4vw"
  },
  table: {
    height: "100%",
    width: "50%",
    "& .MuiTableCell-root": {
      fontSize: "0.75rem"
    }
  },
  howto: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "scroll",
    width: "45%",
    height: "45%",
    padding: "1vh 1vw"
  }
});

function Profile() {
  const classes = useStyles();

  const notify = msg => {
    setState({ ...state, notif: { open: true, message: msg } });
  };

  const handleClose = () => {
    setState({ ...state, notif: { open: false, message: "" } });
  };

  const [state, setState] = React.useState({
    Q: "Q5",
    P: "",
    data: null,
    gini: "none",
    info: null,
    notif: { open: false, message: "" }
  });

  const { isLoading } = usePromiseTracker();
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.notif.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={state.notif.severity}>
          {state.notif.message}
        </Alert>
      </Snackbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "fit-content"
        }}
      >
        <T1>
          Wikidata Knowledge Imbalance Dashboard <sup>Alpha</sup>
        </T1>
        <T4>
          This tool can measure knowledge imbalances on Wikidata using Gini
          index based on property existence over entities
        </T4>
      </div>
      <div className={classes.content}>
        <div style={{ display: "flex" }}>
          <Tooltip
            className={classes.instructions}
            title={
              <T4>
                To use the tool, enter the class ID (e.g., Q5) and the property
                IDs of interest (e.g., P18,P21,P569), or leave the property IDs
                empty to consider all possible properties for the class.
              </T4>
            }
          >
            <div
              className={`${classes.inputs} ${
                state.data ? "" : classes.animate
              }`}
            >
              <TextField
                label="Class"
                value={state.Q}
                helperText="Input the class ID (required)"
                onChange={e => setState({ ...state, Q: e.target.value })}
              />

              <TextField
                label="Properties"
                value={state.P}
                onChange={e => setState({ ...state, P: e.target.value })}
                helperText="Leave empty, or Input multiple property IDs"
              />
              <Button
                onClick={() => {
                  setState({
                    ...state,
                    data: null,
                    entities: null,
                    info: null
                  });
                  getGini(state.Q, state.P, newData => {
                    if (newData.success) {
                      const limitTemp =
                        state.P === ""
                          ? newData.limit.unbounded
                          : newData.limit.bounded;
                      if (newData.entities.length >= limitTemp) {
                        setState({
                          ...state,
                          data: newData.data,
                          gini: newData.gini,
                          info: {
                            ...newData.instanceOf,
                            insight: newData.insight
                          },
                          entities: newData.entities.reverse(),
                          notif: {
                            open: true,
                            severity: "warning",
                            message: `These results are limited to ${limitTemp} entities`
                          }
                        });
                      } else {
                        setState({
                          ...state,
                          data: newData.data,
                          gini: newData.gini,
                          info: {
                            ...newData.instanceOf,
                            insight: newData.insight
                          },
                          entities: newData.entities.reverse()
                        });
                      }
                    } else {
                      setState({
                        ...state,
                        notif: {
                          open: true,
                          severity: "error",
                          message: `An error has occured. Please try again.`
                        }
                      });
                    }
                  });
                }}
              >
                Check Imbalance
              </Button>
            </div>
          </Tooltip>
          <div className={classes.info}>
            {state.info && state.data ? (
              <React.Fragment>
                <T2
                  href={state.info.entityLink}
                >{`${state.info.entityLabel} - ${state.info.entityID}`}</T2>
                <T4>{state.info.entityDescription}</T4>
                <br />
                <br />
                <T3>{`Number of instances: ${state.entities.length} entities`}</T3>
              </React.Fragment>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <T3>Class description will be shown here</T3>
              </div>
            )}
          </div>
        </div>
        <div className={classes.data}>
          {state.data && state.entities ? (
            <React.Fragment>
              <GiniChart
                className={classes.gini}
                data={state.data}
                gini={state.gini}
              />
              <ReactVirtualizedTable
                className={classes.table}
                rows={state.entities}
              />
            </React.Fragment>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <T3>Visualizations will be shown here</T3>
            </div>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <T4>
            2020 - Free University of Bozen-Bolzano, Universitas Indonesia and
            Max-Planck Institute for Informatics
          </T4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
