import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import moment from "moment";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
}));

export default function DatePickers({ content, date, handleChange, name }) {
  const classes = useStyles();
  return (
    <TextField
      id="date"
      label={content}
      type="date"
      name={name}
      onChange={handleChange}
      defaultValue={date}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
