import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./styles/index.css";
import ErrorPage from "./components/Error/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import MessagePage from "./pages/MessagePage";
import ModalTestPage from "./pages/ModalTest";
import DashboardPage from "./pages/DashboardPage";
import Main from "./components/Dashboard/Main";
import ResourceUploadDispatcher from "./components/Dashboard/ResourceUploadDispatcher";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UsersVerifyMailPage from "./pages/UsersVerifyMailPage";
import { userVerifyMail, verifyResetPasswordAPI } from "./services/auth";
import GoogleLoginPage from "./pages/GoogleLoginPage";
import NoAccess from "./pages/NoAcess";
import AuthGuard from "./components/Guard/AuthGuard";
import GuestGuard from "./components/Guard/GuestGuard";
import InstanceAxiosProvider from "./contexts/instanceAxios";
import NotificationProvider from "./contexts/NotificationContext";
import MainDrive from "./components/Dashboard/Drive";
import AdminPage from "./pages/AdminPage";
import DetailCoursePage from "./pages/DetailCoursePage";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="page">
      <Routes location={location}>
        <Route
          index
          path="/"
          element={
            <GuestGuard>
              <HomePage />
            </GuestGuard>
          }
        />
        <Route
          path="/home"
          element={
            <AuthGuard roleRequires={["USER", "TEACHER", "ADMIN"]}>
              <NotificationProvider>
                <DashboardPage />
              </NotificationProvider>
            </AuthGuard>
          }
        >
          {/* Change start here! */}
          <Route index element={<Main />} />
          <Route
            path="course-1"
            // element={<MainCourse name="TODO: Do not pass prop here" isAdmin={true} />}
            element={<DetailCoursePage />}
          />
          <Route path="message" element={<MessagePage />} />
          <Route path="modal-test" element={<ModalTestPage />} />
          <Route path="drive" element={<MainDrive />} />
          
          <Route path="course">
            <Route
              path="course-1"
              element={<DetailCoursePage />}
            />
            <Route
              path="upload-resource"
              element={<ResourceUploadDispatcher />}
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestGuard>
              <ForgotPasswordPage />
            </GuestGuard>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestGuard>
              <ResetPassword />
            </GuestGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard roleRequires={["ADMIN"]}>
              <NotificationProvider>
                <AdminPage />
              </NotificationProvider>
            </AuthGuard>
          }
        />
        <Route path="/modal" element={<AdminPage/>} />
        <Route
          path="/users/verify-email"
          element={
            <UsersVerifyMailPage
              pageNext="/login"
              queryKey="verify-register"
              queryFnc={userVerifyMail}
            />
          }
        />
        <Route
          path="/users/reset-password"
          element={
            <UsersVerifyMailPage
              pageNext="/reset-password"
              queryKey="verify-forgotPassword"
              queryFnc={verifyResetPasswordAPI}
            />
          }
        />
        <Route
          path="/no-access"
          element={
            <AuthGuard roleRequires={["USER", "TEACHER"]}>
              <NoAccess />
            </AuthGuard>
          }
        />
        <Route path="/users/oauth/google" element={<GoogleLoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <div className="App">
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "*",
              element: (
                <InstanceAxiosProvider>
                  <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                      <AppContent />
                    </AuthProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </QueryClientProvider>
                </InstanceAxiosProvider>
              ),
            },
          ])}
        />
      </div>
    </ThemeProviderWrapper>
  );
};

export default App;
