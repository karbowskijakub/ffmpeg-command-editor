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

  export const checkIsLoggedIn = (): boolean => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('.AspNetCore.Identity.Application=')) {
        const value = cookie.split('=')[1]; 
        if (value) {
          return true;
        }
      }
    }
    return false;
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
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            throw new Error("INVALID_CREDENTIALS"); 
          } else if (status === 403) {
            throw new Error("ACCOUNT_NOT_CONFIRMED"); 
          } else if (status === 429) {
            throw new Error("Too many login attempts. Please wait a moment and try again."); 
          } else {
            throw new Error("GENERAL_ERROR"); 
          }
        } else {
          throw new Error("An unexpected error occurred. Please check your connection and try again."); 
        }
      } else {
        throw new Error("UNEXPECTED_ERROR"); 
      }
    }
  };

  export const postLogout = async () => {
    const response = await axios.post(
      `${url}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };


  export const sendResetPasswordEmail = async (data: { email: string }) => {
    const emailRequest = {
      email: data.email,
    };
    const response = await axios.post(`${url}/forgotPassword`, emailRequest);
    return response.data;
  };
  
