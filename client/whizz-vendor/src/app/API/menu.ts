import axiosInstance from "../../lib/axiosInstance";

// Function to fetch menu items
const fetchMenuApi = async () => {
    try {
        // Make API request
        const response = await axiosInstance.get('/vendor/dishes');
        
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

        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error)
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

        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
};

// Toggle availability of a dish
const toggleDishAvailabilityApi = async (dishId: string, availability: boolean) => {
    try {
        const response = await axiosInstance.put('/vendor/toggleDishAvailability', { dishId, availability });
        
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error);
    };
};

// Manage dish category
const manageCategory = async (dishId: string, category: string) => {
    try {
        const response = await axiosInstance.put('/vendor/manageCategory', { dishId, category });
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error);
    };
};

// Delete dish
const deleteDishApi = async (dishId: string) => {
    try {
        const response = await axiosInstance.delete(`/vendor/delete/${dishId}`);
        if (response.data.success){
            return response.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error);
    };
};

export { fetchMenuApi, addDishApi, updateDishApi, toggleDishAvailabilityApi, manageCategory, deleteDishApi };