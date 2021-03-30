import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem('Token')

  return axios.create({
    baseURL: "https://food-truck-trackr-api.herokuapp.com",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
