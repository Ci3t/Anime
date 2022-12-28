import { catchError, getToken } from "../components/utils/helper";
import client from "./client";

export const createChar = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/character/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const charSearch = async (query) => {
  const token = getToken();
  try {
    const { data } = await client(`/character/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getCharacters = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/character/characters?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    return catchError(error);
  }
};
