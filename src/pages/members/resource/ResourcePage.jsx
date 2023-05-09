import React, { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DatePickers from "../../../components/common/date-picker/DatePicker";
import DropdownButton from "../../../components/common/drop-down-button/DropdownButton";
import { connect } from "react-redux";
import moment from "moment";
import ProjectService from "../../../service/project.service";
import { projectCodeSelectedAction } from "../../../redux/common/commonAction";
import ListTable from "../../../components/common/table/ListTable";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DropBack from "../../../components/common/dropback/DropBack";
import { showSnackBarAlert } from "../../../config/utils";
import Linkify from "react-linkify";
const useStyles = makeStyles({
  root: {
    width: "100%",

    //height: "100%",
    // margin: "auto",
  },
  card: {
    width: "96%",
    minHeight: "90vh",
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  area: {
    width: "65%",
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
  },

  close: {
    display: "none",
  },
  table: {
    width: "80%",
    margin: "auto",
  },
});

const headers = [
  { title: "Email", field: "email" },
  { title: "Fule Name", field: "userName" },
  { title: "Phone", field: "phone" },
];

const ResourcePage = ({ projectCode, projectCodeSelectedAction }) => {
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);
  const [data, setData] = useState({});
  const [drop, setDrop] = useState(false);
  useEffect(() => {
    if (mounted) projectCodeSelectedAction("");
    return () => setMounted(false);
  });

  const handleClickIdProject = (e) => {
    setDrop(true);
    const { value } = e.target;
    let tmp = "";
    value === 0 ? (tmp = projectCode) : (tmp = value);
    ProjectService.projectDetail(tmp)
      .then((res) => {
        setDrop(false);
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  };

  const detailHandler = () => {};
  return (
    <Grid className={classes.root}>
      <Card style={{ minHeight: "70vh", paddingLeft: "50px" }}>
        <DropBack open={drop} />
        <CardHeader
          title={
            <Typography gutterBottom variant="h4" component="div">
              RESOURCE PROJECT
            </Typography>
          }
          align="center"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <DatePickers
                content="Date"
                date={moment().format("YYYY-MM-DD")}
              />
            </Grid>
            <Grid item xs={2}>
              <DropdownButton
                content="Project Code"
                handleClick={handleClickIdProject}
              />
            </Grid>
          </Grid>
          <br />

          <Card
            elevation={1}
            className={projectCode === "" ? classes.close : classes.card}
          >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <AssignmentIcon />
                </Avatar>
              }
              title={data.idProject}
              subheader={`${moment(data.start).format(
                "MMMM D, YYYY"
              )} -  ${moment(data.finish).format("MMMM D, YYYY")}`}
            />

            <CardContent>
              <Typography gutterBottom variant="h6">
                Project Name: {data.projectName}
              </Typography>
              <Typography variant="body1" component="p">
                Status: {data.status}
              </Typography>
              <Typography variant="body1" component="p">
                Type: {data.type}
              </Typography>

              <Typography variant="body1" component="p">
                Plan Cost: {data.cost}MM
              </Typography>
              <br />
              <Linkify>
                <Typography variant="body2" color="textSecondary" component="p">
                  DESCRIPTION: {data.description}
                </Typography>
              </Linkify>
            </CardContent>
            <div className={classes.table}>
              <ListTable
                cells={data.member}
                headers={headers}
                onRowClickCallBack={detailHandler}
              />
            </div>
          </Card>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  projectCode: state.common.projectCodeSelected,
});

const mapDispatchToProps = (dispatch) => ({
  projectCodeSelectedAction: (projectcode) =>
    dispatch(projectCodeSelectedAction(projectcode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourcePage);
