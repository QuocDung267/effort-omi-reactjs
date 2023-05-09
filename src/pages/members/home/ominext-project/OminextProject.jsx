import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import ListTable from "../../../../components/common/table/ListTable";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    height: "89vh",
  },
  table: {
    marginTop: "80px",
    margin: "auto",
    width: "90%",
  },
  title: {
    marginLeft: "35%",
    paddingBottom: "3%",
    textTransform: "uppercase",
    paddingTop: "0px",
    //border: "solid 1px black",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const headers = [
  { title: "Code", field: "idProject" },
  { title: "Project Name", field: "name" },
  { title: "Start Date", field: "start" },
  { title: "End Date", field: "finish" },
];

const OminextProject = ({ project }) => {
  const classes = useStyles();

  const detailHandler = (rowData) => {
    console.log(rowData.data);
  };
  const data = project.filter((item) => item.idProject !== "other");

  const processMyProjectToTable = (project) => {
    const projectList = [];
    const serverProjectList = project;
    serverProjectList.forEach((item) => {
      const project = {
        actualTime: item.actualTime,
        idProject: item.idProject,
        description: item.description,
        start: moment(item.start).format("YYYY-MM-DD"),
        finish: moment(item.finish).format("YYYY-MM-DD"),
        cost: item.cost,
        status: item.status,
        type: item.type,
        name: item.projectName,
      };
      projectList.push(project);
    });
    return projectList;
  };
  console.log(processMyProjectToTable(project));

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.table}>
          <Typography className={classes.title} variant="h4" component="div">
            Ominext's Projects
          </Typography>

          <ListTable
            cells={processMyProjectToTable(data)}
            headers={headers}
            onRowClickCallBack={detailHandler}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  project: state.dashboard.allProject,
});

export default connect(mapStateToProps)(OminextProject);
