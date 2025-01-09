import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconifyIcon from "../utils/icon/index";
import { TUser } from "../../types/userType";
import { toFullName } from "../../helpers/toFullName";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Typography } from "@mui/material";
import ProfileModal from "../Modals/ProfileModal";
import { useNotification } from "../../contexts/NotificationContext";

interface NavbarHomeProps {
  user?: TUser;
}

const formatTime = (time: string | Date) => {
  const date = typeof time === "string" ? new Date(time) : time;
  return date.toLocaleString();
};

const convertRoleToVietnamese = (role: string): string => {
  switch (role) {
    case "USER":
      return "Học sinh";
    case "TEACHER":
      return "Giáo viên";
    case "ADMIN":
      return "Quản trị viên";
    default:
      return "Không xác định";
  }
};

const NavbarHome: React.FC<NavbarHomeProps> = ({
  user = {
    id: "",
    lastName: "",
    firstName: "",
    avatar: "",
    email: "",
    role: "",
  },
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const { notifications, fetchNotifications } = useNotification();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications(); // Re-fetch notifications every 10 seconds
    }, 10000); // Adjust the interval as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fetchNotifications]);

  const unreadNotifications = notifications.filter((noti) => !noti.read);

  const handleViewAllNotifications = () => {
    navigate("/notifications");
    setIsNotificationOpen(false);
  };

  return (
    <nav className="bg-white border-1 border-black-600">
      <div className="flex w-100 justify-content-between m-2">
        {/* Left side: Logo and Page Name */}
        <div className="flex items-center space-x-4 nav-left ml-3">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/moodle.png`}
              alt="Logo"
              className="w-[130px]"
            />
          </a>
          {/* <span className="text-xl font-bold text-blue-600">Moodle</span> */}
          {/* </Link> */}
        </div>

        {/* Right side: User Info and Notifications */}
        <div className="flex align-items-center nav-right mr-8">
          {/* Notification Dropdown */}
          <div className="relative">
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full"
              aria-label="Notifications"
              onClick={toggleNotifications}
            >
              <IconifyIcon
                icon="mdi-light:bell"
                className="h-8 w-8 text-gray-600"
              />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {Math.min(unreadNotifications.length, 99)}
                </span>
              )}
            </button>

            {/* Notification Dropdown Content */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-1 w-96 bg-white border rounded-xl shadow-xl z-20">
                <div className="border-b py-2">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 4).map((notification, index) => (
                      <div
                        key={`${notification.id}-${index}`}
                        className={`px-4 py-2 border-b hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">
                            {notification.title}
                          </span>
                          <span className="text-xs text-gray-500 text-right">
                            {formatTime(notification.time)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1 text-left">
                          {notification.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <button
                    onClick={handleViewAllNotifications}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Xem tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* User Info */}
          <div className="flex items-center space-x-4 nav-item m-2">
            {/* (Rest of the existing user info and dropdown remains the same) */}
            <div className="text-right flex-col">
              <div className="text-xl font-bold text-primary">
                {toFullName(user.firstName || "", user.lastName || "")}
              </div>
              <div className="text-xs text-gray-500 text-green-400">
                {convertRoleToVietnamese(user.role || "")}
              </div>
            </div>
            <div className="relative">
              <img
                id="avatarButton"
                onClick={toggleDropdown}
                src={
                  user?.avatar ||
                  `${process.env.PUBLIC_URL}/assets/avatar/avatar-1.png`
                }
                alt={`${toFullName(
                  user.firstName || "",
                  user.lastName || ""
                )}'s profile`}
                className="h-[45px] w-[45px] rounded-full object-cover border-2 border-blue-600 cursor-pointer"
              />

              <div
                id="dropdownInformation"
                className={`z-10 ${
                  isDropdownOpen ? "" : "hidden"
                } mt-1 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <div
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownInformationButton"
                >
                  <div>
                    <Button>
                      <Typography
                        fontSize={"100%"}
                        style={{ textTransform: "none" }}
                        className="block no-underline px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Bảng tin
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button>
                      <Typography
                        fontSize={"100%"}
                        style={{ textTransform: "none" }}
                        className="block no-underline px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Cài đặt
                      </Typography>
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => setModalIsOpen(true)}>
                      <Typography
                        fontSize={"100%"}
                        style={{ textTransform: "none" }}
                        className="block no-underline px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Thông tin cá nhân
                      </Typography>
                    </Button>
                  </div>
                </div>
                <div className="py-2">
                  <Button>
                    <Typography
                      fontSize={"100%"}
                      style={{ textTransform: "none", color: "red" }}
                      onClick={() => logout()}
                      className="block no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Thoát
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </nav>
  );
};

export default NavbarHome;
