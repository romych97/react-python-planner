import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchData = async () => {
  const response = await api.get("/");
  return response.data;
};
