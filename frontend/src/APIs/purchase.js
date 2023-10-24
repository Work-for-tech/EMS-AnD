import axios from "axios";

export const createPurchase = async (purchase) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/purchase",
      purchase
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

export const purchaseList = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/purchase/"
    );
    console.log(response);

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

export const getPurchaseList = async (id) => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/purchase/" + id
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

export const getParticularPurchase = async (id) => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/purchase/particularList/" + id
    );
    console.log(response);

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

export const sendMail = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/purchase/sendmail",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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

export const getPurchaseSubComponent = async (id) => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/receiveditem/get/" + id,
    );
    console.log(response);
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

export const updatePurchaseAPI = async (id, data) => {
  console.log(id, data);
  try {
    const response = await axios.put(
      "inverntoryManagment/api/v1/public/purchase/" + id,
      data
    );
    console.log(response);
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

}