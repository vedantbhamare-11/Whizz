import axiosInstance from "../../lib/axiosInstance";

// Function to fetch orders
const fetchOrdersApi = async () => {
    try {
        const response = await axiosInstance.get('/vendor/orders');
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

// Update order status
const updateOrder = async (whizzOrderId: string, status: string) => {
    try {
        const response = await axiosInstance.put('/vendor/updateOrder', { whizzOrderId, status });
        console.log(response.data.data);
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

export { fetchOrdersApi, updateOrder }