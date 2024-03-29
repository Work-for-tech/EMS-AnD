import axios from "axios";

export const createStoreData = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/store/addtostore",
      data
    );

    console.log(response.status);

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

export const getStoreData = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/store/getstore"
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

export const getStoreDataById = async (data) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/store/getstoredata`,
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
