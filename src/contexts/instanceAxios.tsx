import axios from "axios";
import { ReactNode } from "react";
import {
  clearLocalUserData,
  getLocalUserData,
  setLocalUserData,
} from "../helpers/LocalStorage";
import { useNavigate } from "react-router-dom";
import { parseToken } from "../helpers/parseToken";
import { useAuth } from "./AuthContext";

interface TProps {
  children: ReactNode;
}

const url = process.env.REACT_APP_BASE_URL;
const instanceAxios = axios.create({ baseURL: url });

const InstanceAxiosProvider = ({ children }: TProps) => {
  const navigate = useNavigate();
  const { logout, setUser } = useAuth();

  instanceAxios.interceptors.request.use(async (config) => {
    const { userData, accessToken, refreshToken } = getLocalUserData();

    if (!accessToken || !refreshToken) {
      clearLocalUserData();
      setUser(null);
      navigate("/login");
      return Promise.reject(new Error("No access or refresh token"));
    }

    if (refreshToken) {
      const parseRefresh = parseToken(refreshToken);

      //*1000 vì s -> ms vì (Date.now() ở ms)
      const isExpired = parseRefresh?.exp ? parseRefresh.exp * 1000 : undefined;
      if (isExpired && Date.now() > isExpired) {
        clearLocalUserData();
        setUser(null);
        await logout();
        return Promise.reject(new Error("refresh token has expired"));
      }
    }

    if (accessToken) {
      const parseAccess = parseToken(accessToken);
      const isExpired = parseAccess?.exp ? parseAccess.exp * 1000 : undefined;
      if (isExpired && Date.now() > isExpired) {
        const api = url + "/api/refresh-token";
        const response = await axios(api,{
          method:"POST",
          data:{
            refreshToken
          }
        });
        const newAccessToken = response.data.data.access_token;
        setLocalUserData(userData || "", newAccessToken, refreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`
      }
    }

    return config;
  });

  return <>{children}</>;
};

export { instanceAxios };
export default InstanceAxiosProvider;
