import STATUS_CODE from "http-status";
import { showSnackBarAlert } from "./utils";
const handleApiError = (err) => {
  const HTTPdata = err.response.data;

  switch (err.response.status) {
    case STATUS_CODE.UNAUTHORIZED:
      // window.location.replace("/auth/logout");
      showSnackBarAlert(5000, "error", HTTPdata.message);
      break;
    case STATUS_CODE.PRECONDITION_FAILED:
      showSnackBarAlert(5000, "error", HTTPdata.message);
      break;
    case STATUS_CODE.BAD_REQUEST:
      showSnackBarAlert(5000, "error", HTTPdata.message);
      break;
    case STATUS_CODE.FORBIDDEN:
      showSnackBarAlert(5000, "error", HTTPdata.message);
      break;
    case STATUS_CODE.NOT_FOUND:
      showSnackBarAlert(5000, "error", HTTPdata.message);
      break;
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      showSnackBarAlert(5000, "error", "SERVER ERROR");
      break;
    default:
      showSnackBarAlert(5000, "error", +HTTPdata.message);
      break;
  }
  return HTTPdata;
};

export default handleApiError;
