import { catchError, getToken } from "../components/utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post("/anime/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const uploadAnime = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/anime/create", formData, {
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
export const getUpdateAnime = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/anime/update-anime/" + id,  {
      headers: {
        authorization: "Bearer " + token,
     
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const updateAnimeForm = async (id,formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/anime/update/${id}`,formData,  {
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

export const getAnimes = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/anime/animes?pageNo=${pageNo}&limit=${limit}`,
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
export const deleteAnimes = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(
      `/anime/${id}`,
      {
        headers: {
          authorization: "Bearer " + token,
        
        },
      },
    );

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const searchAnimeForAdmin = async (title) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/anime/search?title=${title}`,
      {
        headers: {
          authorization: "Bearer " + token,
        
        },
      },
    );

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getTopRatedAnime = async (type) => {

  try {
    let endpoint = '/anime/top-rated'
    if(type) endpoint = endpoint + '?type=' + type;
    const { data } = await client(endpoint);
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getLatestUploads = async (type) => {

  try {

    const { data } = await client(`/anime/latest-uploads`);

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getSingleAnime = async (id) => {

  try {

    const { data } = await client(`/anime/single/${id}`);

    return data;
  } catch (error) {
    return catchError(error);
  }
};
