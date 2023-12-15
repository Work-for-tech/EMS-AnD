import axios from "axios";

export const PostProduction = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/prod",
      data
    );

    console.log(response.data);

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

export const getProductionByProjectId = async (projectId) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/prod/${projectId}`
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

export const updateProduction = async (data) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/prod/update`,
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
