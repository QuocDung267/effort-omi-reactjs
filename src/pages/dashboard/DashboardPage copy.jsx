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
  const [drop, setDrop] = useState(false);

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
      serverProjectList.forEach((item) => {
        const project = {
          actualTime: item.actualTime,
          actualEffort: item.actualEffort,
          idProject: item.idProject,
          description: item.description,
          start: moment(item.start).format("MMMM D, YYYY"),
          finish: moment(item.finish).format("MMMM D, YYYY"),
          cost: item.cost,
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
    });
  }, [processAllProjectToForm, processMyProjectToTable]);
  myProject = myProject.filter((item) => item.idProject !== "other");
  allProject = allProject.filter((item) => item.idProject !== "other");
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
            {allProject.map((item, index) => (
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
                    )} -  ${moment(item.finish).format("MMMM D, YYYY")}`}
                    align="left"
                  />
                  {/* <CardMedia
                    className={classes.media}
                    image={logo}
                    title="Paella dish"
                  /> */}
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
                      {/* <Typography
                        style={{ color: "black" }}
                        variant="button"
                        display="block"
                        gutterBottom
                      >
                        Member:
                      </Typography> */}
                      <ListTable
                        headers={headers}
                        cells={item.memberRoles}
                        onRowClickCallBack={detailHandler}
                      />
                      {/* {item.memberRoles.map((i, index) => {
                        return (
                          <Typography
                            key={index}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {i.email} : {i.idRole}
                          </Typography>
                         
                        );
                      })} */}
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
            {myProject.map((item, index) => (
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
                    subheader={`${item.start} -  ${item.finish} | Actual Effort: ${item.actualEffort}%`}
                    align="left"
                  />
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
