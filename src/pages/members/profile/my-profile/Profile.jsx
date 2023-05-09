import React, { useCallback, useEffect } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, Grid, Typography, ThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListTable from "../../../../components/common/table/ListTable";
import ProjectService from "../../../../service/project.service";
import handleApiError from "../../../../config/handleApiError";
import { receiveProjectAction } from "../../../../redux/project/project.action";
import moment from "moment";
import UserService from "../../../../service/user.service";
import { receiveUserAction } from "../../../../redux/user/user.action";
import { useState } from "react";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "89vh",
    // padding: "150px 20px 0 20px",
  },
  rootContet: {
    height: "100%",
    width: "100%",
    padding: "100px 20px 0 20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
    lineHeight: "1.5",
    color: "#555",
  },
  pos: {
    marginBottom: 12,
  },

  table: {
    width: "80%",
    margin: "auto",
    marginBottom: "10px",
  },
});

const headingFont = createMuiTheme({
  typography: {
    fontFamily: ["font-family: 'M PLUS Rounded 1c', sans-serif"].join(","),
  },
});

const headers = [
  { title: "Code", field: "idProject" },
  { title: "Project Name", field: "name" },
  { title: "Start Date", field: "start" },
  { title: "End Date", field: "finish" },
  { title: "Actual Time", field: "actualTime" },
  { title: "Actual Effort (%)", field: "actualEffort" },
  { title: "Cost (MM)", field: "PersonalCost" },
  { title: "Status", field: "status" },
];

const Profile = ({
  user,
  project,
  receiveProjectAction,
  receiveUserAction,
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  //add project to form
  const processDataToTable = useCallback(
    (project) => {
      const projectList = [];
      const serverProjectList = project.data;
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
          start: moment(item.start).format("DD-MM-YYYY"),
          finish: moment(item.finish).format("DD-MM-YYYY"),
          PersonalCost: item.actualTime.toFixed(1) / 8,
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

  useEffect(() => {
    setLoading(true);
    ProjectService.listProject()
      .then((res) => {
        processDataToTable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        handleApiError(err);
      });

    UserService.userProfile()
      .then((res) => {
        setProfile(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        handleApiError(err);
        setLoading(false);
      });
  }, [processDataToTable]);

  const handleDetailProject = (rowSelect) => {
    console.log(rowSelect);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="USER PROFILE" />
      <CardContent className={classes.rootContet}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} lg={8} xl={8}>
            <ListTable
              headers={headers}
              cells={project}
              isLoading={loading}
              onRowClickCallBack={handleDetailProject}
            />
          </Grid>
          <Grid item md={6} sm={12} lg={4} xl={4}>
            <Card style={{ minHeight: "auto" }}>
              <CardHeader
                subheader={profile.role_idrole}
                title={
                  <div>
                    <AccountCircleIcon
                      fontSize="large"
                      style={{ fontSize: "120px" }}
                    />
                    <ThemeProvider theme={headingFont}>
                      <Typography
                        style={{
                          color: "black",
                          lineHeight: "5px",
                          marginTop: "12px",
                          marginBottom: "14px",
                        }}
                        gutterBottom
                        variant="h6"
                        component="h2"
                      >
                        {profile.userName}
                      </Typography>
                    </ThemeProvider>
                  </div>
                }
                align="center"
              />
              <CardContent
                align="center"
                style={{ width: "50%", margin: "auto" }}
              >
                <Grid container>
                  <Grid item sm={6}>
                    <p className={classes.title}>Email:</p>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {profile.email}
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <p className={classes.title}>Phone:</p>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {profile.phone}
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <p className={classes.title}>Effort:</p>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {profile.effortInMonth}%
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <p className={classes.title}>group:</p>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {profile.groups !== null && profile.groups !== undefined
                        ? profile.groups.map((item) => `${item.groupName} `)
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.userDetail,
  project: state.project.projectItem,
});
const mapDispatchToProps = (dispatch) => ({
  receiveProjectAction: (project) => dispatch(receiveProjectAction(project)),
  receiveUserAction: (profile) => dispatch(receiveUserAction(profile)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
