import axiosInstance from "../../lib/axiosInstance";

// Function to fetch menu items
const fetchMenuApi = async (searchTerm: string, currentPage: number, itemsPerPage: number) => {
    try {
        // Make API request
        const response = await axiosInstance.get(`/vendor/dishes?searchTerm=${searchTerm}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
        
        // Handle response
        if (response.data.success){
            return response.data.data
        } else {
         throw new Error(response.data.message)
        };
    } catch (error) {
        console.log(error)
    }
};

// Function to add a new dish
const addDishApi = async (dishData: any) => {
    const formData = new FormData();

    formData.append('dishName', dishData.dishName);
    formData.append('price', dishData.price);
    formData.append('description', dishData.description);
    formData.append('category', dishData.category);
    formData.append('subcategory', dishData.subcategory);
    formData.append('startTime', dishData.startTime);
    formData.append('endTime', dishData.endTime);
    formData.append('image', dishData.image);
    dishData.availableDays.map((day: string) => formData.append('availableDays[]', day));

    try {
        const response = await axiosInstance.post('/vendor/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

       return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

// Update a dish 
const updateDishApi = async (dishData: any) => {
    const formData = new FormData();

    formData.append('dishId', dishData._id);
    formData.append('dishName', dishData.dishName);
    formData.append('price', dishData.price);
    formData.append('description', dishData.description);
    formData.append('category', dishData.category);
    formData.append('subcategory', dishData.subcategory);
    formData.append('startTime', dishData.startTime);
    formData.append('endTime', dishData.endTime);
    formData.append('image', dishData.image);
    dishData.availableDays.map((day: string) => formData.append('availableDays[]', day));

    try {
        const response = await axiosInstance.put('/vendor/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data
    } catch (error: any) {
        throw error.response.data.message;
    }
};

// Toggle availability of a dish
const toggleDishAvailabilityApi = async (dishId: string, availability: boolean) => {
    try {
        const response = await axiosInstance.put('/vendor/toggleDishAvailability', { dishId, availability });
       return response.data
    } catch (error: any) {
        throw error.response.data.message;
    };
};

// Manage dish category
const manageCategory = async (dishId: string, category: string) => {
    try {
        const response = await axiosInstance.put('/vendor/manageCategory', { dishId, category });
       return response.data
    } catch (error: any) {
        throw error.response.data.message;
    };
};

// Get subcategories
const getSubcategories = async () => {
    try {
        const response = await axiosInstance.get('/vendor/subcategories');
        return response.data
    } catch (error: any) {
        throw error.response.data.message;
    }
};

// Manage dish subcategory
const manageSubcategory = async (dishId: string, subcategory: string) => {
    try {
        const response = await axiosInstance.put('/vendor/manageSubcategory', { dishId, subcategory });
        return response.data
    } catch (error: any) {
        throw error.response.data.message;
    };
};

// Add subcategory
const addSubcategory = async (subcategory: string) => {
    try {
        const response = await axiosInstance.post('/vendor/addSubcategory', { subcategory });
        return response.data
    } catch (error: any) {
        throw error.response.data.message;
    }
}

// Delete dish
const deleteDishApi = async (dishId: string) => {
    try {
        const response = await axiosInstance.delete(`/vendor/delete/${dishId}`);
        return response.data
    } catch (error: any) {
        throw error.response.data.message;
    };
};

export { fetchMenuApi, addDishApi, updateDishApi, toggleDishAvailabilityApi, manageCategory, getSubcategories, manageSubcategory, addSubcategory, deleteDishApi };