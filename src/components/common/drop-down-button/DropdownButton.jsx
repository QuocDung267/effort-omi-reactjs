import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { projectCodeSelectedAction } from "../../../redux/common/commonAction";
import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import moment from "moment";
import { receiveProjectAction } from "../../../redux/project/project.action";
import ProjectService from "../../../service/project.service";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    backgroundColor: "white",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropdownButton = ({
  content,
  projectCodeSelectedAction,
  projectID,
  receiveProjectAction,
  handleClick,
}) => {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [mounted, setMounted] = useState(true);

  const processDataToTable = (project) => {
    const projectList = [];
    const serverProjectList = project.data;
    serverProjectList.forEach((item) => {
      const project = {
        actualTime: item.actualTime,
        idProject: item.idProject,
        description: item.description,
        start: moment(item.start).format("MMMM D, YYYY"),
        finish: moment(item.finish).format("MMMM D, YYYY"),
        cost: item.cost,
        status: item.status,
        type: item.type,
        name: item.projectName,
      };
      projectList.push(project);
    });
    receiveProjectAction(projectList);
    return projectList;
  };

  useEffect(() => {
    if (mounted) {
      ProjectService.listProject()
        .then((res) => {
          processDataToTable(res.data);
        })
        .catch((err) => console.log(err));
    }
    return () => setMounted(false);
  });

  const handleChange = (event) => {
    console.log("Aloassdfsdfsdf: ", event.target.value);
    setCode(event.target.value);
    projectCodeSelectedAction(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      className={classes.formControl}
      color="primary"
    >
      <InputLabel id="demo-simple-select-outlined-label">{content}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={code}
        onChange={handleChange}
        onClick={handleClick}
        label="Project Code"
        type="text"
      >
        {projectID.map((item) => (
          <MenuItem key={item.idProject} value={item.idProject}>
            {item.idProject}
            {` (${item.status})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapDispatchToProps = (dispatch) => ({
  projectCodeSelectedAction: (projectcode) =>
    dispatch(projectCodeSelectedAction(projectcode)),
  receiveProjectAction: (project) => dispatch(receiveProjectAction(project)),
});

const mapStateToProps = (state) => ({
  projectID: state.project.projectItem,
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownButton);
