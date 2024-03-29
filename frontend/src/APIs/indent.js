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

export const getBulkIndentById = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/indent/getonebulkindent/${id}`
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

export const getAllBulkIndent = async () => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/indent/getbulkindent`
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

export const getIndentbyClientProject = async (clientId, projectId) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/indent/getindents/${clientId}/${projectId}`
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

export const getIndentbyProjectId = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/indent/getindent/${id}`
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

export const updateDiscount = async (data) => {
  try {
    const response = await axios.post(
      `inverntoryManagment/api/v1/public/indent/updatediscount`,
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

export const updateBulkDiscount = async (data) => {
  try {
    const response = await axios.post(
      `inverntoryManagment/api/v1/public/indent/updatebulkdiscount`,
      data
    );
    return {
      type: "success",
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Network Error",
    };
  }
};
