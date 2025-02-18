import axiosInstance from "../../lib/axiosInstance";

// Complete profile
const completeProfileApi = async (
    vendorData: any,
  ) => {
      const formData = new FormData();
  
      formData.append('vendorName', vendorData.vendorName);
      formData.append('vendorLogo', vendorData.vendorLogo);
      formData.append('address', vendorData.address);
      formData.append('vendorPhone', vendorData.vendorPhone);
      formData.append('area', vendorData.area);
      formData.append('restaurantType', vendorData.restaurantType);
      formData.append('startTime', vendorData.startTime);
      formData.append('endTime', vendorData.endTime);
      formData.append('gst', vendorData.gst);
      formData.append('latitude', vendorData.latitude);
      formData.append('longitude', vendorData.longitude);
      vendorData.availableDays.map((day: string) => formData.append('availableDays[]', day));
      
    try {
      // Make API request
      const response = await axiosInstance.post("/vendor/completeProfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
};

// Edit profile
const editProfileApi = async (
    vendorData: any,
  ) => {
      const formData = new FormData();
  
      formData.append('vendorName', vendorData.vendorName);
      formData.append('vendorLogo', vendorData.vendorLogo);
      formData.append('address', vendorData.address);
      formData.append('vendorPhone', vendorData.vendorPhone);
      formData.append('area', vendorData.area);
      formData.append('restaurantType', vendorData.restaurantType);
      formData.append('startTime', vendorData.startTime);
      formData.append('endTime', vendorData.endTime);
      formData.append('gst', vendorData.gst);
      formData.append('latitude', vendorData.latitude);
      formData.append('longitude', vendorData.longitude);
      vendorData.availableDays.map((day: string) => formData.append('availableDays[]', day));
      
    try {
      // Make API request
      const response = await axiosInstance.post("/vendor/completeProfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

// Toggle opening
const toggleOpeningApi = async (isOpen: boolean) => {
    try {
        const response = await axiosInstance.put('/vendor/toggleOpening', { isOpen });
        if (response.data.success){
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log(error);
    };
};

export { completeProfileApi, toggleOpeningApi, editProfileApi };