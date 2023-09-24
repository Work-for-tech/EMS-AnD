import axios from "axios";

export const getDrawingFile = async (fileName) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/drawing/getdrawingfile",
      {
        fileName: fileName,
      },
      {
        responseType: "blob",
      }
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
export const createDrawing = async (data) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("clientId", data.clientId);
    formData.append("projectId", data.projectId);

    const response = await axios.post(
      "inverntoryManagment/api/v1/public/drawing/adddrawing",
      formData,
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
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const getDrawing = async (clientId, projectId) => {
  try {
    const response = await axios.get(
      `inverntoryManagment/api/v1/public/drawing/getdrawing/${clientId}/${projectId}`
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
