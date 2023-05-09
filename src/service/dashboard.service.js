import axios from "../config/axiosConfig";
// import { getAuthToken } from "../config/localStore";

const API_LIST = {
  dashboardAPI: "dashboard",
};

const DashboardService = {
  async dashboardList() {
    return axios.get(API_LIST.dashboardAPI);
  },
};

export default DashboardService;
