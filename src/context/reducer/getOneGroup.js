import { GET_ONE_GROUP } from "../action/actionType";

const getOneGroup = (state = null, action) => {
  switch (action.type) {
    case GET_ONE_GROUP:
      return (state = action.payload);
    default:
      return state;
  }
};

export default getOneGroup;
