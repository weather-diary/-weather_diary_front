import axios from "axios";
import { JoinProps } from "../types/Join";

export const createMember = async (join: JoinProps) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}create/member`,
      join
    );
    return response.data;
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
};
