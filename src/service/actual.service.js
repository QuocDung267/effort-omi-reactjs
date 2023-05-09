import axios from "../config/axiosConfig";

const API_LIST = {
  getActualTimeAPI: "/registerproject/getactualtimerecord",
  updateActualTime: "/registerproject/updaterecord",
  addActualTime: "registerproject/InsertRecord",
  getListActualTime: "RegisteredActualTime/getlistactualrecord",
  deleteActualTime: "registeredactualtime/deleterecord",
};

const ActualTimeService = {
  async getActualTime(params) {
    return axios.post(API_LIST.getActualTimeAPI, params);
  },
  async updateActualTime(params) {
    return axios.post(API_LIST.updateActualTime, params);
  },
  async addActualTime(params) {
    return axios.post(API_LIST.addActualTime, params);
  },
  async getListActualTime(params) {
    return axios.post(API_LIST.getListActualTime, params);
  },
  async deleteActualTime(params) {
    return axios.post(API_LIST.deleteActualTime, params);
  },
};

export default ActualTimeService;
