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

export const deleteComponent = async (id) => {
  try {
    const response = await axios.delete(
      `inverntoryManagment/api/v1/public/component/delete/${id}`
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

export const updateComponent = async (id, data) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/component/update/${id}`,
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
