import React, { useState } from "react";
import "./HomePage.tsx.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  isScrolledOut: boolean;
}

function Header({ isScrolledOut }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`fixed-header`}>
      <nav
        className={`border-gray-200 px-4 lg:px-6 dark:bg-gray-800 bg-transparent shadow-md`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          //{" "}
          <div className="flex items-center text-decoration-none hover:text-blue-500">
            //{" "}
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            //{" "}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-decoration-none">
              Moodle
            </span>
            //{" "}
          </div>
          <a
            href="#"
            className="flex items-center text-decoration-none hover:text-blue-500"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/moodle.png`}
              className="w-[150px]"
              alt="Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-primary font-bold rounded mr-2 border border-gray-300 rounded font-medium text px-3 py-2 text-decoration-none"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="text-white bg-primary font-bold rounded mr-2 border border-gray-300 rounded font-medium text px-3 py-2 text-decoration-none"
            >
              Bắt đầu
            </Link>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${menuOpen ? "hidden" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${menuOpen ? "" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`w-full lg:flex lg:w-auto lg:order-1 ${
              menuOpen ? "block" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#welcome-section"
                  className="block py-2 pr-4 pl-3 text-decoration-none font-bold"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#feature-section"
                  className="block py-2 pr-4 pl-3 text-decoration-none font-bold"
                >
                  Tính năng
                </a>
              </li>
              <li>
                <a
                  href="#members-section"
                  className="block py-2 pr-4 pl-3 text-decoration-none font-bold"
                >
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
