import "date-fns";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Grid,
  CardHeader,
  InputAdornment,
} from "@material-ui/core";
import UserService from "../../../../service/user.service";
import { showSnackBarAlert } from "../../../../config/utils";
import { validatePassword } from "../../../../components/common/validate/validate";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles({
  layout: {
    width: "100%",
    paddingLeft: "20%",
    paddingRight: "20%",
    marginTop: "20px",
  },
  error: {
    color: "#e93c84",
    fontSize: "13px",
  },
  btn: {
    width: "20%",
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
});
const ChangePasswordPage = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: true,
    newPassword: true,
    confirmPassword: true,
  });
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
    setErrorPassword("");
  };
  const handleClickShowPassword = (e) => {
    setShowPassword({ ...showPassword, password: !showPassword.password });
  };
  const handleClickShowNewPassword = (e) => {
    setShowPassword({
      ...showPassword,
      newPassword: !showPassword.newPassword,
    });
  };
  const handleClickShowComfirmPassword = (e) => {
    setShowPassword({
      ...showPassword,
      confirmPassword: !showPassword.confirmPassword,
    });
  };
  const handSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const { password, newPassword, confirmPassword } = formData;

    if (validatePassword(newPassword) === false) {
      setErrorPassword("Password invalid");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("Password do not match");
      //setErrorPassword("");
    } else {
      UserService.changePassword({
        password: password,
        newPassword: newPassword,
      })
        .then((res) => {
          showSnackBarAlert(3000, "success", res.data.message);
        })
        .catch((err) =>
          showSnackBarAlert(3000, "error", err.response.data.message)
        );
    }
  };
  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              CHANGE PASSWORD
            </Typography>
          }
          align="center"
        />
        <CardContent className={classes.layout}>
          <form onSubmit={handSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  onChange={handleInputChange}
                  label="Current Password"
                  type={showPassword.password ? "password" : "text"}
                  InputProps={{
                    name: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword.password ? (
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  onChange={handleInputChange}
                  label="New Password"
                  type={showPassword.newPassword ? "password" : "text"}
                  error={errorPassword ? true : false}
                  helperText={errorPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword.newPassword ? (
                          <VisibilityOff
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowNewPassword}
                          />
                        ) : (
                          <Visibility
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowNewPassword}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  onChange={handleInputChange}
                  label="Comfirm Password"
                  type={showPassword.confirmPassword ? "password" : "text"}
                  error={errorMessage ? true : false}
                  helperText={errorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword.confirmPassword ? (
                          <VisibilityOff
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowComfirmPassword}
                          />
                        ) : (
                          <Visibility
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowComfirmPassword}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ paddingLeft: "78%" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ width: "200px" }}
                  color="primary"
                  className={classes.submit}
                >
                  Save Change
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChangePasswordPage;
