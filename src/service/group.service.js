import axios from "../config/axiosConfig";
// import { getAuthToken } from "../config/localStore";

const API_LIST = {
  groupListAPI: "/member/getgrouplist",
  getMemberInGroupAPI: "/member/getmemberingroup",
  getMemberInGroupAdminAPI: "member/getMemberInGroupAdmin",
  getRoleListAPI: "project/GetAllProjectRoles",
  addGroupAPI: "member/addgroup",
  editGroupAPI: "member/editgroup",
};

const GroupService = {
  async listGroup() {
    return axios.get(API_LIST.groupListAPI);
  },
  async listRole() {
    return axios.get(API_LIST.getRoleListAPI);
  },
  async getMemberInGroup(prarams, date, search) {
    return axios.get(API_LIST.getMemberInGroupAPI, {
      params: { idGroup: prarams, month: date, searchkey: search },
    });
  },
  async getMemberInGroupAdmin(prarams) {
    return axios.get(API_LIST.getMemberInGroupAdminAPI, {
      params: { idGroup: prarams },
    });
  },
  async addNewGroup(params) {
    return axios.post(API_LIST.addGroupAPI, params);
  },
  async editGroup(params) {
    return axios.post(API_LIST.editGroupAPI, params);
  },
};

export default GroupService;
