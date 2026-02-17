import API from "./api";

export const checkIn = async () => {
  const response = await API.post("/attendance/checkin");
  return response.data;
};

export const checkOut = async () => {
  const response = await API.post("/attendance/checkout");
  return response.data;
};
