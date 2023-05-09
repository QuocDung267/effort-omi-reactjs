/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import UserService from "../../../service/user.service";
import handleApiError from "../../../config/handleApiError";
import { showSnackBarAlert } from "../../../config/utils";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { receiveListUserAction } from "../../../redux/user/user.action";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    backgroundColor: "white",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      marginTop: 50,
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DataListForEditGroup = ({
  userList,
  handleClick,
  receiveListUserAction,
  lable,
  defaultUser,
}) => {
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);
  const [code, setCode] = useState("");
  const [user] = useState(defaultUser);

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

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <FormControl
      className={classes.formControl}
      variant="standard"
      color="primary"
    >
      <InputLabel id="demo-simple-select-outlined-label">{lable}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={code === "" ? user : code}
        onChange={handleChange}
        onClick={handleClick}
        label="Project Code"
        type="text"
        MenuProps={MenuProps}
      >
        {userList.map((item) => (
          <MenuItem key={item.email} value={item.email}>
            {item.email}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveListUserAction: (user) => dispatch(receiveListUserAction(user)),
});

const mapStateToProps = (state) => ({
  userList: state.user.userItems,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataListForEditGroup);
