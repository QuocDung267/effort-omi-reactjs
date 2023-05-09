import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import DataList from "../data-list/DataList";
import { addMemberToProjectAction } from "../../../redux/project/project.action";
import { connect } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@material-ui/core";
import { showSnackBarAlert } from "../../../config/utils";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const AddMember = ({ addMemberAction, manager, member }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    BUM: false,
    subBUM: false,
    PM: false,
    subPM: false,
    BrSE: false,
    QA: false,
    JQC: false,
    TeamLead: false,
    Dev: false,
    Tester: false,
  });

  const [formAdd, setFormAdd] = useState({
    planEffort: "",
    email: "",
    roles: [],
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    addMemberAction(formAdd);
    setState({
      BUM: false,
      subBUM: false,
      PM: false,
      subPM: false,
      BrSE: false,
      QA: false,
      JQC: false,
      TeamLead: false,
      Dev: false,
      Tester: false,
    });
    if (member.find((item) => item.email === formAdd.email))
      showSnackBarAlert(1000, "warning", "Existed member");
    setFormAdd({
      planEffort: "",
      email: "",
      roles: [],
    });
  };

  const handleCheckedChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setFormAdd({ ...formAdd, roles: [...formAdd.roles, e.target.value] });
    } else {
      setFormAdd({
        ...formAdd,
        roles: formAdd.roles.filter(
          (item) => item !== e.target.value //remove roles from array
        ),
      });
    }
  };

  const handleEffortChange = (e) => {
    setFormAdd({ ...formAdd, [e.target.name]: e.target.value });
  };

  const handleListItemClick = (e, newValue) => {
    setFormAdd({ ...formAdd, email: newValue });
  };
  useEffect(() => {
    addMemberAction({
      planEffort: "",
      email: manager.email,
      roles: [],
    });
  }, [addMemberAction, manager.email]);
  return (
    <div style={{ marginTop: "10%", width: "150%" }}>
      <Button variant="contained" onClick={handleClickOpen}>
        add member
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Add member</DialogTitle>
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DataList
                  handleClick={handleListItemClick}
                  lable="Users List"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Estimated Effort"
                  fullWidth={true}
                  type="number"
                  name="planEffort"
                  onChange={handleEffortChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.BUM}
                        onChange={handleCheckedChange}
                        name="BUM"
                        value="bum"
                      />
                    }
                    label="BUM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.subBUM}
                        onChange={handleCheckedChange}
                        name="subBUM"
                        value="sbum"
                      />
                    }
                    label="subBUM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.PM}
                        onChange={handleCheckedChange}
                        name="PM"
                        value="pm"
                      />
                    }
                    label="PM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.subPM}
                        onChange={handleCheckedChange}
                        name="subPM"
                        value="spm"
                      />
                    }
                    label="subPM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.BrSE}
                        onChange={handleCheckedChange}
                        name="BrSE"
                        value="brse"
                      />
                    }
                    label="BrSE"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.QA}
                        onChange={handleCheckedChange}
                        name="QA"
                        value="qa"
                      />
                    }
                    label="QA"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.JQC}
                        onChange={handleCheckedChange}
                        name="JQC"
                        value="jqc"
                      />
                    }
                    label="JQC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.TeamLead}
                        onChange={handleCheckedChange}
                        name="TeamLead"
                        value="tl"
                      />
                    }
                    label="TeamLead"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Dev}
                        onChange={handleCheckedChange}
                        name="Dev"
                        value="dev"
                      />
                    }
                    label="Developer"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Tester}
                        onChange={handleCheckedChange}
                        name="Tester"
                        value="test"
                      />
                    }
                    label="Tester"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleClose}
            >
              Add member
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  manager: state.user.userDetail,
  member: state.project.memberInProject,
});
const mapDispatchToProps = (dispatch) => ({
  addMemberAction: (member) => dispatch(addMemberToProjectAction(member)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
