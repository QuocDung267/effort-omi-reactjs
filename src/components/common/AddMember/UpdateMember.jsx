import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import DataList from "../data-list/DataList";
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
import ProjectService from "../../../service/project.service";
import { showSnackBarAlert } from "../../../config/utils";
import { updateAddMemberInPojectAction } from "../../../redux/project/project.action";
import { connect } from "react-redux";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const UpdateMember = ({ updateAddMember }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    bum: false,
    sbum: false,
    pm: false,
    spm: false,
    brse: false,
    qa: false,
    jqc: false,
    tl: false,
    dev: false,
    test: false,
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
    const id = sessionStorage.getItem("idProject");
    console.log(id);

    ProjectService.addMemberInProject(id, formAdd)
      .then((res) => {
        showSnackBarAlert(1000, "success", res.data.message);
        updateAddMember({
          email: formAdd.email,
          planEffort: formAdd.planEffort,
          idRole: formAdd.roles,
        });
      })
      .catch((err) =>
        showSnackBarAlert(1000, "warning", err.response.data.message)
      );
    setState({
      bum: false,
      sbum: false,
      pm: false,
      spm: false,
      brse: false,
      qa: false,
      jqc: false,
      tl: false,
      dev: false,
      test: false,
    });
    setFormAdd({
      planEffort: "",
      email: "",
      roles: [],
    });
  };

  const handleCheckedChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setFormAdd({ ...formAdd, roles: [...formAdd.roles, e.target.value] }); //add roles to array
    } else {
      setFormAdd({
        ...formAdd,
        roles: formAdd.roles.filter((item) => item.roles !== e.target.value),
      });
    }
  };

  const handleEffortChange = (e) => {
    setFormAdd({ ...formAdd, [e.target.name]: e.target.value });
  };

  const handleListItemClick = (e, newValue) => {
    setFormAdd({ ...formAdd, email: newValue });
  };
  console.log("Tuan test: ", formAdd);
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.bum}
                        onChange={handleCheckedChange}
                        name="bum"
                        value="bum"
                      />
                    }
                    label="BUM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.sbum}
                        onChange={handleCheckedChange}
                        name="sbum"
                        value="sbum"
                      />
                    }
                    label="subBUM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.pm}
                        onChange={handleCheckedChange}
                        name="pm"
                        value="pm"
                      />
                    }
                    label="PM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.spm}
                        onChange={handleCheckedChange}
                        name="spm"
                        value="spm"
                      />
                    }
                    label="subPM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.brse}
                        onChange={handleCheckedChange}
                        name="brse"
                        value="brse"
                      />
                    }
                    label="BrSE"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.qa}
                        onChange={handleCheckedChange}
                        name="qa"
                        value="qa"
                      />
                    }
                    label="QA"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.jqc}
                        onChange={handleCheckedChange}
                        name="jqc"
                        value="jqc"
                      />
                    }
                    label="JQC"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.tl}
                        onChange={handleCheckedChange}
                        name="tl"
                        value="tl"
                      />
                    }
                    label="TeamLead"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.dev}
                        onChange={handleCheckedChange}
                        name="dev"
                        value="dev"
                      />
                    }
                    label="Developer"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.test}
                        onChange={handleCheckedChange}
                        name="test"
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

const mapDispatchToProps = (dispatch) => ({
  updateAddMember: (member) => dispatch(updateAddMemberInPojectAction(member)),
});

export default connect(null, mapDispatchToProps)(UpdateMember);
