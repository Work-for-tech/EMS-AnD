import axios from "axios";

export const getAccess = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/access/get/${id}`
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

export const addAccess = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/access/add",
      data
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

export const removeAccess = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/access/remove",
      data
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
