import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListTable from "../../../../components/common/table/ListTable";
import { connect } from "react-redux";
import {
  projectSelectedAction,
  receiveProjectAction,
} from "../../../../redux/project/project.action";
import moment from "moment";
import ProjectService from "../../../../service/project.service";
import SearchBar from "../../../../components/common/SearchBar/SearchBar";
import { Grid } from "@material-ui/core";
import { showSnackBarAlert } from "../../../../config/utils";
const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    height: "89vh",
    //backgroundColor: "#1111",
  },
  table: {
    margin: "auto",
    width: "90%",
  },
  title: {
    marginLeft: "38%",
    paddingBottom: "3%",
    textTransform: "uppercase",
    paddingTop: "0px",
    //border: "solid 1px black",
  },
}));

const headers = [
  { title: "Code", field: "idProject" },
  { title: "Project Name", field: "name" },
  { title: "Start", field: "start" },
  { title: "Finish", field: "finish" },
  { title: "Type", field: "type" },
  { title: "Plan Cost", field: "cost" },
  { title: "Actual Cost", field: "actualCost" },
  { title: "Status", field: "status" },
];

const ProjectListPage = ({ project, receiveProjectAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const data = project.filter((item) => item.idProject !== "other");

  const detailHandler = (rowData) => {
    history.push("/dashboard/project/detail");
    sessionStorage.setItem("idProject", rowData.idProject);
  };
  const processMyProjectToTable = useCallback(
    (project) => {
      const projectList = [];
      const serverProjectList = project.data;
      console.log(serverProjectList);
      serverProjectList.forEach((item) => {
        const project = {
          actualTime: `${item.actualTime}h`,
          actualEffort: item.actualEffort,
          idProject: item.idProject,
          description: item.description,
          start: moment(item.start).format("YYYY-MM-DD"),
          finish: moment(item.finish).format("YYYY-MM-DD"),
          cost: item.cost,
          actualCost:
            item.type === "Project Base"
              ? `${(item.laborTime / (8 * item.costDay)).toFixed(2)} | ${(
                  item.baseTime /
                  (8 * item.baseDay)
                ).toFixed(2)}`
              : item.laborDay === 0
              ? 0
              : (item.laborTime / (8 * item.costDay)).toFixed(2),
          status: item.status,
          type: item.type,
          name: item.projectName,
          group: item.group_db,
        };
        projectList.push(project);
      });
      receiveProjectAction(projectList);
      return projectList;
    },
    [receiveProjectAction]
  );
  useEffect(() => {
    ProjectService.listProject(selectedDate, search)
      .then((res) => {
        processMyProjectToTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [processMyProjectToTable, selectedDate, search]);

  //Search
  const handleSearchDateChange = (e) => {
    setDrop(true);
    setSelectedDate(e.target.value);
    ProjectService.listProject(e.target.value, search)
      .then((res) => {
        processMyProjectToTable(res.data);
        setDrop(false);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(1000, "error", err.response.message);
      });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    setDrop(true);
    ProjectService.listProject(selectedDate, search)
      .then((res) => {
        processMyProjectToTable(res.data);
        setDrop(false);
      })

      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(err.response.message);
      });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography gutterBottom variant="h4" component="div">
            PROJECTS LIST
          </Typography>
        }
        align="center"
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <div style={{ paddingTop: "18px" }}>
              <TextField
                type="date"
                format="YYYY-MM-DD"
                name="month"
                value={selectedDate}
                onChange={handleSearchDateChange}
                fullWidth={true}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <Toolbar>
              <div className={classes.search}>
                <SearchBar
                  handleChange={handleSearchChange}
                  searchHandler={handleSearchSubmit}
                />
              </div>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <ListTable
              headers={headers}
              onRowClickCallBack={detailHandler}
              cells={data}
              isLoading={drop}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  project: state.project.projectItem,
});

const mapDispatchToProps = (dispatch) => ({
  projectSelectedAction: (project) => dispatch(projectSelectedAction(project)),

  receiveProjectAction: (project) => dispatch(receiveProjectAction(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage);
