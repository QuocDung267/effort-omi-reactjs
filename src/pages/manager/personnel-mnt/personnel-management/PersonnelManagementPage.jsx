import "date-fns";
import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import ListTable from "../../../../components/common/table/ListTable";
import { useHistory } from "react-router-dom";
import SearchBar from "../../../../components/common/SearchBar/SearchBar";
import { receiveListUserAction } from "../../../../redux/user/user.action";
import UserService from "../../../../service/user.service";
import { connect } from "react-redux";
import Group from "../../../../components/common/group/Group";
import GroupService from "../../../../service/group.service";
import handleApiError from "../../../../config/handleApiError";
import { showSnackBarAlert } from "../../../../config/utils";
import moment from "moment";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "20px",
    textTransform: "uppercase",
  },
  root: {
    height: "89vh",
  },
  table: {
    marginTop: "80px",
    margin: "auto",
    width: "90%",
  },
  content: {
    marginTop: "40px",
  },
  search: {
    //    border: "solid",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    height: "3vh",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const headers = [
  { title: "Full Name ", field: "username" },
  { title: "Email", field: "email" },
  { title: "Phone Number", field: "phone" },
  { title: "Effort In Month(%)", field: "effort" },
  { title: "Group", field: "group" },
  { title: "Status", field: "state" },
];

const PersonnelManagementPage = ({ receiveListUserAction, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [mounted, setMounted] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState(false);
  const [idGroup, setIdGroup] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const detailHandler = (rowData) => {
    sessionStorage.setItem("email", rowData.email);
    history.push("/dashboard/project/personal-management/details");
  };
  const handleGruopClick = (e) => {
    setDrop(true);
    const { value } = e.target;
    let tmp = "";
    value === 0 ? (tmp = groupName) : (tmp = value);
    setIdGroup(tmp);
    setGroupName(value);
    if (tmp !== "all") {
      GroupService.getMemberInGroup(tmp, selectedDate, search)
        .then((res) => {
          setDrop(false);
          if (res.data.data !== "") {
            processDataToTable(res.data);
          } else {
            processDataToTable(res.data);
            showSnackBarAlert(1000, "error", res.data.message);
          }
        })
        .catch((err) => {
          setDrop(false);
          handleApiError(err);
          receiveListUserAction([]);
        });
    } else {
      GroupService.getMemberInGroup(null, selectedDate, search)
        .then((res) => {
          processDataToTable(res.data);
          setDrop(false);
        })
        .catch((err) => {
          setDrop(false);
          showSnackBarAlert(3000, "error", err.response.data.title);
        });
    }
  };

  //add project to form
  const processDataToTable = useCallback(
    (user) => {
      const usersList = [];
      console.log(user.data);
      const serverUsersList = user.data !== "" ? user.data : [];
      console.log("usser,", user.data);
      serverUsersList.forEach((item) => {
        const user = {
          email: item.email,
          username: item.userName,
          phone: item.phone,
          state: item.state,
          effort: item.effortInMonth,
          group: item.groups !== null ? item.groups.toString() : null,
        };
        usersList.push(user);
      });
      receiveListUserAction(usersList);
      return usersList;
    },
    [receiveListUserAction]
  );

  useEffect(() => {
    if (mounted) setDrop(true);
    UserService.userList()
      .then((res) => {
        processDataToTable(res.data);
        setDrop(false);
      })
      .catch((err) => {
        showSnackBarAlert(1000, "error", err.response.data.message);
        setDrop(false);
      });
    return () => setMounted(false);
  }, [mounted, processDataToTable]);
  const handleSearchChange = (e) => {
    //receiveSearchKeyAction(e.target.value);
    setSearch(e.target.value);
  };
  const handleSearchSubmit = () => {
    setDrop(true);
    GroupService.getMemberInGroup(
      idGroup === "all" ? null : idGroup,
      selectedDate,
      search
    )
      .then((res) => {
        setDrop(false);
        processDataToTable(res.data);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.response.data.message);
      });
  };
  const handleSearchDateChange = (e) => {
    setDrop(true);
    setSelectedDate(e.target.value);
    GroupService.getMemberInGroup(
      idGroup === "all" ? null : idGroup,
      e.target.value,
      search
    )
      .then((res) => {
        processDataToTable(res.data);
        setDrop(false);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(err.response.message);
      });
  };
  return (
    <Card className={classes.root}>
      {/* <DropBack open={drop} /> */}
      <Typography className={classes.title} variant="h4" component="div">
        List of member
      </Typography>
      <CardContent className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Group handleClick={handleGruopClick} />
          </Grid>
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
              cells={user}
              headers={headers}
              onRowClickCallBack={detailHandler}
              isLoading={drop}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.userItems,
  groupItem: state.common.group,
});

const mapDispatchToProps = (dispatch) => ({
  receiveListUserAction: (user) => dispatch(receiveListUserAction(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonnelManagementPage);
