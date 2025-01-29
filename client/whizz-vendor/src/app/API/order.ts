import axiosInstance from "../../lib/axiosInstance";

// Function to fetch orders
const fetchOrdersApi = async () => {
    try {
        const response = await axiosInstance.get('/vendor/orders');
        return response.data
    } catch (error :any) {
    throw error.response.data.message;   
    }
}

// Update order status
const updateOrder = async (whizzOrderId: string, status: string) => {
    try {
        const response = await axiosInstance.put('/vendor/updateOrder', { whizzOrderId, status });
        return response.data
    } catch (error: any) {
        throw error.response.data.message
    }
}

export { fetchOrdersApi, updateOrder }