import api from "./api";

export const getEmployeeDashboard = async (token) => {
  const response = await api.get("/dashboard/employee", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getManagerDashboard = async (token) => {
  const response = await api.get("/dashboard/manager", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
