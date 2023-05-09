import HomeIcon from "@material-ui/icons/Home";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DetailsIcon from "@material-ui/icons/Details";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

const listItem = [
  {
    title: "Home",
    icon: <HomeIcon />,
    isOpen: false,
    role: "member",
    isManager: "FALSE",
    pages: [
      {
        title: "Ominext's Projects",
        href: "/dashboard/home/my-project",
        icon: <InsertDriveFileIcon />,
        isActive: false,
      },
      {
        title: "Regision Project",
        href: "/dashboard/home/registion-project",
        icon: <AddCircleOutlineIcon />,
        isActive: false,
      },
      {
        title: "Project Actual Time",
        href: "/dashboard/home/projects-actual-time",
        icon: <AccessAlarmIcon />,
        isActive: false,
      },
    ],
  },
  {
    title: "Resource",
    role: "member",
    icon: <AssignmentIcon />,
    isOpen: false,
    isManager: "FALSE",
    pages: [
      {
        title: "Resource Detail",
        href: "/dashboard/resource",
        icon: <DetailsIcon />,
        isActive: false,
      },
    ],
  },
  {
    title: "Profile",
    role: "member",
    icon: <AccountBoxIcon />,
    isOpen: false,
    isManager: "FALSE",
    pages: [
      {
        title: "My Profile",
        href: "/dashboard/profile/my-profile",
        icon: <PermIdentityIcon />,
        isActive: false,
      },
      {
        title: "Change Password",
        href: "/dashboard/profile/change-password",
        icon: <LockIcon />,
        isActive: false,
      },
    ],
  },
  {
    title: "Project",
    isManager: "TRUE",
    icon: <LibraryBooksOutlinedIcon />,
    isOpen: false,
    pages: [
      {
        title: "Project List",
        href: "/dashboard/project/list",
        icon: <ListAltIcon />,
        isActive: false,
      },
      {
        title: "Add project",
        href: "/dashboard/project/add",
        icon: <LockIcon />,
        isActive: false,
      },
    ],
  },
  {
    title: "Employees",
    isManager: "TRUE",
    icon: <PersonIcon />,
    isOpen: false,
    pages: [
      {
        title: "List of members",
        href: "/dashboard/project/personal-management",
        icon: <PeopleAltIcon />,
        isActive: false,
      },
    ],
  },
  {
    title: "Management",
    role: "admin",
    icon: <PersonIcon />,
    isOpen: false,
    pages: [
      {
        title: "Employee",
        href: "/dashboard/admin/employee",
        icon: <PeopleAltIcon />,
        isActive: false,
      },
      {
        title: "Update New Password",
        href: "/dashboard/admin/update-new-password",
        icon: <LockIcon />,
        isActive: false,
      },
      {
        title: "Add New Member",
        href: "/dashboard/admin/add-new-member",
        icon: <PersonAddIcon />,
        isActive: false,
      },
      {
        title: "Group",
        href: "/dashboard/admin/group",
        icon: <GroupWorkIcon />,
        isActive: false,
      },
    ],
  },
];

export default listItem;
