import api from "./api.js";

//returns an array of the clients to load it on the main view
export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data;
};

export const addClient = async (newClient) => {
  const response = await api.post("/clients", newClient);
  return response.data;
};

//mainly to extend the membership of the client
export const updateClient = async (clientId) => {
  const response = await api.put(`/clients/${clientId}`);
  return response.data;
};

//its just gonna be a soft delete, not really a full object deletion
export const deleteClient = async (clientId) => {
  const response = await api.delete(`/clients/${clientId}`);
  return response.data;
};
