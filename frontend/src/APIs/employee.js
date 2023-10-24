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