import axios from "axios";

export const weatherDate = async (token: string | null) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ADDRESS}alldiary`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
