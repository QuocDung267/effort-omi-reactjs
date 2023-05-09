import React from "react";

// Material-ui import
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isToggle } from "../../redux/common/commonAction";

//Router
import { useHistory } from "react-router-dom";

import ListItems from "../common/list-item/ListItems";
import Routes from "../../routes/Routes";
import { clear } from "../../config/localStore";
import { removeAllMemberFromProjectAction } from "../../redux/project/project.action";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  icon: {
    fontSize: "16px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const Header = ({ userItems, open, dispatch, removeAllMemberAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  //const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    //setOpen(true);
    dispatch(isToggle());
  };

  const handleDrawerClose = () => {
    //setOpen(false);
    dispatch(isToggle());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" style={{ flexGrow: 1, paddingLeft: "20px" }}>
            Ominext's Effort System
          </Typography>
          <Button
            color="inherit"
            className={classes.icon}
            onClick={() => history.push("/dashboard/profile/my-profile")}
          >
            {userItems.userName}
          </Button>
          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => history.push("/dashboard/profile/my-profile")}
          >
            <AccountCircle />
          </IconButton>
          <Button
            onClick={() => {
              clear();
              removeAllMemberAction();
              history.push("/login");
            }}
            color="inherit"
            className={classes.icon}
          >
            Sign out
          </Button>
          <IconButton
            onClick={() => {
              clear();
              removeAllMemberAction();
              history.push("/login");
            }}
            color="inherit"
            className={classes.icon}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link className={classes.link} to="/dashboard/dashboard-page">
            <Typography align="center" variant="subtitle1" display="block">
              Ominicities-Crew
            </Typography>
          </Link>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ListItems />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userItems: state.user.userDetail,
  open: state.common.toggle,
});
const mapDispatchToProps = (dispatch) => ({
  removeAllMemberAction: () => dispatch(removeAllMemberFromProjectAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
