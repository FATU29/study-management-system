import React, { useState } from "react";
import IconifyIcon from "../utils/icon/index";

import { MenuSection } from "../types/menu-section";

// const mainListItems: {
//   icon: string;
//   section: string;
//   text: string;
//   badge: number;
//   subItems?: { text: string; section: MenuSection }[];
// }[] = [
//   {
//     icon: "solar:home-linear",
//     section: "home",
//     text: "Trang chủ",
//     badge: 0,
//   },
//   {
//     icon: "hugeicons:course",
//     section: "course",
//     text: "Khóa học",
//     badge: 3,
//     subItems: [
//       { text: "Cơ sở lập trình", section: "course-1"}
//     ]
//   },
//   {
//     icon: "proicons:chat",
//     section: "chat",
//     text: "Trò chuyện",
//     badge: 5,
//   },
//   {
//     icon: "formkit:file",
//     section: "file",
//     text: "Tệp riêng tư",
//     badge: 0,
//   },
// ];

const defaultIcon = "mdi:blank";

const MenuCourse: React.FC<{
  onSectionChange: (sectionId: string) => void;
  sections: MenuSection[];
}> = ({ onSectionChange, sections }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<string[]>([]); // Tracks open sections

  // Toggle subsection visibility
  const toggleSubSection = (sectionId: string) => {
    setOpenSections(
      (prev) =>
        prev.includes(sectionId)
          ? prev.filter((id) => id !== sectionId) // Close section
          : [...prev, sectionId] // Open section
    );
  };

  const renderSubSections = (
    subSections: MenuSection[],
    parentSectionId: string
  ) => {
    if (!openSections.includes(parentSectionId)) {
      return null;
    }

    return (
      <div className="ml-4 flex-1 items-center justify-between">
        {subSections.map((subSection) => (
          <button
            key={subSection.id}
            onClick={() => {
              setActiveItem(subSection.id);
              onSectionChange(subSection.id);
            }}
            className={`
              group mb-2 flex w-full items-center rounded-lg p-2 text-sm font-medium transition-all duration-200
              ${
                activeItem === subSection.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            {subSection.icon && (
              <IconifyIcon
                icon={subSection.icon ?? defaultIcon}
                className={`
                  h-4 w-4 transition-colors
                  ${
                    activeItem === subSection.id
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-600"
                  }
                `}
              />
            )}
            <span className="ml-2 font-bold text-base">{subSection.name}</span>
          </button>
        ))}
      </div>
    );
  };

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
        {sections.map((section) => {
          const withinSection =
            section.parentSectionId != undefined
              ? sections.find((s) => s.id === section.parentSectionId) !=
                undefined
              : false;

          if (withinSection) {
            return null;
          }

          const subsections = sections.filter(
            (s) => s.parentSectionId === section.id
          );
          const hasSubsection = subsections.length > 0;

          return (
            <div key={section.id}>
              <button
                onClick={() => {
                  if (hasSubsection) {
                    toggleSubSection(section.id);
                  } else {
                    setActiveItem(section.id);
                    onSectionChange(section.id);
                  }
                }}
                className={`
                group mb-2 flex w-full items-center rounded-lg p-2 text-sm font-medium transition-all duration-200
                ${
                  activeItem === section.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
              >
                <IconifyIcon
                  icon={section.icon ?? defaultIcon}
                  className={`
                  h-5 w-5 transition-colors
                  ${
                    activeItem === section.id
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-600"
                  }
                `}
                />
                {isExpanded && (
                  <div className="ml-3 flex flex-1 items-center justify-between">
                    <span className="font-bold text-base">{section.name}</span>

                    <div className="flex items-center space-x-2 ml-auto">
                      {section.badge != undefined && section.badge > 0 && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                          {section.badge}
                        </span>
                      )}

                      {hasSubsection && (
                        <IconifyIcon
                          icon={
                            openSections.includes(section.id)
                              ? "mdi:chevron-down"
                              : "mdi:chevron-right"
                          }
                          className="h-4 w-4 text-gray-500"
                        />
                      )}
                    </div>
                  </div>
                )}
              </button>
              {isExpanded &&
                hasSubsection &&
                renderSubSections(subsections, section.id)}
            </div>
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
