import axiosInstance from "../../lib/axiosInstance";

const fetchDashboardCounts = async () => {
    try {
        const response = await axiosInstance.get('/vendor');
        console.log(response.data.success)
        if (response.data.success){
            return response.data.data
        } else {
         throw new Error(response.data.message)   
        }
    } catch (error) {
        console.log(error)
    };
};

export { fetchDashboardCounts }