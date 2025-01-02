import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";

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
      return data.data;
    }
    throw new Error(JSON.stringify(data));
  } catch (error: any) {
    console.log("Error in addFileAPI: ", error.message);
    throw error;
  }
};