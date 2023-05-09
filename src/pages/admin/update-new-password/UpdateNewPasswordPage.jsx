import "date-fns";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  CardHeader,
  Button,
  InputAdornment,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import UserService from "../../../service/user.service";
import { showSnackBarAlert } from "../../../config/utils";
import { validatePassword } from "../../../components/common/validate/validate";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  layout: {
    width: "100%",
    paddingLeft: "20%",
    paddingRight: "20%",
    marginTop: "20px",
  },
});
const UpdateNewPassword = () => {
  const classes = useStyles();

  const [formUpdate, setFormUpdate] = useState({
    email: "",
    newPassword: "",
    retype: " ",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showRetype, setShowRetype] = useState(true);
  const [errorAlert, setErrorAlert] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
    setError(false);
    setErrorAlert("");
  };
  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRytpe = (e) => {
    setShowRetype(!showRetype);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formUpdate.newPassword)) {
      setError(true);
      setErrorAlert(
        "Password minimum 8 characters, at least one letter and one number"
      );
    } else {
      if (formUpdate.newPassword !== formUpdate.retype) {
        setError(true);
        setErrorAlert("Password don't match");
      } else {
        UserService.updatePasswordMember({
          email: formUpdate.email,
          newPassword: formUpdate.newPassword,
        })
          .then((res) => showSnackBarAlert(10000, "success", res.data.message))
          .catch((err) =>
            showSnackBarAlert(3000, "error", err.response.data.message)
          );
      }
    }
  };

  console.log(formUpdate);
  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              UPDATE PASSWORD
            </Typography>
          }
          align="center"
        />

        <CardContent className={classes.layout}>
          <form onSubmit={handleUpdateSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Email"
                  name="email"
                  style={{ width: "100%", marginBottom: "20px" }}
                  InputProps={{
                    endAdornment: <EmailIcon />,
                  }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  required={true}
                  name="newPassword"
                  type={showPassword ? "password" : "text"}
                  style={{ width: "100%", marginBottom: "20px" }}
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
                  error={error}
                  onChange={handleInputChange}
                  helperText={errorAlert}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Re-type New"
                  name="retype"
                  required={true}
                  type={showRetype ? "password" : "text"}
                  style={{ width: "100%", marginBottom: "20px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showRetype ? (
                          <VisibilityOff
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowRytpe}
                          />
                        ) : (
                          <Visibility
                            style={{ cursor: "pointer" }}
                            onClick={handleClickShowRytpe}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
                  error={error}
                  helperText={errorAlert}
                />
              </Grid>
              <Grid item xs={4} style={{ paddingLeft: "85%" }}>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  style={{ width: "150px" }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UpdateNewPassword;
