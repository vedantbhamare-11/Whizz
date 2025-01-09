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

// Function to calculate time ago
const convertTime = (time: string) => {
    const currentTime = new Date().getTime();
    const orderTime = new Date(time).getTime();
    const timeDifference = Math.abs(currentTime - orderTime); // Difference in milliseconds

    // Convert milliseconds to a readable format
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
};

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

export { fetchOrdersApi, convertTime, updateOrder }