import axios from "axios";

export const createVendor = async (vendor) => {
  try {
    console.log(vendor);
    const response = await axios.post(
      `inverntoryManagment/api/v1/public/vendor/addvendor`,
      vendor
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

export const getVendors = async () => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/vendor/getvendor`
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

export const getOneVendor = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/vendor/vendor/${id}`
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

export const updateVendor = async (id, vendor) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/vendor/vendor/${id}`,
      vendor
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

export const deleteVendor = async (id) => {
  try {
    const response = await axios.delete(
      `inverntoryManagment/api/v1/public/vendor/vendor/${id}`
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
