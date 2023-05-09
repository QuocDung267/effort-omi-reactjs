import "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import ListTable from "../../../components/common/table/ListTable";
import { useHistory } from "react-router-dom";
import UserService from "../../../service/user.service";
import { Grid } from "@material-ui/core";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import { showSnackBarAlert } from "../../../config/utils";
import GroupService from "../../../service/group.service";
import handleApiError from "../../../config/handleApiError";
import Toolbar from "@material-ui/core/Toolbar";
import Group from "../../../components/common/group/Group";
import { connect } from "react-redux";
import { receiveListUserAction } from "../../../redux/user/user.action";

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
  { title: "Full Name", field: "userName" },
  { title: "Email", field: "email" },
  { title: "Phone Number", field: "phone" },
  { title: "Role", field: "idRole" },
  { title: "Group", field: "groups" },
  { title: "Status", field: "state" },
];

const EmployeePage = ({ user, receiveListUserAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const [mounted, setMounted] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState(false);
  const processDataToTable = useCallback(
    (users) => {
      const userList = [];
      const serverMemberList = users.data !== "" ? users.data : [];
      console.log(serverMemberList);
      serverMemberList.forEach((item) => {
        const users = {
          userName: item.userName,
          email: item.email,
          phone: item.phone,
          idRole: item.idRole,
          groups: item.groups !== null ? item.groups.toString() : null,
          state: item.state,
        };
        userList.push(users);
      });
      receiveListUserAction(userList);
      return userList;
    },
    [receiveListUserAction]
  );

  const detailHandler = (rowData) => {
    sessionStorage.setItem("user", JSON.stringify(rowData));
    history.push("/dashboard/admin/detail-member");
  };
  const handleGruopClick = (e) => {
    setDrop(true);
    const { value } = e.target;
    let tmp = "";
    value === 0 ? (tmp = groupName) : (tmp = value);
    setGroupName(value);
    if (tmp !== "all") {
      GroupService.getMemberInGroupAdmin(tmp)
        .then((res) => {
          setDrop(false);
          res.data.data !== ""
            ? processDataToTable(res.data)
            : showSnackBarAlert(3000, "error", res.data.message);
        })
        .catch((err) => {
          setDrop(false);
          handleApiError(err);
        });
    } else {
      UserService.getMemberInGroupAdmin().then((res) => {
        processDataToTable(res.data);
        setDrop(false);
      });
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = () => {
    setDrop(true);
    UserService.listMember(search)
      .then((res) => {
        setDrop(false);
        processDataToTable(res.data);
      })
      .catch((err) => {
        setDrop(false);
        showSnackBarAlert(3000, "error", err.reponse.data.message);
      });
  };
  useEffect(() => {
    if (mounted) {
      setDrop(true);
      UserService.listMember()
        .then((res) => {
          processDataToTable(res.data);
          setDrop(false);
        })
        .catch((err) => {
          showSnackBarAlert(1000, "error", err.response.data.message);
          setDrop(false);
        });
    }
    return () => setMounted(false);
  }, [mounted, processDataToTable]);

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h4" component="div">
        List of member
      </Typography>
      <CardContent className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Group handleClick={handleGruopClick} />
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
});

const mapDispatchToProps = (dispatch) => ({
  receiveListUserAction: (user) => dispatch(receiveListUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
