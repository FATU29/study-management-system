import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "../services/auth";
import Spinner from "../helpers/Spinner";
import CustomModalAlert from "../components/CustomModalAlert";
import { clearLocalUserData } from "../helpers/LocalStorage";
// import { Resolver } from "dns";
// import { link } from "fs";
// import useTheme from "@mui/material";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Mật khẩu mới là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});

const ResetPassword = () => {
  const quotes = [
    "Học hỏi là chìa khóa mở ra cánh cửa thành công",
    "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới",
    "Đầu tư vào kiến thức mang lại lợi nhuận tốt nhất",
    "Học tập không có giới hạn về tuổi tác",
    "Tri thức là sức mạnh",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isOpenModelAlert, setIsOpenModalAlert] = useState<boolean>(false);
  const [bodyContent, setBodyContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [quotes.length]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const { isPending, isError,isSuccess,mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: resetPasswordAPI,
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    mutate(data, {
      onError: () => {
        setIsOpenModalAlert(true);
        setBodyContent("Thay đổi mật khẩu thất bại !");
      },
      onSuccess: () => {
        setIsOpenModalAlert(true);
        clearLocalUserData();
        setBodyContent("Thay đổi mật khẩu thành công.");
      },
    });
  };

  return (
    <>
      {isPending && <Spinner />}
      {(isError || isSuccess) && (
        <CustomModalAlert
          headerTitle="Thông Báo"
          bodyContent={bodyContent}
          isOpen={isOpenModelAlert}
          setIsOpen={setIsOpenModalAlert}
          doOk={() => {
            setIsOpenModalAlert(false)
            if(!isError){
                navigate("/login",{replace:true})
            }
          }}
        />
      )}
      <div className="flex items-center justify-center bg-white min-h-100 p-4">
        {/* Fixed height container */}
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="w-full max-w-4xl h-[600px] flex flex-col md:flex-row bg-white rounded-lg overflow-hidden"
        >
          {/* Left side - fixed height with internal scrolling if needed */}
          <div className="w-full md:w-1/2 bg-blue-500 flex flex-col overflow-hidden">
            {/* Top section with fixed content */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold text-white">
                  QUẢN LÝ HỌC TẬP
                </h1>
              </div>
            </div>

            {/* Middle section with logo and quote - fixed height */}
            <div className="flex-grow flex flex-col items-center justify-center px-8">
              <div className="w-32 h-32 mb-8">
                <img
                  className="w-full h-full object-contain"
                  src="https://placehold.co/200"
                  alt="Logo nhóm"
                />
              </div>

              {/* Quote container with fixed height */}
              <div className="h-24 flex items-center justify-center">
                <div
                  className={`transition-opacity duration-500 ${
                    fadeIn ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-xl font-bold text-white text-center">
                    {quotes[currentQuoteIndex]}
                  </h2>
                </div>
              </div>
            </div>

            {/* Bottom section with fixed content */}
            <div className="p-8">
              <p className="text-white mb-4 text-center">
                Tham gia ngay - Dễ dàng - Miễn phí.
              </p>
              <div className="flex justify-center space-x-2">
                {quotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - fixed height with internal scrolling if needed */}
          <div className="w-full md:w-1/2 overflow-y-auto flex flex-col justify-center items-center">
            <div className="p-8 w-[85%]">
              <h2 className="text-2xl font-bold mb-6">Đặt lại mật khẩu</h2>
              <p className="mb-8 text-sm text-gray-600 justify-normal">
                Nhập mật khẩu mới cho tài khoản của bạn.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-4">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        label="Mật khẩu mới"
                        variant="outlined"
                        fullWidth
                        type="password"
                      />
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        label="Xác nhận mật khẩu mới"
                        variant="outlined"
                        fullWidth
                        type="password"
                      />
                    )}
                  />
                </div>

                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  className="mb-4 top-10"
                  variant="contained"
                >
                  ĐẶT LẠI MẬT KHẨU
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
