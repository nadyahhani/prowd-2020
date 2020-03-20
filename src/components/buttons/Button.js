import React from "react";
import ButtonUI from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    color: "white",
    borderRadius: ".6vw",
    height: "5vh",
    minWidth: "9.06vw",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: "1.5vh",
    letterSpacing: "0.05vw",
    transition: "all 0.3s ease-in-out",
    border: "0",
    outline: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#1C0726",
      boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, .2)",
      color: "#FFFFFF"
    },
    "&:active": {
      backgroundColor: "#9B51E0",
      transition: "all 0s ease-in-out"
    }
  },
  img: {
    height: "1.8vh"
  },
  fullwidth: { minWidth: "100%" },
  grey: { backgroundColor: "#F1F1F5", color: "#696974" }
});
function Button(props) {
  const classes = useStyles();
  return (
    <ButtonUI
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={() => props.onClick()}
    >
      {props.children}
    </ButtonUI>
  );
}

export default Button;
