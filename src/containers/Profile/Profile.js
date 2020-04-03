import React from "react";
import GiniClass from "../../components/GiniClass";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/buttons/Button";
import T1 from "../../components/typography/T1";
import T2 from "../../components/typography/T2";
import T3 from "../../components/typography/T3";
import T4 from "../../components/typography/T4";
import { makeStyles } from "@material-ui/core/styles";
import { getGini, postPropGap } from "../../services/profile";
import { sortEntity } from "../../global";
import ReactVirtualizedTable from "../../components/ReactVirtualizedTable";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Clue from "../../components/dashboard/Clue";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { giniEx, propertiesCol, columns } from "./constants";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100vh",
    backgroundColor: "#edf2f7"
  },
  gini: {
    width: "28vw",
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
    border: "1px solid rgba(255,255,255,1)",
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
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "43vh",
    margin: "1vh 0",
    borderRadius: "1vh",
    backgroundColor: "#fff",
    padding: "4vh 4vw"
  },
  table: {
    height: "100%",
    width: "30%",
    "& .MuiTableCell-root": {
      fontSize: "0.75rem"
    }
  },
  tableProp: {
    height: "100%",
    width: "100%",
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
  },
  instructions: {
    zIndex: "100"
  },
  overlay: {
    display: "none",
    zIndex: "-100",
    justifyContent: "center",
    alignItems: "center",
    width: "80vw",
    height: "100vh",
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute"
  },
  chips: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  propGap: {
    width: "30%",
    paddingLeft: "5%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

function Profile(props) {
  const classes = useStyles();

  const handleClose = () => {
    setState({ ...state, notif: { open: false, message: "" } });
  };

  const fetch = () => {
    setState({
      ...state,
      data: null,
      entities: null,
      info: null
    });
    props.history.push(
      `/${state.Q}${state.P !== "" ? "/" + state.P.replace(/,/g, "-") : ""}`
    );
  };

  const getPropGap = entities => {
    setState(s => ({ ...s, properties: null }));
    postPropGap(entities, response => {
      if (response.success) {
        setState(s => ({ ...s, properties: response.propertyGap }));
      } else {
        setState(s => ({
          ...s,
          notif: {
            open: true,
            severity: "error",
            message: `An error has occured. Please try again.`
          }
        }));
      }
    });
  };

  const [state, setState] = React.useState({
    Q: "Q5",
    P: "",
    data: null,
    gini: "none",
    info: null,
    exData: 1,
    properties: null,
    notif: { open: false, message: "" }
  });

  React.useEffect(() => {
    if (Object.keys(props.match.params).length > 0) {
      const params = props.match.params;

      const Q_param = params.q;
      const P_param = params.p ? params.p.replace(/-/g, ",") : "";
      setState(s => ({
        ...s,
        Q: Q_param,
        P: P_param,
        data: null,
        gini: "none",
        info: null,
        notif: { open: false, message: "" }
      }));
      getGini(Q_param, P_param, newData => {
        if (newData.success) {
          if (newData.exceedLimit) {
            setState(state => ({
              ...state,
              Q: Q_param,
              P: P_param,
              data: newData.data,
              gini: newData.gini,
              info: {
                ...newData.instanceOf,
                insight: newData.insight,
                labels: newData.percentileData
              },
              entities: sortEntity("desc", newData.entities),
              notif: {
                open: true,
                severity: "warning",
                message: `These results are limited to ${newData.entities.length} entities`
              }
            }));
          } else {
            setState(state => ({
              ...state,
              Q: Q_param,
              P: P_param,
              data: newData.data,
              gini: newData.gini,
              info: {
                ...newData.instanceOf,
                insight: newData.insight,
                labels: newData.percentileData
              },
              entities: sortEntity("desc", newData.entities)
            }));
          }
          getPropGap(sortEntity("asc", newData.entities));
        } else {
          setState(s => ({
            ...s,
            notif: {
              open: true,
              severity: "error",
              message: `An error has occured. Please try again.`
            }
          }));
          // props.history.push("/");
        }
      });
    }
  }, [props.match.params, props.history]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={state.notif.open}
          autoHideDuration={null}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity={state.notif.severity}
          >
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
            Wikidata Knowledge Imbalance Dashboard
            <sup style={{ fontSize: "1rem" }}>Alpha</sup>
          </T1>
          <T4>
            This tool can measure knowledge imbalances on Wikidata using the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Gini_coefficient"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gini index
            </a>{" "}
            based on property existence over entities
          </T4>
        </div>
        <div className={classes.content}>
          <div style={{ display: "flex" }}>
            <div
              className={`${classes.inputs} ${
                state.data ? "" : classes.animate
              }`}
            >
              <TextField
                label="Class"
                value={state.Q}
                helperText="Input the class ID (required)"
                onChange={e =>
                  setState({ ...state, Q: e.target.value.toUpperCase() })
                }
              />

              <TextField
                label="Properties"
                value={state.P}
                onChange={e =>
                  setState({ ...state, P: e.target.value.toUpperCase() })
                }
                helperText="Leave empty, or Input multiple property IDs"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Button onClick={fetch}>Check Imbalance</Button>
                <Clue
                  padded
                  tooltip="Enter the class ID (e.g., Q5) and the property IDs of interest
                (e.g., P18,P21,P569), or leave the property IDs empty to
                consider all possible properties for the class."
                />
              </div>
            </div>
            <div className={classes.info}>
              {state.info && state.data ? (
                <React.Fragment>
                  <T2
                    href={state.info.entityLink}
                  >{`${state.info.entityLabel} - ${state.info.entityID}`}</T2>
                  <T4>{state.info.entityDescription}</T4>
                  <br />
                  <br />
                  <T3>{`Number of entities: ${state.entities.length}`}</T3>
                </React.Fragment>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start"
                  }}
                >
                  <T3>Why?</T3>
                  <T4>
                    The Gini coefficient has been used to show the imbalance of
                    certain domains of interest, such as inequality of income
                    between countries and the inequality of contributions of
                    Wikipedia users.
                  </T4>
                  <br />
                  <br />
                  <T3>How?</T3>
                  <T4>
                    The properties of each entity of the class is counted then
                    sorted in an ascending order, which then gets accumulated
                    from the smallest value to the largest. The Gini coefficient
                    is the distance between the line of equality (orange) and
                    the lorenz curve (dark green) which represents the
                    accumulated entities.
                  </T4>
                </div>
              )}
            </div>
          </div>
          <div className={classes.data}>
            {state.data && state.entities ? (
              <React.Fragment>
                <GiniClass
                  className={classes.gini}
                  data={state.data}
                  gini={state.gini}
                  insight={state.info.insight}
                  labels={state.info.labels}
                />
                <ReactVirtualizedTable
                  className={classes.table}
                  rows={state.entities}
                  columns={columns}
                />
                <div className={classes.propGap}>
                  <div>
                    <T3>Property Gap</T3>
                    <Clue
                      padded
                      tooltip="Properties of the top 20% entities which do not exist 
                  within the entities of the bottom 20%"
                    />
                  </div>
                  {state.properties ? (
                    <ReactVirtualizedTable
                      className={classes.tableProp}
                      rows={state.properties}
                      columns={propertiesCol}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <GiniClass
                  className={classes.gini}
                  data={giniEx[state.exData].data}
                  gini={giniEx[state.exData].gini}
                  insight={giniEx[state.exData].insight}
                />
                <div
                  style={{
                    width: "55%",
                    height: "100%"
                  }}
                >
                  <T2>Examples:</T2>
                  <br />
                  <br />
                  <Paper>
                    <Tabs
                      value={state.exData === 3 ? 0 : state.exData}
                      onChange={(event, newValue) => {
                        setState(s => ({ ...s, exData: 3 }));
                        setTimeout(() => {
                          setState(s => ({ ...s, exData: newValue }));
                        }, 0);
                      }}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <Tab label="Heavily Imbalanced" />
                      <Tab label="Imbalanced" />
                      <Tab label="Balanced" />
                    </Tabs>
                  </Paper>
                  <br />
                  <T3>{giniEx[state.exData].class}</T3>
                  <br />
                  <br />
                  <T4>
                    {`${giniEx[state.exData].desc}. `}
                    <a
                      href={giniEx[state.exData].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more about this example...
                    </a>
                  </T4>
                  <br />
                  <br />
                  <T4>More classes with similar Gini coefficient:</T4>
                  <div className={classes.chips}>
                    {giniEx[state.exData].more &&
                      giniEx[state.exData].more.map(item => (
                        <Chip
                          color="primary"
                          label={item.class}
                          component="a"
                          href={item.link}
                          target="_blank"
                          clickable
                        />
                      ))}
                  </div>
                </div>
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
    </React.Fragment>
  );
}

export default Profile;
