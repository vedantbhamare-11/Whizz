import axiosInstance from "@/lib/axiosInstance";

// Fetch vendor details
const fetchVendorsApi = async () => {
    try {
        const response = await axiosInstance.get('/admin/vendors')

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        };
    } catch (error) {
        console.log(error);
    };
};

const manageOpening = async (vendorId: string, isOpen: boolean) => {
    try {
        const response = await axiosInstance.put('/admin/manageOpenings', {
            vendorId,
            isOpen,
        });

        if(response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        };
    } catch (error) {
        console.log(error);
    };
};

export { fetchVendorsApi, manageOpening };