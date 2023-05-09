/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";
import UserService from "../../../service/user.service";
import { showSnackBarAlert } from "../../../config/utils";
import handleApiError from "../../../config/handleApiError";
import { receiveListUserAction } from "../../../redux/user/user.action";
import { connect } from "react-redux";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

function SelectManyMemberAddGroup({
  handleChange,
  members,
  receiveListUserAction,
  memberDefault,
}) {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const processDataToTable = useCallback(
    (data) => {
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
    },
    [receiveListUserAction]
  );
  // const tmp = Object.keys(defaultMember).map((i) => defaultMember[i]);
  useEffect(() => {
    setData(memberDefault);
    UserService.listMember()
      .then((res) => {
        processDataToTable(res.data);
      })
      .catch((err) => {
        err.response === undefined
          ? showSnackBarAlert(10000, "error", "SERVER ERROR")
          : handleApiError(err);
      });
  }, [memberDefault, processDataToTable]);
  console.log(data);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={members}
        fullWidth={true}
        value={data}
        getOptionSelected={(option, value) => option.email === value.email}
        getOptionLabel={(option) => option.email}
        onChange={handleChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            fullWidth={true}
            {...params}
            variant="outlined"
            label="Select Member"
            placeholder="Member"
          />
        )}
      />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  receiveListUserAction: (user) => dispatch(receiveListUserAction(user)),
});

const mapStateToProps = (state) => ({
  members: state.user.userItems,
  memberDefault: state.common.memberInGroup,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectManyMemberAddGroup);
