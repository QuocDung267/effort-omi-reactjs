import "date-fns";
import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { useHistory } from "react-router";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { validateEmail } from "../../../components/common/validate/validate";
import UserService from "../../../service/user.service";
import { showSnackBarAlert } from "../../../config/utils";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { connect } from "react-redux";
import { receiveGroupAction } from "../../../redux/common/commonAction";
import GroupService from "../../../service/group.service";
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

const DetailMember = ({ groupItem, receiveGroupAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    phone: "",
    role: "",
    groups: [],
    status: "",
  });
  const [open, setOpen] = useState({ status: false, role: false });
  const [drop, setDrop] = useState(false);

  const handleRoleOpen = () => {
    setOpen({ ...open, role: true });
  };
  const handleRoleClose = () => {
    setOpen({ ...open, role: false });
  };
  const handleStatusOpen = () => {
    setOpen({ ...open, status: true });
  };
  const handleStatusClose = () => {
    setOpen({ ...open, status: false });
  };
  const handleCheckedChange = (e) => {
    const { value, checked } = e.target;
    setFormData({ ...formData, groups: [...formData.groups, value] });
    if (checked) {
      setFormData({ ...formData, groups: [...formData.groups, value] });
    } else {
      setFormData({
        ...formData,
        groups: formData.groups.filter((item) => item !== value),
      });
    }
  };
  //const tmp = user.groups.split(",");
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    GroupService.listGroup().then((res) => {
      receiveGroupAction(res.data.data);
      console.log(res.data);
    });
    setFormData({
      email: user.email,
      userName: user.userName,
      phone: user.phone,
      role: user.idRole,
      groups: user.groups === null ? [] : user.groups.split(","),
      status: user.state,
    });
  }, [
    user.email,
    user.userName,
    user.groups,
    user.state,
    user.idRole,
    user.phone,
    receiveGroupAction,
  ]);
  const inputProps = {
    step: 300,
  };
  const handleChange = (e) => {
    // setErrorEmail("");
    // setErrorPhone("");
    const { name, value } = e.target;
    console.log(name);
    if (name === "email") {
      if (validateEmail(value) === false) {
        setErrorEmail("Email Invalid");
      } else {
        setErrorEmail("");
      }
    } else if (name === "phone") {
      if (value.length < 10 || value.length > 11) {
        setErrorPhone("Phone Number must be from 10 to 11 numbers");
      } else {
        setErrorPhone("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handSubmit = (e) => {
    setDrop(true);
    e.preventDefault();
    UserService.editInfoMember({
      email: formData.email,
      userName: formData.userName,
      phone: formData.phone,
      state: formData.status,
      idRole: formData.role,
      groups: formData.groups,
    })
      .then((res) => {
        setDrop(false);
        showSnackBarAlert(5000, "success", res.data.message);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  };
  console.log(errorPhone);
  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              EDIT INFORMATION
            </Typography>
          }
          action={
            <KeyboardBackspaceIcon
              onClick={() => {
                history.push("/dashboard/admin/employee");
                sessionStorage.clear();
              }}
              style={{
                fontSize: 40,
                backgroundColor: "#3f51b5",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
          }
          align="center"
        />
        <form onSubmit={handSubmit}>
          <DropBack open={drop} />
          <CardContent className={classes.layout}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  defaultValue={user.userName}
                  required={true}
                  name="userName"
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <AccountCircle />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  defaultValue={user.email}
                  required={true}
                  name="email"
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  error={errorEmail ? true : false}
                  helperText={errorEmail}
                  InputProps={{
                    endAdornment: <EmailIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  defaultValue={user.phone}
                  onChange={handleChange}
                  name="phone"
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <PhoneIcon />,
                  }}
                  error={errorPhone ? true : false}
                  helperText={errorPhone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Role Sytem</InputLabel>
                  <Select
                    open={open.role}
                    onClose={handleRoleClose}
                    onOpen={handleRoleOpen}
                    defaultValue={user.idRole ? user.idRole : ""}
                    onChange={handleChange}
                    name="role"
                  >
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="member">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    open={open.status}
                    onClose={handleStatusClose}
                    onOpen={handleStatusOpen}
                    defaultValue={user.state ? user.state : ""}
                    onChange={handleChange}
                    name="status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="reject">Reject</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup row>
                  {groupItem.map((item) => (
                    <FormControlLabel
                      key={item.idGroup}
                      control={
                        <Checkbox
                          value={item.idGroup}
                          onChange={handleCheckedChange}
                          name="group"
                          checked={formData.groups.some(
                            (x) => x === item.idGroup
                          )}
                        />
                      }
                      label={item.groupName}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
            <CardActions style={{ paddingLeft: "87%", marginTop: "50px" }}>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                style={{ minWidth: "150px" }}
              >
                Save
              </Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveGroupAction: (group) => dispatch(receiveGroupAction(group)),
});
const mapStateToProps = (state) => ({
  groupItem: state.common.group,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailMember);
