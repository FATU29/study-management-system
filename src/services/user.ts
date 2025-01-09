import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";

export type UpdateUserContent = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
};

export const updateUserAPI = async (content: UpdateUserContent) => {
  try {
    const { accessToken } = getLocalUserData();
    const url = API_ROUTE.USERS + "/update-profile";
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...content,
        dateOfBirth: content.dateOfBirth
          ? `${content.dateOfBirth.getFullYear()}/${(
              content.dateOfBirth.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${content.dateOfBirth
              .getDate()
              .toString()
              .padStart(2, "0")}`
          : null,
      }),
    });
    if (!response.ok) {
      console.log(
        "Error in updateUserAPI: ",
        JSON.stringify(await response.json())
      );
      throw new Error("Cập nhật thông tin thất bại");
    }
    return true;
  } catch (error: any) {
    console.log("Error in updateUserAPI: ", error.message);
    throw error;
  }
};
