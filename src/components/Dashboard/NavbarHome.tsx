import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconifyIcon from "../utils/icon/index";
import { TUser } from "../../types/userType";
import { toFullName } from "../../helpers/toFullName";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Typography } from "@mui/material";
import ProfileModal from "../Modals/ProfileModal";

// import { Bell } from "lucide-react";

interface NavbarHomeProps {
  user?: TUser;
  notificationCount?: number;
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
  notificationCount = 3,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="bg-white border-1 border-black-600">
      <div className="flex w-100 justify-content-between m-2">
        {/* Left side: Logo and Page Name */}
        <div className="flex items-center space-x-4 nav-left ml-3">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/moodle.png`}
              alt="Logo"
              className="w-[130px]"
            />
          </Link>
        </div>

        {/* Right side: User Info and Notifications */}
        <div className="flex items-center nav-right mr-8">
          {/* Notification Icon */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-full"
            aria-label="Notifications"
          >
            <IconifyIcon
              icon="mdi-light:bell"
              className="h-8 w-8 text-gray-600"
            />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-4 nav-item m-2">
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
                src={user?.avatar || `${process.env.PUBLIC_URL}/assets/avatar/avatar-1.png`}
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
