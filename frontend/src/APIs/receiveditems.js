import axios from "axios";

export const createRecievedItem = async (item) => {
    try {
        const response = await axios.post(
            "inverntoryManagment/api/v1/public/receiveditem/create/",
            item
        );
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