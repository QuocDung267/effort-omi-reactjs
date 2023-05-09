import "date-fns";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import DropdownButton from "../../../../components/common/drop-down-button/DropdownButton";
import moment from "moment";
import { connect } from "react-redux";
import ActualTimeService from "../../../../service/actual.service";
import { showSnackBarAlert } from "../../../../config/utils";
import handleApiError from "../../../../config/handleApiError";
import DropBack from "../../../../components/common/dropback/DropBack";
import { useEffect } from "react";
import ProjectService from "../../../../service/project.service";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    height: "100%",
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  area: {
    width: "70%",
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
  },
  layout: {
    width: "80%",
    paddingLeft: "150px",
    paddingRight: "50px",
    paddingTop: "80px",
    border: "solid 2px black",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "5px",
    height: "70vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const ProjectRegistionPage = ({ projectID }) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [defaultdata, setData] = useState({});
  const [form, setForm] = useState({ idProject: " ", createDate: " " });
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [drop, setDrop] = useState(false);
  const [status, setStatus] = useState("");
  const [formUpdate, setFormUpdate] = useState({
    idProject: "",
    time: 0,
    task: "",
    note: "",
    createDate: "",
  });

  const handleIdPojectClick = (e) => {
    setDrop(true);
    let tmp = "";
    if (e.target.value === 0) {
      tmp = projectID;
      setFormUpdate({ ...formUpdate, idProject: projectID, createDate: date });
    } else {
      tmp = e.target.value;
      setFormUpdate({
        ...formUpdate,
        idProject: e.target.value,
        createDate: date,
      });
    }
    callApiGetEffort({ idProject: tmp, createDate: date }, tmp);
    ProjectService.projectDetail(tmp).then((res) => {
      setStatus(res.data.data.status);
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate(value);
    setForm({ ...form, [name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formUpdate.time, 10) > 8) {
      setOpen(true);
    } else {
      setDrop(true);
      ActualTimeService.updateActualTime(formUpdate)
        .then((res) => {
          setDrop(false);
          showSnackBarAlert(3000, "success", res.data.message);
          setFormUpdate({
            idProject: "",
            time: 0,
            task: "",
            createDate: "",
            note: "",
          });
        })
        .catch((err) => {
          setDrop(false);
          showSnackBarAlert(3000, "error", err.response.data.title);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUpdate({ ...formUpdate, [name]: value });
  };
  const callApiGetEffort = (form, id) => {
    ActualTimeService.getActualTime(form)
      .then((res) => {
        setData(res.data);
        setDrop(false);
        const value = res.data.data;
        console.log("value:", value);
        if (res.data.message !== "Not Found Data")
          setFormUpdate({
            idProject: value.projectuser_idProject,
            createDate: date,
            time: value.time,
            note: value.note,
            task: value.task,
          });
        else
          setFormUpdate({
            idProject: id,
            createDate: date,
            task: "",
            time: 0,
            note: "",
          });
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(5000, "error", err.response.data.title);
      });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formUpdate.time, 10) > 8) {
      setOpen(true);
    } else {
      setDrop(true);
      ActualTimeService.addActualTime(formUpdate)
        .then((res) => {
          setDrop(false);
          showSnackBarAlert(3000, "success", res.data.message);
          setFormUpdate({
            idProject: "",
            time: 0,
            task: "",
            createDate: "",
            note: "",
          });
        })
        .catch((err) => {
          setDrop(false);
          showSnackBarAlert(3000, "error", err.response.data.title);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  //if submit time > 10
  const handleAgreeSubmit = () => {
    setDrop(true);
    ActualTimeService.addActualTime(formUpdate)
      .then((res) => {
        setDrop(false);
        showSnackBarAlert(3000, "success", res.data.message);
        setFormUpdate({
          idProject: "",
          time: 0,
          task: "",
          note: "",
          createDate: "",
        });
      })
      .catch((err) => {
        setDrop(false);
        handleApiError(err);
      });
    setOpen(false);
  };
  //if update time > 10
  const handleAgreeUpdate = () => {
    setDrop(true);
    ActualTimeService.updateActualTime(formUpdate)
      .then((res) => {
        setDrop(false);
        showSnackBarAlert(3000, "success", res.data.message);
        setFormUpdate({
          idProject: "",
          time: 0,
          task: "",
          note: "",
          createDate: "",
        });
      })
      .catch((err) => {
        setDrop(false);
        handleApiError(err);
      });
    setOpen(false);
  };
  useEffect(() => {
    moment(date).format("M-YYYY") === moment().format("M-YYYY") &&
    status !== "Pending"
      ? setDisable(false)
      : setDisable(true);
  }, [date, status]);
  console.log(status);
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert Time"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your registration period is greater than 8. You still want to
            continue to register
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={
              defaultdata.message === " Get An Effort"
                ? handleAgreeUpdate
                : handleAgreeSubmit
            }
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <form
        onSubmit={
          defaultdata.message === " Get An Effort"
            ? handleUpdateSubmit
            : handleAddSubmit
        }
        noValidate={true}
        autoComplete="off"
        className={classes.form}
      >
        <DropBack open={drop} />
        <Card style={{ height: "89vh" }}>
          <CardHeader
            title={
              <Typography gutterBottom variant="h4" component="div">
                {defaultdata.message === " Get An Effort"
                  ? "UPDATE ACTUAL TIME"
                  : "REGISTION PROJECT"}
              </Typography>
            }
            align="center"
          />

          <CardContent className={classes.layout}>
            <Grid container spacing={3}>
              <Grid item xs={2} sm={3}>
                <TextField
                  label="Date"
                  type="date"
                  format="YYYY-MM-DD"
                  name="createDate"
                  onChange={handleDateChange}
                  fullWidth={true}
                  value={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={3}>
                <DropdownButton
                  content="Project Code"
                  handleClick={handleIdPojectClick}
                />
              </Grid>
              {defaultdata.message === " Get An Effort" ? (
                <>
                  <Grid item xs={8} sm={6}>
                    <FormControl style={{ width: "79.5%" }}>
                      <InputLabel>Actual Time</InputLabel>
                      <Input
                        type="number"
                        name="time"
                        disabled={disable}
                        value={formUpdate.time.toFixed(1)}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl style={{ width: "90%" }}>
                      <InputLabel>Task</InputLabel>
                      <Input
                        name="task"
                        value={formUpdate.task}
                        multiline
                        rows={5}
                        rowsMax={10}
                        disabled={disable}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl style={{ width: "90%" }}>
                      <InputLabel>Note</InputLabel>
                      <Input
                        value={formUpdate.note}
                        multiline
                        name="note"
                        rows={5}
                        rowsMax={10}
                        disabled={disable}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item sm={12} md={6}>
                    <TextField
                      name="time"
                      type="number"
                      disabled={disable}
                      variant="outlined"
                      style={{ width: "79.5%" }}
                      label="Actual time"
                      onChange={handleInputChange}
                      value={formUpdate.time}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="task"
                      label="Task"
                      disabled={disable}
                      style={{ width: "90%" }}
                      multiline
                      rows={5}
                      rowsMax={10}
                      onChange={handleInputChange}
                      value={formUpdate.task}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="note"
                      label="Note"
                      disabled={disable}
                      style={{ width: "90%" }}
                      multiline
                      rows={5}
                      rowsMax={10}
                      onChange={handleInputChange}
                      value={formUpdate.note}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {defaultdata.message === " Get An Effort" ? (
              <CardActions style={{ marginLeft: "79.5%", marginTop: "20px" }}>
                <Button
                  color="primary"
                  size="large"
                  disabled={disable}
                  variant="contained"
                  type="submit"
                  style={{ width: 100 }}
                >
                  {status === "Pending" ? "Pending" : "Update"}
                </Button>
              </CardActions>
            ) : (
              <CardActions style={{ marginLeft: "79.5%", marginTop: "20px" }}>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  disabled={disable}
                  type="submit"
                >
                  {status === "Pending" ? "Pending" : "Submit"}
                </Button>
              </CardActions>
            )}
          </CardContent>
        </Card>
      </form>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  projectID: state.common.projectCodeSelected,
});

export default connect(mapStateToProps)(ProjectRegistionPage);
