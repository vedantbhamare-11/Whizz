import axiosInstance from "@/lib/axiosInstance";

// Fetch dashboard data
const fetchDashboardApi = async () => {
    try {
        const response = await axiosInstance.get('/admin');
        
        if(response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    };
};

export {
    fetchDashboardApi
};