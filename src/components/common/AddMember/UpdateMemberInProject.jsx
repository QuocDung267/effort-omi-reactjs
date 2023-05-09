import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
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
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from "react";
import ProjectService from "../../../service/project.service";
import { showSnackBarAlert } from "../../../config/utils";
import { updateMemberInPojectAction } from "../../../redux/project/project.action";
import { connect } from "react-redux";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const UpdateMemberInProject = ({ member, updateInMember }) => {
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
  const [mounted, setMounted] = useState(true);
  const [formAdd, setFormAdd] = useState({
    planEffort: "",
    email: "",
    roles: [],
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (mounted) {
      console.log("member: ", member);
      if (member.idRole !== null && member.idRole !== undefined) {
        const tmp = member.idRole;
        tmp.map((item) => setState((state) => ({ ...state, [item]: true })));
        setFormAdd({
          planEffort: member.planEffort,
          email: member.email,
          roles: member.idRole,
          laborDay: member.laborDay,
        });
      } else {
        setFormAdd({
          planEffort: member.planEffort,
          email: member.email,
          roles: [],
          laborDay: member.laborDay,
        });
      }
    }
    return () => setMounted(false);
  }, [mounted, state, member.idRole, member]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    updateInMember({
      email: formAdd.email,
      planEffort: formAdd.planEffort,
      idRole: formAdd.roles,
      laborDay: member.laborDay,
    });
    const id = sessionStorage.getItem("idProject");
    ProjectService.updateMemberInProject(id, formAdd).then((res) =>
      showSnackBarAlert(10000, "success", res.data.message)
    );
  };

  const handleCheckedChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setFormAdd({ ...formAdd, roles: [...formAdd.roles, e.target.value] }); //add roles to array
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
  console.log(formAdd);
  return (
    <div style={{ marginTop: "10%", width: "150%" }}>
      <EditIcon
        style={{ cursor: "pointer" }}
        variant="contained"
        onClick={handleClickOpen}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle>Add member</DialogTitle>
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  defaultValue={member.email}
                  variant="standard"
                  label="Email"
                  fullWidth={true}
                  type="text"
                  name="email"
                  onChange={handleEffortChange}
                  disabled
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
                  defaultValue={member.planEffort}
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
              Update member
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
  updateInMember: (member) => dispatch(updateMemberInPojectAction(member)),
});

export default connect(null, mapDispatchToProps)(UpdateMemberInProject);
