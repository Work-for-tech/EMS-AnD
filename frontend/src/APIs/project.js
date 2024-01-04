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

    console.log(response);

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

export const finishingDetails = async (data) => {
  try {
    const response = await axios.put(
      "inverntoryManagment/api/v1/public/project/finishingdetails",
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

export const projectComplete = async (data) => {
  try {
    const response = await axios.put(
      "inverntoryManagment/api/v1/public/project/projectComplete",
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

export const getCompleteDetails = async (data) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/project/getCompleteDetails/${data}`
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
