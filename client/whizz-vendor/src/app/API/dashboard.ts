import axiosInstance from "../../lib/axiosInstance";

// Function to fetch dashboard data
const fetchDashboardCountsApi = async () => {
    try {
        // Make API request
        const response = await axiosInstance.get('/vendor');

        // Handle response
        if (response.data.success){
            return response.data.data
        } else {
         throw new Error(response.data.message)   
        }
    } catch (error) {
        console.log(error)
    };
};

export { fetchDashboardCountsApi };