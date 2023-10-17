import axios from "axios";

export const createGRN = async (grn) => {
    try {
        const response = await axios.post(
            `inverntoryManagment/api/v1/public/grn/create`,
            grn,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
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
            message: err.message,
        };
    }
}

export const getGRN = async () => {
    try {
        const response = await axios.get(
            `inverntoryManagment/api/v1/public/grn/all`
        );
        return {
            type: "success",
            data: response.data,
        };
    } catch (err) {
        return {
            type: "error",
            message: err.message,
        };
    }
}

export const createGRNApproval = async (data) => {
    try {
        const response = await axios.post(
            `inverntoryManagment/api/v1/public/grn/approval/pending/create`,
            data,
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
            message: err.message,
        };
    }
}

export const getGRNApproval = async (data ) => {
    try {
        const response = await axios.post(
            `inverntoryManagment/api/v1/public/grn/approval/pending/get`,
            data
        );
        return {
            type: "success",
            data: response.data,
        };
    } catch (err) {
        return {
            type: "error",
            message: err.message,
        };
    }
}