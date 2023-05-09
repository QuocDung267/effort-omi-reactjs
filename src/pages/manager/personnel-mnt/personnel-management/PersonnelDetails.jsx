import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  CardActions,
  CardHeader,
  Grid,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import ListTable from "../../../../components/common/table/ListTable";
import { createMuiTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ProjectService from "../../../../service/project.service";
import handleApiError from "../../../../config/handleApiError";
import UserService from "../../../../service/user.service";

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
  backGroundRed: {
    backgroundColor: "#ff4569",
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
  { title: "Plan Effort", field: "planEffort" },
  { title: "Actual Effort", field: "actualEffort" },
  { title: "Status", field: "status" },
];

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [infor, setInfor] = useState({});
  const timer = useRef();
  //add project to form
  const processDataToTable = (project) => {
    const projectList = [];
    const serverProjectList = project.data;
    // .filter(
    //   (item) =>
    //     item.idProject !== "other" &&
    //     moment(item.finish).format("M-YYYY") === moment().format("M-YYYY")
    // );
    console.log(serverProjectList);
    serverProjectList.forEach((item) => {
      const project = {
        actualTime: `${item.actualTime.toFixed(1)}h`,
        actualEffort:
          item.laborDay === 0
            ? "0.0%"
            : `${((item.actualTime / (item.laborDay * 8)) * 100).toFixed(2)}%`,
        idProject: item.idProject,
        description: item.description,
        planEffort: `${item.planEffort}%`,
        start: moment(item.start).format("YYYY-MM-DD"),
        finish: moment(item.finish).format("YYYY-MM-DD"),
        cost: (item.actualTime / 8).toFixed(1),
        status: item.status,
        type: item.type,
        name: item.projectName,
      };
      projectList.push(project);
    });
    setData(projectList);
    return projectList;
  };

  useEffect(() => {
    if (mounted) {
      const email = sessionStorage.getItem("email");
      ProjectService.projectListByEmail(email)
        .then((res) => {
          processDataToTable(res.data);
        })
        .catch((err) => handleApiError(err));
      UserService.userInfor(email)
        .then((res) => {
          setInfor(res.data.data);
        })
        .catch((err) => handleApiError(err));

      return () => {
        if (!loading) {
          setMounted(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };
    }
  });

  const handleDetailProject = (rowSelect) => {
    console.log(rowSelect);
  };

  console.log(infor.effortInMonth > 100);
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title="USER PROFILE"
        action={
          <KeyboardBackspaceIcon
            onClick={() => {
              const flag = sessionStorage.getItem("flag");

              flag
                ? history.push("/dashboard/dashboard-page")
                : history.push("/dashboard/project/personal-management");
            }}
            style={{
              fontSize: 40,
              backgroundColor: "#3f51b5",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        }
      />
      <CardContent className={classes.rootContet}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <ListTable
              headers={headers}
              cells={data}
              isLoading={loading}
              onRowClickCallBack={handleDetailProject}
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              className={infor.effortInMonth > 100 ? classes.backGroundRed : ""}
              //style={{ backgroundColor: "#33c9dc" }}
            >
              <CardHeader
                subheader={infor.role_idrole}
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
                        {infor.userName}
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
                      {infor.email}
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
                      {infor.phone}
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
                      {infor.effortInMonth}%
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
                      {infor.groups !== undefined && infor.groups !== null
                        ? infor.groups.map((item) => `${item.groupName} `)
                        : "none"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Profile;
