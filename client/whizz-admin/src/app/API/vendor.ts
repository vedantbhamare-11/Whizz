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

// Manage vendor opening
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

// Manage vendor category
const changeCategory = async (vendorId: string, category: string) => {
    console.log(vendorId, category);
    try {
        const response = await axiosInstance.put('/admin/changeCategory', {
            vendorId,
            category,
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

export { fetchVendorsApi, manageOpening, changeCategory };