import axios from "axios";

export const addIssues = async (data) => {
  try {
    console.log(data);

    const response = await axios.post(
      "inverntoryManagment/api/v1/public/issue/addissue",
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

export const getIssues = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/issue/getissuelist"
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
