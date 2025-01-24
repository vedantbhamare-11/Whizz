import axiosInstance from "../../lib/axiosInstance";

// Toggle opening
const toggleOpeningApi = async (isOpen: boolean) => {
    console.log(isOpen);
    try {
        const response = await axiosInstance.put('/vendor/toggleOpening', { isOpen });
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error);
    };
};

export { toggleOpeningApi };