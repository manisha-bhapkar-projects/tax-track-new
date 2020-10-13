import constants from "../constants";
import Users from "../../Pages/Users/Users";
import Tasks from "../../Pages/Tasks/Tasks";
import Staffs from "../../Pages/Staffs/Staffs";
import AddClientUser from "../../Pages/AddClientUser/AddCilentUser";
import AddStaffUser from "../../Pages/AddStaffUser/AddStaffUser";
import Messages from "../../Pages/Messages/Messages";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import UserDetails from "../../Pages/UserDetails/UserDetails";
import CilentIncomeDetail from "../../Pages/ClientIncomeDetail/CilentIncomeDetail";
import ContactUS from "../../Pages/ContactUS/ContactUS";

export const adminSideBarRoutes = [
  {
    title: "Home",
    path: constants.ROUTE.SIDEBAR.DASHBORD,
    icon: "metismenu-icon pe-7s-home",
    cName: "nav-text",
    childrens: [],
    component: Dashboard,
    sidebar: true,
  },

  {
    title: "Users",
    path: constants.ROUTE.SIDEBAR.USERS,
    icon: "metismenu-icon pe-7s-user",
    cName: "nav-text",
    childrens: [],

    component: Users,
    sidebar: true,
  },
  {
    title: "Tasks",
    path: constants.ROUTE.SIDEBAR.TASKS,
    icon: "metismenu-icon pe-7s-note2",
    cName: "nav-text",
    childrens: [],
    component: Tasks,
    sidebar: true,
  },
  {
    title: "Staffs",
    path: constants.ROUTE.SIDEBAR.STAFFS,
    icon: "metismenu-icon pe-7s-users",
    cName: "nav-text",
    childrens: [],
    component: Staffs,
    sidebar: true,
  },
  {
    title: "Add Client",
    path: constants.ROUTE.SIDEBAR.ADD_CLIENT_USER,
    icon: "metismenu-icon pe-7s-add-user",
    cName: "nav-text",
    childrens: [],

    component: AddClientUser,
    sidebar: true,
  },
  {
    title: "Add Staff User",
    path: constants.ROUTE.SIDEBAR.ADD_STAFF_USER,
    icon: "metismenu-icon pe-7s-users",
    cName: "nav-text",
    childrens: [],

    component: AddStaffUser,
    sidebar: true,
  },
  {
    title: "ContactUs",
    path: constants.ROUTE.SIDEBAR.CONTACT_US,
    icon: "metismenu-icon pe-7s-call",
    cName: "nav-text",
    childrens: [],
    component: ContactUS,
    sidebar: true,
  },
  {
    title: "Messages",
    path: constants.ROUTE.SIDEBAR.MESSAGES,
    icon: "metismenu-icon pe-7s-chat",
    cName: "nav-text",
    childrens: [],
    component: Messages,
    sidebar: true,
  },

  {
    title: "",
    icon: "",
    cName: "",
    childrens: [],
    path: constants.ROUTE.USER.VIEW_BY_ID,
    component: UserDetails,
    sidebar: false,
  },

  {
    title: "",
    icon: "",
    cName: "",
    childrens: [],
    path: constants.ROUTE.TASKS.VIEW,
    component: CilentIncomeDetail,
    sidebar: false,
  },
];

export const staffSideBarRoutes = [
  {
    title: "Home",
    path: constants.ROUTE.SIDEBAR.DASHBORD,
    icon: "metismenu-icon pe-7s-home",
    cName: "nav-text",
    childrens: [],
    component: Dashboard,
    sidebar: true,
  },

  {
    title: "Users",
    path: constants.ROUTE.SIDEBAR.USERS,
    icon: "metismenu-icon pe-7s-user",
    cName: "nav-text",
    childrens: [],

    component: Users,
    sidebar: true,
  },
  {
    title: "Tasks",
    path: constants.ROUTE.SIDEBAR.TASKS,
    icon: "metismenu-icon pe-7s-note2",
    cName: "nav-text",
    childrens: [],
    component: Tasks,
    sidebar: true,
  },

  {
    title: "Messages",
    path: constants.ROUTE.SIDEBAR.MESSAGES,
    icon: "metismenu-icon pe-7s-chat",
    cName: "nav-text",
    childrens: [],
    component: Messages,
    sidebar: true,
  },

  {
    title: "",
    icon: "",
    cName: "",
    childrens: [],
    path: constants.ROUTE.USER.VIEW_BY_ID,
    component: UserDetails,
    sidebar: false,
  },

  {
    title: "",
    icon: "",
    cName: "",
    childrens: [],
    path: constants.ROUTE.TASKS.VIEW,
    component: CilentIncomeDetail,
    sidebar: false,
  },
];
