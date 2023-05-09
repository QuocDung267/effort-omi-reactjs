import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CodeIcon from "@material-ui/icons/Code";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DatePickers from "../../../../components/common/date-picker/DatePicker";
import moment from "moment";
import AddMember from "../../../../components/common/AddMember/AddMember";
import { connect } from "react-redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  removeAllMemberFromProjectAction,
  removeMemberFromProjectAction,
} from "../../../../redux/project/project.action";
import ProjectService from "../../../../service/project.service";
import { showSnackBarAlert } from "../../../../config/utils";
import UpdateMemberInAddproject from "../../../../components/common/AddMember/UpdateMemberInAddproject";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    minHeight: 100,
  },
  avatar: {
    backgroundColor: "#e3f2fd",
  },
}));

const AddProject = ({ member, removeMemberAction, removeAllMemberAction }) => {
  const classes = useStyles();
  const [formProject, setFormProject] = useState({
    idProject: "",
    projectName: "",
    description: "",
    cost: 0,
    start: moment().format("YYYY-MM-DD"),
    finish: "",
    type: "",
    members: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFormProject((formProject) => ({ ...formProject, members: member })); //fix missing dependence
  }, [member]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    console.log(name, " ", value);
    setFormProject({ ...formProject, [name]: value });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveMember = (item) => {
    removeMemberAction(item);
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log(formProject);
    ProjectService.addProject(formProject)
      .then((res) => {
        showSnackBarAlert(3000, "success", res.data.message);
        removeAllMemberAction();
        setFormProject({
          idProject: "",
          projectName: "",
          description: "",
          cost: 0,
          start: moment().format("YYYY-MM-DD"),
          finish: "",
          type: "",
          members: [],
        });
      })
      .catch((err) => {
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  };

  return (
    <form onSubmit={handleAddSubmit}>
      <Card style={{ height: "89vh" }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              NEW PROJECT
            </Typography>
          }
          align="center"
        />
        <Grid
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "10px",
          }}
          container
          spacing={3}
        >
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel>Project Code</InputLabel>
              <Input
                onChange={handleInputChange}
                name="idProject"
                value={formProject.idProject}
                startAdornment={
                  <InputAdornment position="start">
                    <CodeIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel>Project Name</InputLabel>
              <Input
                name="projectName"
                value={formProject.projectName}
                onChange={handleInputChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ListAltIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              value={formProject.description}
              onChange={handleInputChange}
              variant="outlined"
              label="Description"
              fullWidth={true}
              multiline
              rows={7}
              rowsMax={15}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="cost"
              onChange={handleInputChange}
              variant="standard"
              label="Estimated Cost"
              type="number"
              value={formProject.cost}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel id="demo-controlled-open-select-label">
                TypeProject
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={formProject.type}
                onChange={handleInputChange}
                name="type"
              >
                <MenuItem value="Labor">Labor</MenuItem>
                <MenuItem value="Project Base">Project Base</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <DatePickers
                  content="Start Expected Date"
                  date={moment().format("YYYY-MM-DD")}
                  name="start"
                  handleChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={5}>
                <DatePickers
                  content="End Expected Date"
                  name="finish"
                  date={moment().format("YYYY-MM-DD")}
                  handleChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={1}>
                <AddMember />
              </Grid>
            </Grid>
          </Grid>
          {member.map((item, index) => (
            <Grid item md={6} sm={12} lg={4} xl={3} key={index}>
              <Card className={classes.root}>
                <CardHeader
                  action={
                    <div>
                      <HighlightOffIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveMember(item)}
                      />
                      <UpdateMemberInAddproject member={item} />
                    </div>
                  }
                  avatar={
                    <Avatar className={classes.avatar}>
                      <IconButton aria-label="settings">
                        <AccountBoxIcon />
                      </IconButton>
                    </Avatar>
                  }
                  title={item.email}
                />
                <CardContent style={{ marginTop: "-15px" }}>
                  <Typography variant="subtitle1" component="p">
                    Plan effort: {item.planEffort}%
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    Role:
                    {item.roles.map((role) => {
                      return ` ${role}, `;
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item style={{ marginLeft: "92%", marginTop: "2%" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

const mapStateToProps = (state) => ({
  member: state.project.memberInProject,
});
const mapDispatchToProps = (dispatch) => ({
  removeMemberAction: (member) =>
    dispatch(removeMemberFromProjectAction(member)),
  removeAllMemberAction: () => dispatch(removeAllMemberFromProjectAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
