import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ListTable from "../../../components/common/table/ListTable";
import GroupService from "../../../service/group.service";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { showSnackBarAlert } from "../../../config/utils";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "89vh",
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
});
const headers = [
  { title: "IdGroup", field: "idGroup" },
  { title: "Group Name", field: "groupName" },
  { title: "Group Leader", field: "groupLeader" },
];
const GroupsList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [drop, setDrop] = useState(false);
  useEffect(() => {
    setDrop(true);
    GroupService.listGroup()
      .then((res) => {
        setDrop(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  }, []);
  const detailHandler = (rowData) => {
    sessionStorage.setItem("group", JSON.stringify(rowData));
    history.push("/dashboard/admin/group-update");
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <GroupAddIcon
            style={{
              fontSize: 40,
              // backgroundColor: "#3f51b5",
              color: "#3f51b5",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => history.push("/dashboard/admin/group-add")}
          />
        }
      />
      <CardContent>
        <div className={classes.table}>
          <Typography className={classes.title} variant="h4" component="div">
            List Groups
          </Typography>
          <ListTable
            cells={data}
            headers={headers}
            onRowClickCallBack={detailHandler}
            isLoading={drop}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupsList;
