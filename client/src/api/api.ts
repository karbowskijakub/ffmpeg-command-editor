import axios from "axios";
import url from "./server-connect";

export const checkEmail = async (email: string) => {
    try {
      await axios.post(`${url}/checkEmailExists`, { email });
      return true;
    } catch {
      return false;
    }
  };

  export const postRegister = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    terms: boolean;
  }) => {
    const response = await axios.post(`${url}/register`, data);
    return response.data;
  };

  export const postLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${url}/login`, data, {
        params: {
          useCookies: true,
        },
        withCredentials: true,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            throw new Error("Invalid email or password. Please try again."); 
          } else if (status === 403) {
            throw new Error("Your account is not confirmed. Please check your email for confirmation."); 
          } else if (status === 429) {
            throw new Error("Too many login attempts. Please wait a moment and try again."); 
          } else {
            throw new Error("An error occurred while logging in. Please try again later."); 
          }
        } else {
          throw new Error("An unexpected error occurred. Please check your connection and try again."); 
        }
      } else {
        throw new Error("An unexpected error occurred. Please try again later."); 
      }
    }
  };


  export const sendResetPasswordEmail = async (data: { email: string }) => {
    const emailRequest = {
      email: data.email,
    };
    const response = await axios.post(`${url}/forgotPassword`, emailRequest);
    return response.data;
  };
  
