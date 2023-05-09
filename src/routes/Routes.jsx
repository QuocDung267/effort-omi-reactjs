import React from "react";
import { Route, Switch } from "react-router";

import ProjectRegistion from "../pages/members/home/project-registion/ProjectRegistionPage";
import ProjectActualTime from "../pages/members/home/projects-actual-time/ProjectActualTimePage";
import OminextProject from "../pages/members/home/ominext-project/OminextProject";
import { makeStyles } from "@material-ui/core";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ResourcePage from "../pages/members/resource/ResourcePage";
import ProjectListPage from "../pages/manager/project-mnt/projects-list/ProjectListPage";
import Profile from "../pages/members/profile/my-profile/Profile";
import ChangePasswordPage from "../pages/members/profile/change-password/ChangePasswordPage";
import AddProject from "../pages/manager/project-mnt/add-project/AddProject";
import PersonnelManagementPage from "../pages/manager/personnel-mnt/personnel-management/PersonnelManagementPage";
import ViewProjectJoinedPage from "../pages/manager/personnel-mnt/view-project-joined/ViewProjectJoinedPage";
import EmployeePage from "../pages/admin/employee/EmployeePage";
import UpdateNewPasswordPage from "../pages/admin/update-new-password/UpdateNewPasswordPage";
import DetailMember from "../pages/admin/detail-member/DetailMember";
import AddNewMemberPage from "../pages/admin/add-new-member/AddNewMemberPage";
import DetailProjectMember from "../pages/members/home/ominext-project/DetailProjectMember";
import UpdateProject from "../pages/manager/project-mnt/update-project/UpdateProject";
import PersonnelDetails from "../pages/manager/personnel-mnt/personnel-management/PersonnelDetails";
import GroupsList from "../pages/admin/groups/GroupsList";
import GroupAdd from "../pages/admin/groups/GroupAdd";
import GroupUpdate from "../pages/admin/groups/GroupUpdate";

const useStyles = makeStyles((theme) => ({
  full: {
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2.5%",
    minHeight: "89vh",
    //backgroundColor: "#1111",
  },
}));
const Routes = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <Header /> */}
      <div className={classes.full}>
        <Switch>
          Dashboard Page
          <Route path="/dashboard/dashboard-page" component={DashboardPage} />
          {/* =========================MEMBER============================== */}
          {/* Home */}
          <Route
            path="/dashboard/home/registion-project"
            component={ProjectRegistion}
          />
          <Route
            path="/dashboard/home/projects-actual-time"
            component={ProjectActualTime}
          />
          <Route path="/dashboard/home/my-project" component={OminextProject} />
          <Route
            path="/dashboard/home/detail-member"
            component={DetailProjectMember}
          />
          {/* Resource */}
          <Route path="/dashboard/resource" component={ResourcePage} />
          {/* Profile */}
          <Route path="/dashboard/profile/my-profile" component={Profile} />
          <Route
            path="/dashboard/profile/change-password"
            component={ChangePasswordPage}
          />
          {/* =========================MANAGER=============================== */}
          {/* Project */}
          <Route path="/dashboard/project/list" component={ProjectListPage} />
          <Route path="/dashboard/project/add" component={AddProject} />
          <Route path="/dashboard/project/detail" component={UpdateProject} />
          {/* Employee */}
          <Route
            exact
            path="/dashboard/project/personal-management"
            component={PersonnelManagementPage}
          />
          <Route
            path="/dashboard/project/personal-management/details"
            component={PersonnelDetails}
          />
          <Route
            path="/dashboard/project/view-project-joined"
            component={ViewProjectJoinedPage}
          />
          {/* =====================================ADMIN============================= */}
          {/* list member */}
          <Route path="/dashboard/admin/employee" component={EmployeePage} />
          <Route
            path="/dashboard/admin/detail-member"
            component={DetailMember}
          />
          {/* update new password */}
          <Route
            path="/dashboard/admin/update-new-password"
            component={UpdateNewPasswordPage}
          />
          {/* add new member */}
          <Route
            path="/dashboard/admin/add-new-member"
            component={AddNewMemberPage}
          />
          {/* Group */}
          <Route path="/dashboard/admin/group" component={GroupsList} />
          <Route path="/dashboard/admin/group-add" component={GroupAdd} />{" "}
          <Route path="/dashboard/admin/group-update" component={GroupUpdate} />
        </Switch>
      </div>
    </div>
  );
};

export default Routes;
