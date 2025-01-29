import axiosInstance from "../../lib/axiosInstance";

// Signin
const signinApi = async (email: string, password: string) => {
  try {
    // Make API request
    const response = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });
    return response.data.data;
  } catch (error: any) {
    throw error.response.data.message;
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
   return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

const logOutApi = async () => {
  try {
    // Make API request
    const response = await axiosInstance.post("/auth/signout");
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export { signinApi, signupApi, logOutApi };
