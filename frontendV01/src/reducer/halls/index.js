const initialState = {
  halls: [],
  hallsWithDiscount: [],
  hallById: [],
};
const hallsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_HALLS":
      return { ...state, halls: payload };

    case "SET_HALLSHasDiscount":
      return { ...state.hallsWithDiscount, hallsWithDiscount: payload };

    case "SET_Hall":
      return { ...state.hallById, hallById: payload };

    case "ADD_HALLS":
      return { ...state, halls: [...state.halls, payload] };

    case "UPDATE_HALLS":
      return {
        ...state,
        halls: state.halls.map((element) => {
          if (payload.id == element.id) {
            return payload;
          }
          return element;
        }),
      };

    case "DELETE_HALLS":
      return {
        ...state,
        halls: state.halls.filter((halls) => {
          return halls.id != payload;
        }),
      };

    default:
      return state;
  }
};
//

export default hallsReducer;

export const setHalls = (halls) => {
  return {
    type: "SET_HALLS",
    payload: halls,
  };
};

export const AddHall = (newHall) => {
  return { type: "ADD_HALLS", payload: newHall };
};

export const updateHalls = (updateHall) => {
  return { type: "UPDATE_HALLS", payload: updateHall };
};

export const deleteHalls = (id) => {
  return { type: "DELETE_HALLS", payload: id };
};

export const setHallsHasDiscount = (halls) => {
  return {
    type: "SET_HALLSHasDiscount",
    payload: halls,
  };
};

export const setHall = (hallById) => {
  return {
    type: "SET_Hall",
    payload: hallById,
  };
};
