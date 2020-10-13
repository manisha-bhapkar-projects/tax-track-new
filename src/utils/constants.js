const API_URL = process.env.REACT_APP_API_URL;

export default {
  API: {
    BASEURL: {
      URL: API_URL,
    },
    FILE_UPLOAD: {
      ZIPFILE: "/admin/tasks/",
    },
    LOGIN: {
      SIGNUP: "/admin/auth/login",
      LOGOUT: "/admin/auth/logout",
      REFRESH_TOKEN: "/admin/auth/token",
    },
    STAFF: {
      LIST: "/admin/staff",
      ADD: "/admin/staff",
    },
    USERS: {
      LIST: "/admin/client",
      DETAILS: "/admin/tasks/listByuser/",
    },
    CLIENT: {
      LIST: "/admin/client",
      ADD: "/admin/client",
    },
    COMMON: {
      UPLOAD: "/admin/common/upload",
    },
    TASK: {
      LIST: "/admin/tasks",
      DETAILS: "/admin/tasks/",
      TASK_DETAIL:'/admin/tasks/details/',
      FILES: "/admin/tasks/1",
      UPDATE_TASK_STATUS: "/admin/tasks/taskstatus",
      UPDATE_ASSIGN: "/admin/tasks/assignto",
    },
    DASHBORD: {
      GET: "/admin/common/dashboard",
    },
    DASHBOARD: {
      CARD_DATA: "/admin/common/dashboard",
    },
    MODEL: {
      LIST: "/admin/tasks/completion_data_types",
    },
    PROFILE: {
      CHAT: "/admin/chathistory/",
      LIST: "/admin/chatlist",
      NOTIFICATION: "/admin/noti",
    },
    CONTACT_US:{
      LIST:'/admin/contactus'
    }
  },
  REGEX_PATTERN: {
    NUMBER: /^[0-9][0-9]*([.][0-9]{2}|)$/,
  },
  STORAGE: {
    AUTH: {
      TOKEN: "tax-trak-admin-auth-token",
      REF_TOKEN: "tax-trak-admin-refresh-token",
      ADMIN_DATA: "tax-trak-admin-admin-data",
    },
  },
  ROUTE: {
    LOGIN: {
      LOGIN: "/",
      FORGOT_PASSWORD: "/forgotPassword",
    },
    SIDEBAR: {
      DASHBORD: "/dashboard",
      USERS: "/users",
      TASKS: "/tasks",
      STAFFS: "/staffs",
      ADD_CLIENT_USER: "/add-client",
      ADD_STAFF_USER: "/add-Staff-User",
      MESSAGES: "/messages",
      CONTACT_US:'/contact-us'
    },
    DASHBORD: {
      VIEW: "/users/userDetails",
      VIEW_BY_ID: "/users/:id",
    },
    USER: {
      VIEW: "/users/",
      VIEW_BY_ID: "/users/:id",
    },
    TASKS: {
      VIEW: "/tasks/:id",
      VIEW_BY_ID: "/tasks/",
      EDIT:"/tasks/edit/:id",
      EDIT_VIEW_BY_ID: "/tasks/edit/",
    },
  },
};
