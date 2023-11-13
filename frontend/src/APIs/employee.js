import axios from "axios";
export const getEmployeeList = async () => {
  try {
    const response = await axios.get(
      "inverntoryManagment/api/v1/public/employee/getemployee"
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

export const addEmployee = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/employee/addemployee",
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
};

export const updateEmployee = async (data, id) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/employee/employee/${id}`,
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
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(
      `inverntoryManagment/api/v1/public/employee/employee/${id}`
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
