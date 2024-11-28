import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { clearLocalUserData, setLocalUserData } from "../helpers/LocalStorage";
import { parseToken } from "../helpers/parseToken";

const GoogleLoginPage = () => {
  const [params] = useSearchParams();
  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    if (accessToken && refreshToken) {
      const data = parseToken(accessToken);
      setLocalUserData(data?.user_id, accessToken, refreshToken);
      navigate("/home", { replace: true });
    } else {
      clearLocalUserData();
      setLoginFailed(true);
    }
  }, [accessToken, refreshToken, navigate]);

  if (loginFailed) {
    return (
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Typography variant="h2" component={"div"}>
            Đăng nhập Thất Bại
          </Typography>
          <Box className="flex justify-center items-center gap-10">
            <Typography>Quay về trang đăng nhập</Typography>
            <Link to={"/login"}>Click tại đây</Link>
          </Box>
        </Box>
      </Box>
    );
  }


  return null;
};

export default GoogleLoginPage;
