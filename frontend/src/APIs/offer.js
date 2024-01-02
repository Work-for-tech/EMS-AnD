import axios from "axios";

export const addOffers = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/offer/add",
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

export const getOneOffer = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/offer/getOffer/${id}`
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

export const finalProjects = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/offer/finalprojects",
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

export const getOffers = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/offer/getOffers"
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

export const offerSubComponent = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/offerSubComponent/add",
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

export const getOneOfferSubComponent = async (id) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/offerSubComponent/getOne/${id}`
    );

    console.log(response.data);
    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const offerSubComponentGetAll = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/offerSubComponent/getAll"
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

export const offerSubComponentUpdate = async (data, id) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/offerSubComponent/update/${id}`,
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

export const offerComponent = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/offerComponent/add",
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

export const offerStatusUpdate = async (data, id) => {
  try {
    const response = await axios.post(
      `inverntoryManagment/api/v1/public/offer/updateStatus/${id}`,
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
