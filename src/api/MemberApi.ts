import axios from "axios";
import { JoinProps, LoginProps } from "../types/MemberTypes";

export const createMember = async (join: JoinProps) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}create/member`,
      join
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data);
    }
  }
};

export const login = async (login: LoginProps) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}signin`,
      login
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data);
    }
  }
};

export const DeleteMember = async (
  userId: string,
  password: string,
  token: string | null
) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ADDRESS}delete/member`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId,
          password,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data);
    }
  }
};
