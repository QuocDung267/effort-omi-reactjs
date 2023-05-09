/* eslint-disable no-use-before-define */
import React from "react";
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

function SelectManyMember({ handleChange, members, receiveListUserAction }) {
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
    UserService.listMember()
      .then((res) => {
        processDataToTable(res.data);
      })
      .catch((err) => {
        err.response === undefined
          ? showSnackBarAlert(10000, "error", "SERVER ERROR")
          : handleApiError(err);
      });
  }, [processDataToTable]);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={members}
        getOptionLabel={(option) => option.email}
        getOptionSelected={(option, value) => option.email === value.email}
        fullWidth={true}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectManyMember);
