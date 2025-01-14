import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";
import { ICourseResource, IFile } from "../types/resourceType";
import {
  AddCourseResourceRequestBody,
  UpdateCourseResourceRequestBody,
} from "./typeForService/resourceType";

export const getResourcesAPI = async (slug: string) => {
  try {
    const url = `${API_ROUTE.COURSES}/${slug}/res`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch resources");
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data as ICourseResource[];
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.log("Error in getResourcesAPI: ", error.message);
    throw error;
  }
};

export const getSubmissionsAPI = async (
  slug: string,
  resourceId: string,
  uploaderId?: string
) => {
  try {
    const url = `${API_ROUTE.COURSES}/${slug}/res/submissions/${resourceId}${
      uploaderId ? `?uploaderId=${uploaderId}` : ""
    }`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch submission");
    }

    const data = await response.json();

    if (data && data.data) {
      return data.data as IFile[];
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.log("Error in getSubmissionAPI: ", error.message);
    throw error;
  }
};

export const addResourceAPI = async (
  slug: string,
  uploadBody: AddCourseResourceRequestBody
) => {
  try {
    const url = `${API_ROUTE.COURSES}/${slug}/res/add`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadBody),
    });

    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(JSON.stringify(data.errors));
    }
    console.log("response", response);
    const data = await response.json();

    if (data && data.data.acknowledged) {
      return data.data.insertedId as string;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.log("Error in addResourceAPI: ", error.message);
    throw error;
  }
};

export const deleteResourceAPI = async (slug: string, resourceId: string) => {
  try {
    const url = `${API_ROUTE.COURSES}/${slug}/res/delete/${resourceId}`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete resource");
    }

    const data = await response.json();

    if (data && data.data) {
      return data.data as ICourseResource;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.log("Error in deleteResourceAPI: ", error.message);
    throw error;
  }
};

export const updateResourceAPI = async (
  slug: string,
  resourceId: string,
  updateBody: UpdateCourseResourceRequestBody
) => {
  try {
    const url = `${API_ROUTE.COURSES}/${slug}/res/update/${resourceId}`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBody),
    });

    if (response.status !== 200) {
      throw new Error("Failed to update resource");
    }

    const data = await response.json();

    if (data && data.data) {
      return data.data as ICourseResource;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.log("Error in updateResourceAPI: ", error.message);
    throw error;
  }
};
