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

  export const postCommand = async (data: {
    postName: string;
    postContent: string;
  }) => {
    const response = await axios.post(`${url}/CommandPost`, data,{
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
  };


  export const deleteCommand = async (id) => {
    try {
      const response = await axios.delete(`${url}/CommandPost/${id}`, {
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
    } catch (error) {
      throw new Error(error)
    }
  };

  export const updateCommand = async (data: {
    id: string;
    userId: string;
    postName: string;
    postContent: string;
  }) => {
    const { id } = data; 
    const response = await axios.put(`${url}/CommandPost/${id}`, data, {
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
  };


  export const getAllCommands = async () => {
    const response = await axios.get(`${url}/CommandPost`, {
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
  
