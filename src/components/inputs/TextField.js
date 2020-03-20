import React from "react";
import TextFieldUI from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormHelperText-root": {
      fontSize: "1.4vh"
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.5vh",
      "&.Mui-focused": {
        color: "#50B5FF"
      }
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 1.3vh) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(1.5vw, -6px) scale(0.9)"
      }
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        height: "4.5vh",
        borderRadius: ".8vh"
      },
      "&.Mui-focused": {
        "& fieldset": {
          border: "1px solid #50B5FF"
        }
      }
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "1.5vh",
      padding: "1.1vh 1.5vw",
      fontFamily: "Lato"
    },
    "& .MuiFormControl-marginNormal": {
      margin: "0"
    }
  },

  padded: {
    padding: "1vh 0"
  },
  inputTitle: {
    fontFamily: "Lato",
    fontWeight: "300",
    fontSize: "2vh",
    letterSpacing: "0.05vw"
  },
  input: {
    fontFamily: "Lato",
    fontSize: "1.5vh"
  },
  disabled: {
    backgroundColor: "transparent",
    color: "#000"
  }
}));
function TextField(props) {
  const classes = useStyles();
  return (
    <TextFieldUI
      className={classes.root}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}

export default TextField;
