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

export { signinApi, signupApi };
