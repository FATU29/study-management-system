import { useNavigate } from "react-router-dom";
import {
  clearLocalUserData,
  getLocalUserData,
  setLocalUserData,
} from "../helpers/LocalStorage";
import { getMeAPI, loginUserAPI, logoutUserAPI, updateProfileAPI } from "../services/auth";
import { TUser } from "../types/userType";
import { AuthValuesType, LoginParams } from "./types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { parseToken, TParseToken } from "../helpers/parseToken";

type Props = {
  children: ReactNode;
};

const defaultProvider: AuthValuesType = {
  user: null,
  loadingInAuth: false,
  setUser: () => null,
  updateProfile: () => Promise.resolve(),
  setLoadingInAuth: () => { },
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext<AuthValuesType>(defaultProvider);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TUser | null>(defaultProvider.user);
  const [loadingInAuth, setLoadingInAuth] = useState<boolean>(
    defaultProvider.loadingInAuth
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getMeChange = async () => {
      const { accessToken } = getLocalUserData();
      if (!accessToken) return;
      setLoadingInAuth(true);
      await getMeAPI()
        .then((response) => {
          setUser(response?.data);
        })
        .catch(() => {
          setLoadingInAuth(false);
          clearLocalUserData();
          navigate("/login", { replace: true });
        })
      setLoadingInAuth(false);
    };
    getMeChange();
  }, []);


  const handleLogin = async (params: LoginParams) => {
    setLoadingInAuth(true);
    await loginUserAPI(params).then((reponse) => {
      const data = reponse.data;
      const { accessToken, refreshToken } = data.result;
      const payload: TParseToken | undefined = parseToken(accessToken);
      setUser(data.user)
      setLocalUserData(payload?.user_id, accessToken, refreshToken);
      if (data.user.role === "USER") {
        navigate("/home");
      } else if (data.user.role === "ADMIN") {
        navigate("/admin");
      }
    }).catch((error) => {
      throw new Error("Lỗi đăng nhập");
    }).finally(() => {
      setLoadingInAuth(false);
    });


  };

  const handleLogout = async () => {
    setLoadingInAuth(true);
    await logoutUserAPI().then(() => {
      setUser(null);
      clearLocalUserData();
      navigate("/");
    }).catch((error) => {
      throw error
    })
      .finally(() => {
        setLoadingInAuth(false);
      });

  };

  // const handleUpdateProfile = async (userData: {
  //   firstName: string;
  //   lastName: string;
  //   dateOfBirth?: string;
  //   email: string;
  // }) => {
  //   try {
  //     setLoadingInAuth(true);

  //     const response = await updateProfileAPI(userData);

  //     // Update local user state with new data
  //     setUser(prevUser => ({
  //       ...prevUser,
  //       ...response.data
  //     }));

  //     return response.data;
  //   } catch (error) {
  //     console.error('Profile update failed:', error);
  //     throw error;
  //   } finally {
  //     setLoadingInAuth(false);
  //   }
  // };

  const handleUpdateProfile = async (userData: {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    email: string;
  }) => {
    // Make API call to update profile
    // Assuming updateProfileAPI is a function that makes the API call
    await updateProfileAPI(userData);

    // Update the user state
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const values: AuthValuesType = {
    user,
    loadingInAuth,
    setUser,
    updateProfile: handleUpdateProfile,
    setLoadingInAuth,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};



//   return (
//     <AuthContext.Provider
//       value={{
//         loadingInAuth,
//         user,
//         updateProfile: handleUpdateProfile,
//         setLoadingInAuth,
//         setUser,
//         logout: handleLogout,
//         login: handleLogin,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };



export const useAuth = (): AuthValuesType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;
