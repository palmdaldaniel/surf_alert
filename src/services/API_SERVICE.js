import axios from "axios";

export const API_SERVICE = (baseURL) =>
  axios.create({
    baseURL,
  });
