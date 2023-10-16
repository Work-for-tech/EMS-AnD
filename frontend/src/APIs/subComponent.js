import axios from "axios";

export const postSubComponents = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/subcomponent/add",
      data
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

export const getSubComponents = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/subcomponent/all"
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

export const getOneSubComponent = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/subcomponent/get/${id}`
    );

    console.log(response.data);

    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    console.log(err)
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const getOneSubComponentByDesc = async (desc) => {
  try {
    const response = await axios.post(
      `inverntoryManagment/api/v1/public/subcomponent/getOne`,
      desc
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
