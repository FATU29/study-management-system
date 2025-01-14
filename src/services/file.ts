import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";
import { IFile } from "../types/resourceType";
import { FileLimitsResponse } from "./typeForService/resourceType";

export const getFileAPI = async (
  fileId: string,
  sourceId?: string,
  inline?: boolean
) => {
  try {
    const url = `${API_ROUTE.FILES}/download/?fileId=${fileId}${
      sourceId ? "&sourceId=" + sourceId : ""
    }${inline ? "&inline=true" : ""}`;
    const { accessToken } = getLocalUserData();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch file: " + response.statusText);
    }
    return response;
  } catch (error: any) {
    console.log("Error in getFileAPI: ", error.message);
    throw error;
  }
};

export const uploadFileAPI = async (formData: FormData, sourceId?: string) => {
  try {
    const url = `${API_ROUTE.FILES}/upload${
      sourceId ? `?sourceId=${sourceId}` : ""
    }`;
    const { accessToken } = getLocalUserData();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": `multipart/form-data; boundary=${formData}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    const data = await response.json();
    if (data && Array.isArray(data.data)) {
      return data.data as IFile[];
    }
    throw new Error(JSON.stringify(data));
  } catch (error: any) {
    console.log("Error in addFileAPI: ", error.message);
    throw error;
  }
};

export const getLimitsAPI = async () => {
  try {
    const url = `${API_ROUTE.FILES}/limits`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch limits");
    }
    const data = await response.json();
    return data as FileLimitsResponse;
  } catch (error: any) {
    console.log("Error in getLimitsAPI: ", error.message);
    throw error;
  }
};

/**
 * Only files owned by its uploader can be deleted this way
 */
export const deleteFileAPI = async (fileId: string) => {
  try {
    const url = `${API_ROUTE.FILES}/delete?fileId=${fileId}`;
    const { accessToken } = getLocalUserData();
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to delete file: ", JSON.stringify(response));
      throw new Error("Failed to delete file");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error in deleteFileAPI: ", JSON.stringify(error));
    throw error;
  }
};

// ------------------- The APIs below may be un-used -------------------

export const getPersonalFilesAPI = async (sourceId: string) => {
  try {
    const url = `${API_ROUTE.FILES}/personal/${sourceId}`;
    const { accessToken } = getLocalUserData();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch personal files");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error in getPersonalFilesAPI: ", error.message);
    throw error;
  }
};
