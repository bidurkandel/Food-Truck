import {axiosWithAuth} from "../utils/axiosWithAuth";

export const FETCHING_OPERATORS_START = "FETCHING_OPERATORS_START";
export const FETCHING_OPERATORS_SUCCESS = "FETCHING_OPERATORS_SUCCESS";
export const FETCHING_OPERATORS_ERROR = "FETCHING_OPERATORS_ERROR";
export const SET_OPERATOR_INFO = "SET_OPERATOR_INFO";
export const FETCHING_TRUCKS_START = "FETCHING_TRUCKS_START";
export const FETCHING_TRUCKS_SUCCESS = "FETCHING_TRUCKS_SUCCESS";
export const FETCHING_TRUCKS_ERROR = "FETCHING_TRUCKS_ERROR";
export const ADD_TRUCK = "ADD_TRUCK";
export const UPDATE_TRUCK = "UPDATE_TRUCK";
export const REMOVE_TRUCK = "REMOVE_TRUCK";
export const ADD_MENUITEM = "ADD_MENUITEM";
export const UPDATE_MENUITEM = "UPDATE_MENUITEM";
export const REMOVE_MENUITEM = "REMOVE_MENUITEM";

export const fetchOperatorData = (id) => (dispatch) => {
  dispatch({type: FETCHING_OPERATORS_START});

  axiosWithAuth()
    .get(`/api/operators/${id}`)
    .then((res) => {
      dispatch({
        type: FETCHING_OPERATORS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err);
      dispatch({type: FETCHING_OPERATORS_ERROR, payload: err.message});
    });
};

export const addTruck = (addTruck) => (dispatch) => {
  axiosWithAuth()
    .post("/api/trucks", addTruck)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ADD_TRUCK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateTruck = (truckId, selectTruck) => (dispatch) => {
  axiosWithAuth()
    .put(`/api/trucks/${truckId}`, selectTruck)
    .then((res) => {
      console.log("SR: UpdateTruckForm.js: submit sucess: res: ", res.data);

      dispatch({
        type: UPDATE_TRUCK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error("SR: UpdateTruckForm.js: submit failed: err ", err.message);
    });
};

export const removeTruck = (id, selectTruck) => (dispatch) => {
  axiosWithAuth()
    .delete(`/api/trucks/${id}`, selectTruck)
    .then((res) => {
      dispatch({
        type: REMOVE_TRUCK,
        payload: id,
      });
    })
    .catch((err) => console.error(err.message));
};

export const addMenuItem = (id, menuItem) => (dispatch) => {
  axiosWithAuth()
    .post(`/api/trucks/${id}/menu`, menuItem)
    .then((res) => {
      dispatch({
        type: ADD_MENUITEM,
        payload: {data: res.data, truckId: id},
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateMenuItem = (truckId, menuItemId, selectItem) => (
  dispatch
) => {
  axiosWithAuth()
    .put(`/api/trucks/${truckId}/menu/${menuItemId}`, selectItem)
    .then((res) => {
      dispatch({
        type: UPDATE_MENUITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const removeMenuItem = (truckId, menuItemId) => (dispatch) => {
  axiosWithAuth()
    .delete(`/api/trucks/${truckId}/menu/${menuItemId}`)
    .then((res) => {
      dispatch({
        type: REMOVE_MENUITEM,
        payload: {truckId: truckId, menuItemId: menuItemId},
      });
    })
    .catch((err) => console.error(err.message));
};

export const FETCHING_DINER_INFO_START = "FETCHING_DINER_INFO_START";
export const FETCHING_DINER_INFO_SUCCESS = "FETCHING_DINER_INFO_SUCCESS";
export const FETCHING_DINER_INFO_ERROR = "FETCHING_DINER_INFO_ERROR";

export const SET_FAVORITE_TRUCK_SUCCESS = "SET_FAVORITE_TRUCK_SUCCESS";
export const SET_FAVORITE_TRUCK_ERROR = "SET_FAVORITE_TRUCK_ERROR";

export const ADD_TRUCK_RATING_SUCCESS = "ADD_TRUCK_RATING_SUCCESS";
export const ADD_TRUCK_RATING_ERROR = "ADD_TRUCK_RATING_ERROR";

export const ADD_MENU_RATING_SUCCESS = "ADD_MENU_RATING_SUCCESS";
export const ADD_MENU_RATING_ERROR = "ADD_MENU_RATING_ERROR";

export const fetchDinerInfo = (userId) => (dispatch) => {
  dispatch({type: FETCHING_DINER_INFO_START});
  axiosWithAuth()
    .get(`/api/diners/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: FETCHING_DINER_INFO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FETCHING_DINER_INFO_ERROR,
        payload: err.data,
      });
    });
};

export const fetchTruckData = () => (dispatch) => {
  dispatch({type: FETCHING_TRUCKS_START});
  axiosWithAuth()
    .get("/api/trucks")
    .then((res) => {
      dispatch({
        type: FETCHING_TRUCKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err);
      dispatch({type: FETCHING_TRUCKS_ERROR, payload: err.message});
    });
};

export const addFavoriteTruck = (userId, truckId) => (dispatch) => {
  axiosWithAuth()
    .post(`/api/diners/${userId}/favoriteTrucks`, {
      truckId: truckId,
    })
    .then((res) => {
      console.log(
        "AC: actions/index.js: settingFavoriteTruck: axios.then: ",
        res
      );
      dispatch({
        type: SET_FAVORITE_TRUCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err);
      dispatch({type: SET_FAVORITE_TRUCK_ERROR, payload: err.message});
    });
};

export const deleteFavoriteTruck = (userId, truckId) => (dispatch) => {
  console.log(truckId);
  axiosWithAuth()
    .delete(`/api/diners/${userId}/favoriteTrucks`, {
      truckId: truckId,
    })
    .then((res) => {
      console.log(
        "AC: actions/index.js: settingFavoriteTruck: axios.then: ",
        res
      );
      dispatch({
        type: SET_FAVORITE_TRUCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err);
      dispatch({
        type: SET_FAVORITE_TRUCK_ERROR,
        payload: err.message,
      });
    });
};

export const addTruckRating = (truckId, dinerId, customerRating) => (
  dispatch
) => {
  axiosWithAuth()
    .post(`/api/trucks/${truckId}/customerRatings/${dinerId}`, {
      customerRating: customerRating,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_TRUCK_RATING_SUCCESS,
        payload: {data: res.data, truckId: truckId},
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_TRUCK_RATING_ERROR,
        payload: err.message,
      });
    });
};

export const addMenuRating = (truckId, menuItemId, dinerId, customerRating) => (
  dispatch
) => {
  axiosWithAuth()
    .post(
      `/api/trucks/${truckId}/menu/${menuItemId}/customerRatings/${dinerId}`,
      {
        customerRating: customerRating,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_MENU_RATING_SUCCESS,
        payload: {data: res.data, truckId: truckId, menuItemId: menuItemId},
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_MENU_RATING_ERROR,
        payload: err.message,
      });
    });
};
