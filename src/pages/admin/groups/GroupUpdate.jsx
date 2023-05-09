import React, { useEffect, useState } from "react";
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
import SelectManyMember from "../../../components/common/data-list/SelectManyMember";
import GroupService from "../../../service/group.service";
import { showSnackBarAlert } from "../../../config/utils";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import DataListForEditGroup from "../../../components/common/data-list/DataListForEditGroup";
import {
  receiveMemberInGroupAction,
  removeMemberInGroupAction,
} from "../../../redux/common/commonAction";
import { connect } from "react-redux";
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
const GroupUpdate = ({ receiveMemberAction, removeMemberAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const data = JSON.parse(sessionStorage.getItem("group"));
  const [mount, setMoute] = useState(true);
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
    receiveMemberAction(newValue);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };
  const handleLeaderClick = (e) => {
    setGroup({ ...group, groupLeader: e.target.value });
  };
  const handleUpdateGroupSubmit = (e) => {
    e.preventDefault();
    GroupService.editGroup(group)
      .then((res) => {
        showSnackBarAlert(3000, "success", res.data.message);
        removeMemberAction();
      })
      .catch((err) =>
        showSnackBarAlert(3000, "error", err.response.data.message)
      );
  };
  const handleBack = () => {
    history.push("/dashboard/admin/group");
    removeMemberAction();
  };
  useEffect(() => {
    if (mount) {
      GroupService.getMemberInGroupAdmin(data.idGroup).then((res) => {
        receiveMemberAction(res.data.data);
        console.log(res.data.data);
        let tmp = res.data.data.map((item) => item.email);
        setGroup({
          idGroup: data.idGroup,
          groupName: data.groupName,
          groupLeader: data.groupLeader,
          members: tmp,
        });
      });
    }
    return () => setMoute(false);
  }, [
    data.groupLeader,
    data.groupName,
    data.idGroup,
    mount,
    receiveMemberAction,
  ]);

  console.log("data: ", group);

  return (
    <Grid className={classes.root}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              UPDATE GROUP
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
              onClick={handleBack}
            />
          }
          align="center"
        />
        <form onSubmit={handleUpdateGroupSubmit}>
          <CardContent className={classes.layout}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID Group"
                  name="idGroup"
                  defaultValue={data.idGroup}
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
                  defaultValue={data.groupName}
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
                {data.groupLeader === "NotAssigned" ? (
                  <DataList
                    lable="Group Leader"
                    handleClick={handleLeaderClick}
                  />
                ) : (
                  <DataListForEditGroup
                    lable="Group Leader"
                    handleClick={handleLeaderClick}
                    defaultUser={data.groupLeader}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectManyMember handleChange={handleSelectMemberChange} />
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
                UPDATE
              </Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};
const mapDispatchToProps = (dispatch) => ({
  receiveMemberAction: (member) => dispatch(receiveMemberInGroupAction(member)),
  removeMemberAction: () => dispatch(removeMemberInGroupAction()),
});

export default connect(null, mapDispatchToProps)(GroupUpdate);
