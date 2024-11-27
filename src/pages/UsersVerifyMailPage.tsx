import { Box, Typography } from "@mui/material";
import IconifyIcon from "../components/utils/icon";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../helpers/Spinner";

interface TUserVerifyMail {
  queryFnc: (token: string) => Promise<any>;
  queryKey: string | string[];
  pageNext:string
}

const UsersVerifyMailPage = (props: TUserVerifyMail) => {
  const [searchParams] = useSearchParams();
  const verifyEmail = searchParams.get("token");
  const [anouncment, setAnouncment] = useState<string>("");
  const [number, setNumber] = useState<number>(10);
  const navigate = useNavigate();
  const { queryFnc, queryKey,pageNext } = props;

  const { isFetching: isFetchOfVerify, status: statusOfVerify, data, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFnc(String(verifyEmail)),
    enabled: !!verifyEmail,
    retry: false, 
  });

  useEffect(() => {

    if (statusOfVerify === "success") {
      setAnouncment("Xác thực thành công");
    } else if (statusOfVerify === "error") {
      setAnouncment("Xác thực thất bại");
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      }
    }
  }, [statusOfVerify, data, error]);

  useEffect(() => {
    if (!statusOfVerify || statusOfVerify === "pending") return;

    const timer = setInterval(() => {
      setNumber((prev) => {
        if (prev < 1) {
          navigate(pageNext, { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [statusOfVerify, navigate]);

  const isError = statusOfVerify === "error"; 

  return (
    <>
      {isFetchOfVerify && <Spinner />}
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
          className="flex flex-col justify-center items-center gap-3"
        >
          <IconifyIcon
            icon={isError ? "icon-park:error" : "icon-park:success"}
            fontSize={"50px"}
          />
          <Typography variant="h5" component={"div"}>
            {anouncment}
          </Typography>
          <Box className="flex justify-center items-center gap-2">
            <Typography variant="h5" component={"div"}>
              Tự động chuyển về tiếp trang sau {number}s
            </Typography>
            <Typography 
              onClick={() => navigate(pageNext, { replace: true })}  
              className="text-['16px'] underline text-blue-500 cursor-pointer"
            >
              Hoặc nhấp vào link ở đây
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UsersVerifyMailPage;