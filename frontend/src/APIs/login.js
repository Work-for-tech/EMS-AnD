import axios from "axios";

export const login = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/login",
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

export const verify = async () => {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    console.log(headers);
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/login/verify",
      {},
      { headers: headers }
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
