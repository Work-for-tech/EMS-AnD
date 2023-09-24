import axios from "axios";

export const getProjects = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/project/getProjects",
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

export const addProject = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/project/add",
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

export const getAllProjects = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/project/getAll"
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

export const changeProjectStatus = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/project/changeProjectStatus",
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
