import axios from "axios";

export const postCompanies = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/company/add",
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

export const getCompanies = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/company/all"
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

export const deleteCompanies = async (id) => {
  try {
    const response = await axios.delete(
      `inverntoryManagment/api/v1/public/company/delete/${id}`
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (e) {
    return {
      type: "error",
      data: "Network Error",
    };
  }
};

export const getOneCompany = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/company/get/${id}`
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (e) {
    return {
      type: "error",
      data: "Network Error",
    };
  }
};
