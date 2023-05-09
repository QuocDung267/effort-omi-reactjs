import axios from "../config/axiosConfig";
// import { getAuthToken } from "../config/localStore";

const API_LIST = {
  projectListAPI: "myproject/getprojectlist",
  porjectDetailAPI: "myproject/getProjectDetails/",
  addProjectAPI: "project/AddNewProject",
  editInforProjectAPI: "project/editprojectinfo/",
  addMemberInProjectAPI: "project/AddNewMember/",
  updateMemberInProjectAPI: "project/UpdateMember/",
  projectListByEmailAPI: "myproject/GetUserProjectList/",
};

const ProjectService = {
  async listProject(prarams, search) {
    return axios.get(API_LIST.projectListAPI, {
      params: { month: prarams, searchkey: search },
    });
  },
  async projectDetail(params) {
    return axios.get(`${API_LIST.porjectDetailAPI}${params}`);
  },
  async addProject(params) {
    return axios.post(API_LIST.addProjectAPI, params);
  },
  async editInforProject(id, params) {
    return axios.post(`${API_LIST.editInforProjectAPI}${id}`, params);
  },
  async addMemberInProject(id, params) {
    return axios.post(`${API_LIST.addMemberInProjectAPI}${id}`, params);
  },
  async updateMemberInProject(id, params) {
    return axios.post(`${API_LIST.updateMemberInProjectAPI}${id}`, params);
  },
  async projectListByEmail(params) {
    return axios.get(`${API_LIST.projectListByEmailAPI}${params}`);
  },
};

export default ProjectService;
