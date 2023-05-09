export const updateMemberInUpdateProjectPage = (projectMembers, newMember) => {
  const data = [...projectMembers];
  const tmp = projectMembers.find((item) => item.email === newMember.email);
  const index = projectMembers.indexOf(tmp);
  if (index !== -1) {
    data[index] = {
      ...data[index],
      email: newMember.email,
      planEffort: newMember.planEffort,
      idRole: newMember.idRole,
    };
    return data;
  }
  return data;
};
export const updateMemberInAddProjectPage = (projectMembers, newMember) => {
  const data = [...projectMembers];
  const tmp = projectMembers.find((item) => item.email === newMember.email);
  const index = projectMembers.indexOf(tmp);
  if (index !== -1) {
    data[index] = newMember;
    return data;
  }
  return data;
};

export const addMember = (projectMembers, newMember) => {
  const existingMember = projectMembers.find(
    (item) => item.email === newMember.email
  );

  if (existingMember) {
    return [...projectMembers];
  }

  return [...projectMembers, { ...newMember }];
};
