import { Card, CardContent, makeStyles, Typography,Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ListTable from "../../../../components/common/table/ListTable";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    height: "89vh",
  },
  table: {
    marginTop: "60px",
    margin: "auto",
    width: "90%",
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
    textTransform: "uppercase",
  },
}));
const headers = [
  { title: "Code", field: "code" },
  { title: "Project Name", field: "name" },
  { title: "Plan Effort", field: "plan" },
  { title: "Start Date", field: "start" },
  { title: "End Date", field: "end" },
];

const cells = [
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
  {
    code: "[BU5][TTS]",
    name: "Ominext's Effort System",
    plan: "70%",
    start: "15/04/2021",
    end: "01/07/2021",
    type: "adult",
  },
];

const ViewProjectJoined = () => {
  const classes = useStyles();
  const history = useHistory();
  const detailHandler = () => {};
  return (
    <Card className={classes.root}>
        <Typography className={classes.title} variant="h4" component="div">The Projects have Participated</Typography>
      <CardContent>
        <div className={classes.table}>
          <ListTable
            cells={cells}
            headers={headers}
            onRowClickCallBack={detailHandler}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", marginLeft: "94%" }}
            onClick={() => history.push("/dashboard/project/personal-management")}
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewProjectJoined;
