import React from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  withStyles,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

import { Component } from "react";
import listItem from "./ListItemRoutes";

import { connect } from "react-redux";

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#64b5f6",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  },
  selected: {},
})(MuiListItem);

class ListItems extends Component {
  isLoaded = false;

  constructor(props) {
    super(props);
    this.state = {
      data: listItem,
    };
  }

  onClickSelected = (title) => {
    if (this.isLoaded) return;
    this.isLoaded = true;
    this.setState(
      (prevState) => ({
        data: prevState.data.map((items) => {
          items.pages.forEach(
            (item) => (item.isActive = item.title === title ? true : false)
          );

          return items;
        }),
      }),
      () => {
        this.isLoaded = false;
      }
    );
  };

  onClickCollapse = (title) => {
    this.setState((prevState) => ({
      data: prevState.data.map((item) =>
        item.title === title
          ? {
              ...item,
              isOpen: !item.isOpen,
            }
          : item
      ),
    }));
  };

  hanldeDecentralization = (role, iRole, m, iM) => {
    if ((m === iM && iM === "TRUE") || (role === iRole && role === "member")) {
      return false;
    }
    if (role === iRole && role === "member") {
      return false;
    }
    if (role === iRole && role === "admin") {
      return false;
    }
    return true;
  };

  render() {
    const { role, isManager } = this.props;
    // console.log(role);
    //console.log(isManager);

    return (
      <>
        {this.state.data.map((items) => (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            key={items.title}
            hidden={this.hanldeDecentralization(
              role,
              items.role,
              isManager,
              items.isManager
            )}
          >
            <ListItem button onClick={() => this.onClickCollapse(items.title)}>
              <ListItemIcon>{items.icon}</ListItemIcon>
              <ListItemText primary={items.title} />
              {items.isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={items.isOpen} timeout="auto" unmountOnExit>
              {items.pages.map((item) => (
                <List component="div" disablePadding key={item.title}>
                  <Link style={{ textDecoration: "none" }} to={item.href}>
                    <ListItem
                      button
                      selected={item.isActive}
                      onClick={() => this.onClickSelected(item.title)}
                      style={{ marginLeft: "10px" }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText secondary={item.title} />
                    </ListItem>
                  </Link>
                </List>
              ))}
            </Collapse>
          </List>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.user.userDetail.role_idrole,
  isManager: state.user.userDetail.isManager,
});

export default connect(mapStateToProps)(ListItems);
