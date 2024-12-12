import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconifyIcon from "../utils/icon/index";
import { TUser } from "../../types/userType";
import { toFullName } from "../../helpers/toFullName";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Typography } from "@mui/material";
import ProfileModal from "../Modals/ProfileModal";

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
}

interface NavbarHomeProps {
  user?: TUser;
  notifications?: Notification[];
}

const NavbarHome: React.FC<NavbarHomeProps> = ({
  user = {
    id: "",
    lastName: "",
    firstName: "",
    avatar: "",
    email: "",
    role: "",
  },
  notifications = [
    {
      id: "1",
      title: "Doctor đã thêm bạn vào lớp CSC100323",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: false
    },
    {
      id: "2",
      title: "CSC100323: Bài tập 1 đã được giao",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: false
    },
    {
      id: "3",
      title: "CSC100323: Bài tập 2 đã được giao",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: false
    },
    {
      id: "4",
      title: "CSC100323: Thay đổi lịch học",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: true
    },
    {
      id: "5",
      title: "Invoice #9333E93 was paid",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: true
    },
    {
      id: "6",
      title: "Invoice #9333E93 was paid",
      timestamp: "Jan 23, 2023 at 10:15am",
      read: true
    }
  ]
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

  const unreadNotifications = notifications.filter(noti => !noti.read);

  const handleViewAllNotifications = () => {
    navigate('/notifications');
    setIsNotificationOpen(false);
  };

  const handleMarkAsRead = () => {
    // Update notification read status here
  };

  return (
    <nav className="bg-white border-1 border-black-600">
      <div className="flex w-100 justify-content-between m-2">
        {/* Left side: Logo and Page Name */}
        <div className="flex items-center space-x-4 nav-left ml-3">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Logo"
              className="h-10 w-10"
            />
          </Link>
          <span className="text-xl font-bold text-blue-600">Moodle</span>
        </div>

        {/* Right side: User Info and Notifications */}
        <div className="flex items-center nav-right mr-8">
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
                  {unreadNotifications.length > 99 ? "99+" : unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Content */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white border rounded-xl shadow-xl z-20">
                <div className="px-3 py-3 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Thông báo</h3>
                  <button 
                    onClick={handleMarkAsRead}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Đánh dấu đã đọc
                  </button>
                </div>
                <div className="max-h-96">
                  {notifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}>
                      <div>
                        <div className="flex justify-content-end">
                          <h4 className="font-semibold text-xl">{notification.title}</h4>
                        </div>
                        <div className="flex justify-content-center">
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t text-center">
                  <button
                    onClick={handleViewAllNotifications}
                    className="text-blue-600 text-sm hover:underline">
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
                {user.role}
              </div>
            </div>
            <div className="relative">
              <img
                id="avatarButton"
                onClick={toggleDropdown}
                src={user?.avatar || "https://avatar.iran.liara.run/public/boy"}
                alt={`${toFullName(
                  user.firstName || "",
                  user.lastName || ""
                )}'s profile`}
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-600 cursor-pointer"
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
