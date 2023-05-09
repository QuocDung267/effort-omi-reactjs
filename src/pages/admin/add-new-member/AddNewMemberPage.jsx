import "date-fns";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CardHeader,
  CardActions,
  InputAdornment,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import GroupSelect from "../../../components/common/group/GroupSelect";
import RoleSystem from "../../../components/common/drop-down-button/RoleSystem";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  validatePassword,
  validateEmail,
} from "../../../components/common/validate/validate";
import UserService from "../../../service/user.service";
import { showSnackBarAlert } from "../../../config/utils";
import DropBack from "../../../components/common/dropback/DropBack";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  layout: {
    width: "100%",
    marginTop: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
});

const AddNewMember = () => {
  const classes = useStyles();
  const inputProps = {
    step: 300,
  };
  const [addForm, setAddForm] = useState({
    userName: "",
    email: "",
    password: "",
    Phone: "",
    role: "",
    group: [],
  });
  const [showPassword, setShowPassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [drop, setDrop] = useState(false);
  const handleCheckedChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAddForm({ ...addForm, group: [...addForm.group, value] });
    } else {
      let tmp = addForm.group;
      tmp = tmp.filter((item) => item !== value);
      setAddForm({ ...addForm, group: tmp });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "email") {
      if (validateEmail(value) === false) {
        setErrorEmail("Email Invalid");
      } else {
        setErrorEmail("");
      }
    } else if (name === "Phone") {
      if (value.length < 10 || value.length > 11) {
        setErrorPhone("Phone Number must be from 10 to 11 numbers");
      } else {
        setErrorPhone("");
      }
    } else if (name === "password") {
      if (validatePassword(value) === false) {
        setErrorPassword(
          "Password must be at least 8 characters and must contain 1 letter or number "
        );
      } else {
        setErrorPassword("");
      }
    }
    setAddForm({ ...addForm, [name]: value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleAddMemberSubmit = (e) => {
    setDrop(true);
    e.preventDefault();
    UserService.addMember(addForm)
      .then((res) => {
        setDrop(false);
        showSnackBarAlert(5000, "success", res.data.message);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  };
  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              ADD NEW MEMBER
            </Typography>
          }
          align="center"
        />
        <form onSubmit={handleAddMemberSubmit}>
          <DropBack open={drop} />
          <CardContent className={classes.layout}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  defaultValue={addForm.userName}
                  name="userName"
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <AccountCircle />,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  defaultValue={addForm.email}
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <EmailIcon />,
                  }}
                  onChange={handleChange}
                  error={errorEmail ? true : false}
                  helperText={errorEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="Phone"
                  defaultValue={addForm.Phone}
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <PhoneIcon />,
                  }}
                  onChange={handleChange}
                  error={errorPhone ? true : false}
                  helperText={errorPhone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  defaultValue={addForm.password}
                  type={showPassword ? "password" : "text"}
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  error={errorPassword ? true : false}
                  helperText={errorPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VisibilityOff
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowPassword}
                          />
                        ) : (
                          <Visibility
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowPassword}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RoleSystem handleClick={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Group"
                  InputProps={{
                    startAdornment: (
                      <GroupSelect handleCheckedChange={handleCheckedChange} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <CardActions style={{ paddingLeft: "85%", marginTop: "50px" }}>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                style={{ width: "200px" }}
              >
                ADD
              </Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};

export default AddNewMember;
