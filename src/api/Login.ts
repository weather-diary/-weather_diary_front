import axios from "axios";
import { LoginProps } from "../types/Login";

export const login = async (login: LoginProps) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}signin`,
      login
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
