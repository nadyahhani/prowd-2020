import React from "react";
import T4 from "../typography/T4";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function Clue(props) {
  return (
    <Tooltip
      style={props.padded ? { margin: "0 .5rem" } : {}}
      title={<T4>{props.tooltip}</T4>}
    >
      <IconButton
        size="small"
        color="default"
        aria-label="Info"
        component="span"
      >
        <HelpOutlineIcon />
      </IconButton>
    </Tooltip>
  );
}
export default Clue;
