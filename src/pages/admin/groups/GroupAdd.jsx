import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import GroupIcon from "@material-ui/icons/Group";
import DataList from "../../../components/common/data-list/DataList";
import SelectManyMemberAddGroup from "../../../components/common/data-list/SelectMemberAddGroup";
import GroupService from "../../../service/group.service";
import { showSnackBarAlert } from "../../../config/utils";
import handleApiError from "../../../config/handleApiError";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";

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
const GroupAdd = () => {
  const classes = useStyles();
  const history = useHistory();
  const [group, setGroup] = useState({
    idGroup: "",
    groupName: "",
    groupLeader: "",
    members: [],
  });
  const inputProps = {
    step: 300,
  };
  const handleSelectMemberChange = (e, newValue) => {
    const email = newValue.map((item) => item.email);
    setGroup({ ...group, members: email });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };
  const handleLeaderClick = (e, newValue) => {
    setGroup({ ...group, groupLeader: newValue });
  };
  const handleAddGroupSubmit = (e) => {
    e.preventDefault();
    GroupService.addNewGroup(group)
      .then((res) => showSnackBarAlert(3000, "success", res.data.message))
      .catch((err) => handleApiError(3000, "error", err.response.data.message));
  };
  console.log(group);
  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              ADD NEW GROUP
            </Typography>
          }
          action={
            <KeyboardBackspaceIcon
              style={{
                fontSize: 40,
                backgroundColor: "#3f51b5",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => history.push("/dashboard/admin/group")}
            />
          }
          align="center"
        />
        <form onSubmit={handleAddGroupSubmit}>
          <CardContent className={classes.layout}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID Group"
                  name="idGroup"
                  onChange={handleChange}
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <CodeIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Group Name"
                  onChange={handleChange}
                  name="groupName"
                  required={true}
                  style={{ width: "100%", marginBottom: "20px" }}
                  inputProps={inputProps}
                  InputProps={{
                    endAdornment: <GroupIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DataList
                  lable="Group Leader"
                  handleClick={handleLeaderClick}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectManyMemberAddGroup
                  handleChange={handleSelectMemberChange}
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

export default GroupAdd;
