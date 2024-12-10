import React, { useState } from "react";
import IconifyIcon from "../utils/icon/index";

import { MenuSection } from "../types/menu-section";

type MenuCourseProps = {
  onSectionChange: (section: MenuSection) => void;
};

const mainListItems: {
  icon: string;
  section: MenuSection;
  text: string;
  badge: number;
}[] = [
  {
    icon: "solar:home-linear",
    section: "course",
    text: "Khóa học",
    badge: 0,
  },
  {
    icon: "hugeicons:course",
    section: "student",
    text: "Người dùng",
    badge: 0,
  },
];

const MenuCourse: React.FC<MenuCourseProps> = ({ onSectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <aside
      className={`
      relative min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
      ${isExpanded ? "w-64" : "w-20"}
    `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 z-10 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-50"
      >
        {isExpanded ? (
          <IconifyIcon
            icon="cuida:caret-left-outline"
            className="h-4 w-4 text-gray-600"
          />
        ) : (
          <IconifyIcon
            icon="cuida:caret-right-outline"
            className="h-4 w-4 text-gray-600"
          />
        )}
      </button>

      {/* Logo Area */}
      {/* <div className="flex h-16 items-center justify-center border-b px-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500"></div>
          {isExpanded && (
            <span className="text-lg font-semibold text-gray-800">
              Course App
            </span>
          )}
        </div>
      </div> */}

      {/* Menu Items */}
      <nav className="mt-6 px-2">
        {mainListItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                setActiveItem(index);
                onSectionChange(item.section);
              }}
              className={`
                group mb-2 flex w-full items-center rounded-lg p-2 text-sm font-medium transition-all duration-200
                ${
                  activeItem === index
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <IconifyIcon
                icon={Icon}
                className={`
                h-5 w-5 transition-colors
                ${
                  activeItem === index
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-600"
                }
              `}
              />

              {isExpanded && (
                <div className="ml-3 flex flex-1 items-center justify-between">
                  <span className="font-bold text-base">{item.text}</span>
                  {item.badge > 0 && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>
      {isExpanded && (
        <div className="bottom-0 w-full border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col absolute">
              <span className="text-sm font-medium text-gray-700">
                Copyright &copy; 2024 uStudy
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MenuCourse;
