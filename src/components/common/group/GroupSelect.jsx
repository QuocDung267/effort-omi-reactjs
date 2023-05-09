import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { receiveGroupAction } from "../../../redux/common/commonAction";
import GroupService from "../../../service/group.service";

const GroupSelect = ({
  groupItem,
  receiveGroupAction,
  handleCheckedChange,
}) => {
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

  return (
    <FormGroup row>
      {groupItem.map((item) => (
        <FormControlLabel
          key={item.idGroup}
          control={
            <Checkbox
              value={item.idGroup}
              onChange={handleCheckedChange}
              name="group"
            />
          }
          label={item.groupName}
        />
      ))}
    </FormGroup>
  );
};

const mapDispatchToProps = (dispatch) => ({
  receiveGroupAction: (group) => dispatch(receiveGroupAction(group)),
});

const mapStateToProps = (state) => ({
  groupItem: state.common.group,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelect);
