import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Card,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import DropdownButton from "../../../../components/common/drop-down-button/DropdownButton";
import moment from "moment";
import ActualTimeService from "../../../../service/actual.service";
import ListTable from "../../../../components/common/table/ListTable";
import { receiveEffortAction } from "../../../../redux/effort/effort.action";
import { connect } from "react-redux";
import { showSnackBarAlert } from "../../../../config/utils";
import ProjectService from "../../../../service/project.service";
import { useEffect } from "react";
const headers = [
  { title: "Date", field: "createDate" },
  { title: "Actual Time", field: "time" },
  { title: "Task", field: "task" },
  { title: "Note", field: "note" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  detail: {
    width: "80%",
    marginTop: "2%",
  },
  select: {
    marginLeft: "8%",
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
  },
});

const ProjectActualTimePage = ({ receiveEffortList, idProject }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [drop, setDrop] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const [selectDate, setSelectDate] = useState(moment().format("YYYY-MM-DD"));
  const processDataToTable = (effort) => {
    const effortList = [];
    let serverEffortList = [];
    if (effort.data === "") {
      serverEffortList.forEach((item) => {
        const effort = {
          time: item.time,
          note: item.note,
          task: item.task,
          createDate: moment(item.createDate).format("YYYY-MM-DD"),
        };
        effortList.push(effort);
      });
    } else {
      serverEffortList = effort.data;
      serverEffortList.forEach((item) => {
        const effort = {
          time: item.time.toFixed(2),
          note: item.note,
          task: item.task,
          createDate: moment(item.createDate).format("YYYY-MM-DD"),
          flag:
            moment(item.createDate).format("M/YYYY") ===
            moment().format("M/YYYY")
              ? true
              : false,
        };
        effortList.push(effort);
      });
    }

    //receiveProjectAction(projectList);
    receiveEffortList(effortList);
    setData(effortList);
    return effortList;
  };

  const DetailHandler = () => {};

  const handleIdPojectClick = (e) => {
    setDrop(true);
    let tmp = "";
    e.target.value === 0 ? (tmp = idProject) : (tmp = e.target.value);
    callApiGetListActualTime(tmp);
    ProjectService.projectDetail(tmp).then((res) => {
      setStatus(res.data.data.status);
    });
  };

  const handleRowDelete = (oldData, resolve) => {
    ActualTimeService.deleteActualTime({
      idProject: idProject,
      createDate: oldData.createDate,
    }).then((res) => {
      callApiGetListActualTime(idProject);
      resolve();
      showSnackBarAlert(10000, "success", res.data.message);
    });
  };
  const handleRowUpdate = (newData, oldData, resolve) => {
    console.log("oldata ", oldData);
    ActualTimeService.updateActualTime({
      idProject: idProject,
      createDate: newData.createDate,
      time: newData.time,
      task: newData.task,
      note: newData.note,
    }).then((res) => {
      console.log(res.data);
      resolve();
      showSnackBarAlert(10000, "success", res.data.message);
      callApiGetListActualTime(idProject);
    });
  };

  const callApiGetListActualTime = (id) => {
    ActualTimeService.getListActualTime({
      idProject: id,
      month: selectDate,
    })
      .then((res) => {
        setDrop(false);
        processDataToTable(res.data);
      })
      .catch((err) => {
        setDrop(false);
      });
  };

  const handleDateChange = (e) => {
    setSelectDate(e.target.value);
  };
  useEffect(() => {
    status === "Pending" ? setDisabled(true) : setDisabled(false);
  }, [status]);
  console.log(status);
  console.log(disabled);
  return (
    <Card
      style={{
        width: "100%",
        height: "89vh",
      }}
    >
      <CardHeader
        title={
          <Typography gutterBottom variant="h4" component="div">
            ACTUAL TIME
          </Typography>
        }
        align="center"
        className={classes.title}
      />
      <Grid className={classes.select} container spacing={3}>
        <Grid item xs={2}>
          <TextField
            label="Date"
            type="date"
            name="start"
            onChange={handleDateChange}
            fullWidth={true}
            value={selectDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <DropdownButton
            content="Project Code"
            handleClick={handleIdPojectClick}
          />
        </Grid>
        <Grid item xs={10}>
          <Paper>
            <ListTable
              cells={data}
              headers={headers}
              isLoading={drop}
              onRowClickCallBack={DetailHandler}
              handleEdit={{
                isEditable: (rowData) => rowData.flag === true,
                isDeletable: (rowData) =>
                  rowData.flag === true || disabled === true,
                onRowDelete: !disabled
                  ? (oldData) =>
                      new Promise((resolve) => {
                        handleRowDelete(oldData, resolve);
                      })
                  : null,
                onRowUpdate: !disabled
                  ? (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      })
                  : null,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  idProject: state.common.projectCodeSelected,
});

const mapDispatchToProps = (dispatch) => ({
  receiveEffortList: (effort) => dispatch(receiveEffortAction(effort)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectActualTimePage);
