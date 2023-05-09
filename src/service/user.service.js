import axios from "../config/axiosConfig";
const API_LIST = {
  loginAPI: "/user/login",
  changePasswordAPI: "/user/changepassword",
  listMemberAPI: "/member/getmemberlistAdmin",
  editInfoMemberAPI: "/member/editmemberAdmin",
  userListAPI: "member/getmemberlistMN",
  addMemberAPI: "user/addMember",
  updatePasswordAPI: "user/UpdatePasswordMember",
  userInforAPI: "user/getuserprofile/",
  useProfileAPI: "user/profile",
};

const UserService = {
  async login(params) {
    return axios.post(API_LIST.loginAPI, params);
  },
  async userList(prarams) {
    return axios.get(API_LIST.userListAPI, {
      params: { searchkey: prarams },
    });
  },
  async changePassword(params) {
    return axios.post(API_LIST.changePasswordAPI, params);
  },
  async addMember(params) {
    return axios.post(API_LIST.addMemberAPI, params);
  },
  async updatePasswordMember(params) {
    return axios.post(API_LIST.updatePasswordAPI, params);
  },
  async userInfor(params) {
    return axios.get(`${API_LIST.userInforAPI}${params}`);
  },
  async listMember(prarams) {
    return axios.get(API_LIST.listMemberAPI, {
      params: { searchkey: prarams },
    });
  },
  async editInfoMember(params) {
    return axios.post(API_LIST.editInfoMemberAPI, params);
  },
  async userProfile() {
    return axios.get(API_LIST.useProfileAPI);
  },
};

export default UserService;
