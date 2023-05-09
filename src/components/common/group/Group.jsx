import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import { receiveGroupAction } from "../../../redux/common/commonAction";
import GroupService from "../../../service/group.service";
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

const Group = ({ handleClick, groupItem, receiveGroupAction }) => {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [mounted, setMounted] = useState(true);
  const processDataToTable = (group) => {
    const groupList = [];
    console.log(group);
    const serverGroupList = group.data;
    serverGroupList.forEach((item) => {
      const group = {
        idGroup: item.idGroup,
        groupName: item.groupName,
      };
      groupList.push(group);
    });
    receiveGroupAction(groupList);
    return groupList;
  };

  useEffect(() => {
    if (mounted) {
      GroupService.listGroup().then((res) => {
        processDataToTable(res.data);
        console.log(res.data);
      });
    }
    return () => setMounted(false);
  });

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  //loc `none` ra khoi lisgroup
  const tmp = groupItem.filter((group) => group.groupName !== "none");
  return (
    <FormControl
      variant="standard"
      className={classes.formControl}
      color="primary"
    >
      <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={code}
        onChange={handleChange}
        onClick={handleClick}
        label="Project Code"
        type="text"
      >
        <MenuItem value="all">all</MenuItem>
        {tmp.map((item) => (
          <MenuItem key={item.idGroup} value={item.idGroup}>
            {item.idGroup}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveGroupAction: (group) => dispatch(receiveGroupAction(group)),
});

const mapStateToProps = (state) => ({
  groupItem: state.common.group,
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
