import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import UserService from "../../service/user.service";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { receiveUserAction } from "../../redux/user/user.action";
import handleApiError from "../../config/handleApiError";
import { validate, loginMessagesForm } from "./validate";
import { showSnackBarAlert } from "../../config/utils";
import { LinearProgress } from "@material-ui/core";
import clsx from "clsx";
//import STATUS_CODE from "http-status";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    margin: theme.spacing(0, 0, 2),
  },
  error: {
    color: "#e93c84",
    fontSize: "13px",
  },
  errorFieldHidden: {
    textAlign: "center",
  },
  errorField: {
    textAlign: "center",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9e7e7",
  },
  progress: {
    width: "100%",
    padding: 10,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SignIn = ({ receiveUserAction }) => {
  const history = useHistory();
  const classes = useStyles();
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [loginForm, setLoginForm] = useState({});
  const [flag, setFlag] = useState(false);

  //add project to form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(true);
    const users = await UserService.login(loginForm)
      .then((res) => res.data)
      .catch((err) => {
        err.response === undefined
          ? showSnackBarAlert(5000, "error", "SERVER ERROR")
          : handleApiError(err);
        setFlag(false);
      });

    if (validate(loginForm)) {
      if (users === undefined) {
        setFlag(false);
      } else {
        const token = users.data.tokens;
        if (token === undefined) {
          showSnackBarAlert(5000, "error", users.message);
          setFlag(false);
        } else {
          localStorage.setItem("token", JSON.stringify(token));
          receiveUserAction(users.data);
          history.push("/dashboard/dashboard-page");
        }
      }
    } else {
      setErrorMessageUsername(loginMessagesForm.email);
      setErrorMessagePassword(loginMessagesForm.password);
      setFlag(false);
    }
  };

  const onInputChangeHandler = (event) => {
    const name = event.target.name.toString();
    const value = event.target.value.toString();
    setLoginForm({ ...loginForm, [name]: value });
    validateEach(name);
    console.log("loginForm", loginForm);
  };

  const validateEach = (name) => {
    switch (name) {
      case "email":
        setErrorMessageUsername("");
        break;
      case "password":
        setErrorMessagePassword("");
        break;
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate={true}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            label="Email Address"
            name="email"
            autoFocus
            onChange={onInputChangeHandler}
            error={errorMessageUsername ? true : false}
            helperText={errorMessageUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            name="password"
            label="Password"
            type="password"
            onChange={onInputChangeHandler}
            error={errorMessagePassword ? true : false}
            helperText={errorMessagePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={flag}
          >
            Sign In
          </Button>
          {flag ? (
            <Box className={clsx(classes.submit && classes.progress)}>
              <LinearProgress />
            </Box>
          ) : (
            ""
          )}
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveUserAction: (user) => dispatch(receiveUserAction(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
