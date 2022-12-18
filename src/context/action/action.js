import {
  SIGN_IN,
  SIGN_OUT,
  RELOAD,
  TEACHER_INFO,
  GET_STUDENTS,
  GET_ONE_STUDENT,
  GET_GROUPS,
  GET_TEACHERS,
  GET_ONE_GROUP
} from "./actionType";

export const authAction = (payload) => {
  return { type: SIGN_IN, payload };
};

export const logOutAction = () => {
  return { type: SIGN_OUT };
};

export const reloadAction = () => {
  return { type: RELOAD };
};

export const teacherInfoAction = (payload) => {
  return { type: TEACHER_INFO, payload };
};

export const getStudentsAction = (payload) => {
  return { type: GET_STUDENTS, payload };
};

export const getOneStudentAction = (payload) => {
  return { type: GET_ONE_STUDENT, payload };
};

export const getGroupsAction = (payload) => {
  return { type: GET_GROUPS, payload };
};

export const getOneGroupAction = (payload) => {
  return {type: GET_ONE_GROUP, payload}
}

export const getTeachersAction = (payload) => {
  return { type: GET_TEACHERS, payload };
};
