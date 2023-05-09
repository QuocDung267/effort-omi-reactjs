import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ListTable from "../../../../components/common/table/ListTable";
import { useHistory } from "react-router";
import SearchBar from "../../../../components/common/SearchBar/SearchBar";

const useStyles = makeStyles(() => ({
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
    marginLeft: "38%",
    paddingBottom: "3%",
    textTransform: "uppercase",
    paddingTop: "0px",
  },
}));
const headers = [
  { title: "Role", field: "role" },
  { title: "Member", field: "member" },
];

const DetailProjectMember = () => {
  const classes = useStyles();
  const history = useHistory();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const hanleBack = () => {
    sessionStorage.clear();
    history.push("/dashboard/home/my-project");
  };
  return (
    <Card>
      <CardContent>
        <div className={classes.table}>
          <Typography className={classes.title} variant="h4" component="div">
            List Members
          </Typography>
          <SearchBar />
          <ListTable headers={headers} cells={data} />
        </div>

        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginLeft: "94%" }}
          onClick={hanleBack}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetailProjectMember;
