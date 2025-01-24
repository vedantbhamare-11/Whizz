import axiosInstance from "../../lib/axiosInstance";

// Signin
const signinApi = async (email: string, password: string) => {
  try {
    // Make API request
    const response = await axiosInstance.post("/auth/signin", {
      email,
      password,
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

// Signup
const signupApi = async (vendorEmail: string, vendorPassword: string) => {
  try {
    // Make API request
    const response = await axiosInstance.post("/auth/signup", {
      vendorEmail,
      vendorPassword,
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

export { signinApi, signupApi, completeProfileApi };
