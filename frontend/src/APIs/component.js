import axios from "axios";

export const postComponents = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/component/add",
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

export const getComponents = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/component/all"
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

export const getOneComponent = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/component/get/${id}`
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
