import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createMuiTheme,
  Grid,
  IconButton,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import React, { useCallback, useEffect, useState } from "react";
import { receiveAllProjectAction } from "../../redux/all-projects/allProjectAction";
import DashboardService from "../../service/dashboard.service";
import { receiveProjectAction } from "../../redux/project/project.action";
import { connect } from "react-redux";
import moment from "moment";
import logo from "./img/logo.png";
import ProjectService from "../../service/project.service";
import ListTable from "../../components/common/table/ListTable";
import { useHistory } from "react-router-dom";
import DropBack from "../../components/common/dropback/DropBack";
import usePagination from "../../components/common/pagination/Pagination";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: "uppercase",
    marginBottom: "-20px",
  },
  paper: {
    margin: theme.spacing(3),
    color: theme.palette.text.secondary,
    minHeight: "90%",
    boxShadow: "0px 2px 2px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,128,0.4)",
  },
  avatar: {
    backgroundColor: "#3949ab",
    fontSize: 20,
    width: 40,
    height: 40,
    marginLeft: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  cardHeader: {
    boxShadow: "4px 2px 2px rgba(0,0,0,0.25)",
    padding: "0",
  },
  media: {
    height: 0,
    paddingTop: "40%",
  },
  bold: {
    fontWeight: 600,
  },
  root: {
    ...theme.typography.button,
  },
  pagination: {
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "41%",

    // "& > *": {
    //   marginLeft: theme.spacing("50%"),
    // },
  },
}));
const headingFont = createMuiTheme({
  typography: {
    fontFamily: ["font-family: 'M PLUS Rounded 1c', sans-serif"].join(","),
  },
});
const headers = [
  { title: "Email", field: "email" },
  { title: "Role", field: "idRole" },
  { title: "Plan Effort (%)", field: "planEffort" },
];

const DashboardPage = ({
  receiveAllProjectAction,
  allProject,
  user,
  receiveProjectAction,
  myProject,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [drop, setDrop] = useState(true);

  myProject = myProject.filter((item) => item.idProject !== "other");
  allProject = allProject.filter((item) => item.idProject !== "other");

  //Pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  let data = [];
  if (user.role_idrole === "admin") {
    data = allProject;
  } else {
    data = myProject;
  }
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const processAllProjectToForm = useCallback(
    (project) => {
      const dashboardList = [];
      const serverallProject = project.data;
      serverallProject.forEach((item) => {
        const tmp = {
          idProject: item.idProject || null,
          projectName: item.projectName || null,
          description: item.description || null,
          start: item.start || null,
          finish: item.finish || null,
          status: item.status || null,
          type: item.type || null,
          memberRoles: item.memberRoles || [],
        };
        dashboardList.push(tmp);
      });
      console.log("dashboard List: ", dashboardList);
      receiveAllProjectAction(dashboardList);
      return dashboardList;
    },
    [receiveAllProjectAction]
  );

  //Add my project into form
  const processMyProjectToTable = useCallback(
    (project) => {
      const projectList = [];
      const serverProjectList = project.data;
      console.log(serverProjectList);
      serverProjectList.forEach((item) => {
        const project = {
          actualTime: item.actualTime.toFixed(1),
          actualEffort:
            item.laborDay === 0
              ? 0
              : (
                  (item.actualTime.toFixed(1) / (8 * item.laborDay)) *
                  100
                ).toFixed(2),
          idProject: item.idProject,
          description: item.description,
          start: moment(item.start).format("MMMM D, YYYY"),
          finish: moment(item.finish).format("MMMM D, YYYY"),
          PersonalCost: item.actualEffort / 8,
          status: item.status,
          type: item.type,
          planEffort: item.planEffort,
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

  const detailHandler = (rowData) => {
    sessionStorage.setItem("email", rowData.email);
    sessionStorage.setItem("flag", true);
    history.push("/dashboard/project/personal-management/details");
  };

  useEffect(() => {
    DashboardService.dashboardList().then((res) => {
      setDrop(false);
      processAllProjectToForm(res.data);
    });

    ProjectService.listProject().then((res) => {
      setDrop(false);
      processMyProjectToTable(res.data);
      console.log(res.data);
    });
  }, [processAllProjectToForm, processMyProjectToTable]);

  console.log(myProject);

  return (
    <div>
      {user.role_idrole === "admin" ? (
        <Card
          style={{
            width: "100%",
            minHeight: "89vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <DropBack open={drop} />
          <CardHeader
            title={
              <Typography
                className={classes.bold}
                gutterBottom
                variant="h4"
                component="h3"
              >
                Projects board
              </Typography>
            }
            align="center"
            className={classes.title}
          />
          <Grid container>
            {_DATA.currentData().map((item, index) => (
              <Grid key={item.idProject} item md={6} sm={12} lg={4} xl={4}>
                <Card className={classes.paper} raised={true}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {index + 1}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon
                          style={{ fontSize: 30, marginTop: "10px" }}
                        />
                      </IconButton>
                    }
                    title={
                      <ThemeProvider theme={headingFont}>
                        <Typography
                          style={{
                            color: "black",
                            lineHeight: "5px",
                            marginTop: "12px",
                          }}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          {item.projectName}
                        </Typography>
                      </ThemeProvider>
                    }
                    subheader={`${moment(item.start).format(
                      "MMMM D, YYYY"
                    )} -  ${moment(item.finish).format("MMMM D, YYYY")} `}
                    align="left"
                  />

                  <CardContent align="center">
                    <ThemeProvider theme={headingFont}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
                      </Typography>
                      <br />

                      <ListTable
                        headers={headers}
                        cells={item.memberRoles}
                        onRowClickCallBack={detailHandler}
                      />
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.pagination}>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              color="primary"
              hidden={_DATA.currentData().length <= 5 ? true : false}
            />
          </div>
        </Card>
      ) : (
        <Card
          style={{
            width: "100%",
            minHeight: "89vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <DropBack open={drop} />
          <CardHeader
            title={
              <Typography
                className={classes.bold}
                gutterBottom
                variant="h4"
                component="h3"
              >
                Projects board
              </Typography>
            }
            align="center"
            className={classes.title}
          />
          <Grid container>
            {_DATA.currentData().map((item, index) => (
              <Grid key={item.idProject} item md={6} sm={12} lg={4} xl={4}>
                <Card className={classes.paper} raised={true}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {index + 1}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon
                          style={{ fontSize: 30, marginTop: "10px" }}
                        />
                      </IconButton>
                    }
                    title={
                      <ThemeProvider theme={headingFont}>
                        <Typography
                          style={{
                            color: "black",
                            lineHeight: "5px",
                            marginTop: "12px",
                          }}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          {item.name}
                        </Typography>
                      </ThemeProvider>
                    }
                    subheader={`${item.start} -  ${item.finish} | Plan Effort: ${item.planEffort}%`}
                    align="left"
                  />
                  <br />
                  <Typography variant="subtitle2" gutterBottom>
                    Actual time: {item.actualTime}h | Actual Effort:{" "}
                    {item.actualEffort}%
                  </Typography>
                  <CardMedia className={classes.media} image={logo} />

                  <CardContent align="center">
                    <ThemeProvider theme={headingFont}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.pagination}>
            <Pagination
              style={{}}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              color="primary"
              hidden={_DATA.length <= 5 ? true : false}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveAllProjectAction: (project) =>
    dispatch(receiveAllProjectAction(project)),
  receiveProjectAction: (project) => dispatch(receiveProjectAction(project)),
});

const mapStateToProps = (state) => ({
  allProject: state.dashboard.allProject,
  myProject: state.project.projectItem,
  user: state.user.userDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
