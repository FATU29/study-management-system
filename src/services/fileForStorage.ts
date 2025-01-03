import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";
// import { IFile } from "../types/resourceType";

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
      // return data.data as IFile[];
      return data.data;
    }
    throw new Error(JSON.stringify(data));
  } catch (error: any) {
    console.log("Error in addFileAPI: ", error.message);
    throw error;
  }
};

// ------------------- The APIs below may be un-used -------------------

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
    return data;
  } catch (error: any) {
    console.log("Error in getLimitsAPI: ", error.message);
    throw error;
  }
};

// Get user's personal files in the drive
export const getPersonalFilesAPI = async (sourceId: string) => {
  try {
    const url = `${API_ROUTE.FILES}/get-personal-files?${sourceId}`;
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

export const deleteFileAPI = async (fileId: string) => {
  console.log('Deleting file:', fileId);
  try {
    const url = `${API_ROUTE.FILES}/delete`;
    const { accessToken } = getLocalUserData();
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ fileId }),
    });
    console.log("response body", response.body);
    if (!response.ok) {
      throw new Error("Failed to delete file");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error in deleteFileAPI: ", error.message);
    throw error;
  }
};
