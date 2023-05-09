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
import moment from "moment";
import { connect } from "react-redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import {
  projectSelectedAction,
  removeProjectSelectedAction,
} from "../../../../redux/project/project.action";
import UpdateMember from "../../../../components/common/AddMember/UpdateMember";
import { useHistory } from "react-router";
import ProjectService from "../../../../service/project.service";
import UpdateMemberInProject from "../../../../components/common/AddMember/UpdateMemberInProject";
import { showSnackBarAlert } from "../../../../config/utils";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Linkify from "react-linkify";
import DropBack from "../../../../components/common/dropback/DropBack";
import EditIcon from "@material-ui/icons/Edit";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    minHeight: 100,
  },
  avatar: {
    backgroundColor: "#e3f2fd",
  },
}));

const UpdateProject = ({
  project,
  removeProjectSelectedAction,
  projectSelectedAction,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [formProject, setFormProject] = useState({});
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [drop, setDrop] = useState(true);
  const [flag, setFlag] = useState(true);

  async function fetchData() {
    setDrop(true);
    const id = sessionStorage.getItem("idProject");
    const res = await ProjectService.projectDetail(id);
    const value = res.data.data;
    value ? setDrop(false) : setDrop(false);
    projectSelectedAction(value);
    setFormProject({
      idProject: value.idProject,
      projectName: value.projectName,
      description: value.description,
      cost: value.cost,
      start: moment(value.start).format("YYYY-MM-DD"),
      finish: moment(value.finish).format("YYYY-MM-DD"),
      type: value.type,
      status: value.status,
    });
  }
  useEffect(() => {
    if (mounted) fetchData();
    return () => setMounted(false);
  });
  console.log("project", project);
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
  const handleStatusOpen = () => {
    setStatus(true);
  };
  const handleStatusClose = () => {
    setStatus(false);
  };
  console.log(project);
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setDrop(true);
    ProjectService.editInforProject(formProject.idProject, {
      projectName: formProject.projectName,
      description: formProject.description,
      type: formProject.type,
      start: formProject.start,
      finish: formProject.finish,
      cost: formProject.cost,
      status: formProject.status,
    })
      .then((res) => {
        showSnackBarAlert(2000, "success", res.data.message);
        sessionStorage.clear();
        setDrop(false);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(2000, "error", err.response.data.message);
      });
  };
  const handleShowTextChange = () => {
    setFlag(!flag);
  };

  const handleBack = () => {
    removeProjectSelectedAction();
    sessionStorage.clear();
    history.push("/dashboard/project/list");
  };
  return (
    <Card style={{ minHeight: "89vh" }}>
      <CardHeader
        title={
          <Typography gutterBottom variant="h4" component="div">
            UPDATE PROJECT
          </Typography>
        }
        align="center"
      />
      <form onSubmit={handleUpdateSubmit}>
        <Grid
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "10px",
          }}
          container
          spacing={3}
        >
          <DropBack open={drop} />
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel>Project Code</InputLabel>
              <Input
                onChange={handleInputChange}
                name="idProject"
                value={formProject.idProject || " "}
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
                value={formProject.projectName || " "}
                onChange={handleInputChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ListAltIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={11}>
            <InputLabel>Description</InputLabel>
            {flag ? (
              <div
                style={{
                  width: "100%",
                  minHeight: "165px",
                  border: "solid 1px #999",
                  borderRadius: "5px",
                  paddingTop: "16px",
                  paddingLeft: "12px",
                }}
              >
                <Linkify>
                  <Typography variant="body1" gutterBottom>
                    {formProject.description}{" "}
                  </Typography>
                </Linkify>
              </div>
            ) : (
              <TextField
                name="description"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth={true}
                multiline
                rows={7}
                rowsMax={15}
                value={formProject.description}
              />
            )}
          </Grid>
          <Grid item xs={1}>
            {flag ? (
              <EditIcon
                style={{ marginTop: "25px" }}
                onClick={handleShowTextChange}
              />
            ) : (
              <SystemUpdateAltIcon
                style={{ marginTop: "25px" }}
                onClick={handleShowTextChange}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel>Cost</InputLabel>
              <Input
                name="cost"
                value={formProject.cost || " "}
                onChange={handleInputChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel>TypeProject</InputLabel>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={formProject.type ? formProject.type : ""}
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
              <Grid item xs={4}>
                <TextField
                  label="Start Expected Date"
                  type="date"
                  format="YYYY-MM-DD"
                  name="start"
                  onChange={handleInputChange}
                  fullWidth={true}
                  value={moment(formProject.start).format("YYYY-MM-DD")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="End Expected Date"
                  type="date"
                  format="YYYY-MM-DD"
                  name="finish"
                  fullWidth={true}
                  onChange={handleInputChange}
                  value={moment(formProject.finish).format("YYYY-MM-DD")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth={true}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    open={status}
                    onClose={handleStatusClose}
                    onOpen={handleStatusOpen}
                    value={formProject.status ? formProject.status : ""}
                    onChange={handleInputChange}
                    name="status"
                  >
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <UpdateMember />
              </Grid>
            </Grid>
          </Grid>
          {project.member !== undefined
            ? project.member.map((item, index) => (
                <Grid item md={6} sm={12} lg={4} xl={3} key={index}>
                  <Card className={classes.root}>
                    <CardHeader
                      action={<UpdateMemberInProject member={item} />}
                      avatar={
                        <Avatar className={classes.avatar}>
                          <IconButton aria-label="settings">
                            <AccountBoxIcon />
                          </IconButton>
                        </Avatar>
                      }
                      title={item.email}
                      subheader={`Actual effort: ${(
                        (item.actualTime / (8 * project.laborDay)) *
                        100
                      ).toFixed(2)}% | Cost: ${(item.actualTime / 8).toFixed(
                        2
                      )}`}
                    />
                    <CardContent style={{ marginTop: "-15px" }}>
                      <Typography variant="subtitle1" component="p">
                        Plan effort: {item.planEffort}%
                      </Typography>
                      <Typography variant="subtitle1" component="p">
                        Role:
                        {item.idRole !== null && item.idRole !== undefined
                          ? item.idRole.map((role) => {
                              return ` ${role}, `;
                            })
                          : ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : ""}
          <Grid
            spacing={3}
            container
            style={{ marginLeft: "82%", marginTop: "1%" }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: 100 }}
                type="submit"
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ minWidth: 100 }}
                variant="contained"
                color="primary"
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  project: state.project.projectSelected,
});
const mapDispatchToProps = (dispatch) => ({
  projectSelectedAction: (project) => dispatch(projectSelectedAction(project)),
  removeProjectSelectedAction: () => dispatch(removeProjectSelectedAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
