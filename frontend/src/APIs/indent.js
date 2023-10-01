import axios from "axios";

export const addIndent = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/indent/addindentusingpid",
      data
    );
    return {
      type: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const addBulkIndent = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/indent/addbulkindent",
      data
    );
    return {
      type: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const getAllIndent = async () => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/indent/getbothindentsdata`
    );
    return {
      type: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};