import {
  FETCHING_OPERATORS_START,
  FETCHING_OPERATORS_SUCCESS,
  FETCHING_OPERATORS_ERROR,
  ADD_TRUCK,
  UPDATE_TRUCK,
  REMOVE_TRUCK,
  ADD_MENUITEM,
  REMOVE_MENUITEM,
} from "../actions";

const initialState = {
  isFetching: false,
  error: "",
  operatorInfo: {
    operatorId: localStorage.getItem("operatorId"),
    username: "",
    email: "",
    trucksOwned: [{customerRatings: [2, 3, 4]}],
  },
};

export const operator = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_OPERATORS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_OPERATORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        operatorInfo: action.payload,
        error: "",
      };
    case FETCHING_OPERATORS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case ADD_TRUCK:
      return {
        ...state,
        operatorInfo: {
          ...state.operatorId,
          trucksOwned: [...state.operatorInfo.trucksOwned, action.payload],
        },
      };

    case UPDATE_TRUCK:
      return {
        ...state,
        operatorInfo: {
          ...state.operatorInfo,
          trucksOwned: state.operatorInfo.trucksOwned.map((truck) => {
            return truck.id === action.payload.id ? action.payload : truck;
          }),
        },
      };

    case REMOVE_TRUCK:
      return {
        ...state,
        operatorInfo: {
          ...state.operatorInfo,
          trucksOwned: state.operatorInfo.trucksOwned.filter((truck) => {
            return truck.id !== action.payload;
          }),
        },
      };

    case ADD_MENUITEM:
      return {
        ...state,
        operatorInfo: {
          ...state.operatorInfo,
          trucksOwned: state.operatorInfo.trucksOwned.map((truck) => {
            let temp = truck;
            if (truck.id === action.payload.truckId) {
              temp.menu = [...temp.menu, action.payload.data];
            }

            return temp;
          }),
        },
      };

    case REMOVE_MENUITEM:
      return {
        ...state,
        operatorInfo: {
          ...state.operatorInfo,
          trucksOwned: state.operatorInfo.trucksOwned.map((truck) => {
            let temp = truck;
            if (truck.id === action.payload.truckId) {
              temp.menu = truck.menu.filter((menu) => {
                return menu.id !== action.payload.menuItemId;
              });
            }
            return temp;
          }),
        },
      };

    default:
      return state;
  }
};
