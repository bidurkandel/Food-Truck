import {
  FETCHING_DINER_INFO_START,
  FETCHING_DINER_INFO_SUCCESS,
  FETCHING_DINER_INFO_ERROR,
  SET_FAVORITE_TRUCK_SUCCESS,
  SET_FAVORITE_TRUCK_ERROR,
  FETCHING_TRUCKS_START,
  FETCHING_TRUCKS_SUCCESS,
  FETCHING_TRUCKS_ERROR,
  ADD_TRUCK_RATING_SUCCESS,
  ADD_TRUCK_RATING_ERROR,
  ADD_MENU_RATING_SUCCESS,
  ADD_MENU_RATING_ERROR,
} from "../actions";

const initialState = {
  isFetching: false,
  error: "",
  userInfo: {
    dinerId: 10001,
    username: "john",
    email: "john@john.com",
    password: "1234",
    currentLocation: "SD",
    favoriteTrucks: [],
  },
  trucks: [],
};

export const diner = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TRUCKS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_TRUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trucks: action.payload,
        error: "",
      };
    case FETCHING_TRUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case FETCHING_DINER_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_DINER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        error: "",
      };
    case FETCHING_DINER_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case SET_FAVORITE_TRUCK_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favoriteTrucks: [...action.payload],
        },
      };

    case SET_FAVORITE_TRUCK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_TRUCK_RATING_SUCCESS:
      return {
        ...state,
        trucks: state.trucks.map((truck) => {
          let temp = truck;
          if (action.payload.truckId === truck.id) {
            let AvgRating = 0;
            temp.customerRatings = action.payload.data.map((rating) => {
              AvgRating += rating.customerRating;
              return rating.customerRating;
            });
            temp.customerRatingsAvg = Math.round(
              AvgRating / temp.customerRatings.length
            );
          }
          return temp;
        }),
      };
    case ADD_TRUCK_RATING_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_MENU_RATING_SUCCESS:
      return {
        ...state,
        trucks: state.trucks.map((truck) => {
          let temp = truck;
          if (action.payload.truckId === truck.id) {
            temp.menu = truck.menu.map((menu) => {
              let tempMenu = menu;
              if (action.payload.menuItemId === menu.id) {
                let AvgRating = 0;
                tempMenu.customerRatings = action.payload.data.map((rating) => {
                  AvgRating += rating.customerRating;
                  return rating.customerRating;
                });
                tempMenu.customerRatingsAvg = Math.round(
                  AvgRating / tempMenu.customerRatings.length
                );
              }
              return tempMenu;
            });
          }
          return temp;
        }),
      };
    case ADD_MENU_RATING_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
