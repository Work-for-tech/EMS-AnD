import axios from "axios";

export const getclients = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/client/getClient"
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const addClient = async (client) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/client/addClient",
      client
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/client/client/${id}`
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};
