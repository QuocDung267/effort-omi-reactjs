/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import UserService from "../../../service/user.service";
import handleApiError from "../../../config/handleApiError";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { showSnackBarAlert } from "../../../config/utils";
import { makeStyles } from "@material-ui/core";
import { receiveListUserAction } from "../../../redux/user/user.action";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: "white",
    margin: theme.spacing(1),
    width: "100%",
    marginTop: "-16px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DataList = ({ userList, handleClick, receiveListUserAction, lable }) => {
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);

  const processDataToTable = (data) => {
    const usersList = [];
    const serverUsersList = data.data;
    serverUsersList.forEach((item) => {
      const user = {
        email: item.email,
        username: item.userName,
        phone: item.phone,
        namerole: item.namerole,
      };
      usersList.push(user);
    });
    receiveListUserAction(usersList);
    return usersList;
  };

  useEffect(() => {
    if (mounted)
      UserService.listMember()
        .then((res) => {
          processDataToTable(res.data);
        })
        .catch((err) => {
          err.response === undefined
            ? showSnackBarAlert(10000, "error", "SERVER ERROR")
            : handleApiError(err);
        });

    return () => setMounted(false);
  });

  return (
    // <FormControl
    //   className={classes.formControl}
    //   variant="standard"
    //   color="primary"
    // >
    //   <InputLabel id="demo-simple-select-outlined-label">{lable}</InputLabel>
    //   <Select
    //     labelId="demo-simple-select-outlined-label"
    //     id="demo-simple-select-outlined"
    //     value={code}
    //     onChange={handleChange}
    //     onClick={handleClick}
    //     label="Project Code"
    //     type="text"
    //     MenuProps={MenuProps}
    //     style={{ height: "30px" }}
    //   >
    //     {userList.map((item) => (
    //       <MenuItem key={item.email} value={item.email}>
    //         {item.email}
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>

    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      className={classes.formControl}
      disableClearable
      onChange={handleClick}
      getOptionSelected={(option, value) => option.email === value.email}
      options={userList.map((option) => option.email)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={lable}
          margin="normal"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveListUserAction: (user) => dispatch(receiveListUserAction(user)),
});

const mapStateToProps = (state) => ({
  userList: state.user.userItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
