import React, { useState } from "react";
import IconifyIcon from "../utils/icon/index";

import { MenuSection } from "../types/menu-section";

const defaultIcon = "mdi:blank";

const levelStyles: {
  [key: number]: { background: string; fontSize: string };
} = {
  0: {
    background: "hover:bg-blue-400/50",
    fontSize: "text-base",
  },
  1: {
    background: "bg-blue-200/25 hover:bg-blue-300/50",
    fontSize: "text-sm",
  },
  2: {
    background: "bg-blue-100/25 hover:bg-blue-200/50",
    fontSize: "text-xs",
  },
  3: {
    background: "bg-blue-50/25 hover:bg-blue-100/50",
    fontSize: "text-[10px]",
  }, // Smaller custom size for level 3
};

const getLevelStyle = (level: number) =>
  levelStyles[level] || {
    background: "bg-gray-50",
    fontSize: "text-[9px]",
  };

const MenuCourse: React.FC<{
  onSectionChange: (section: MenuSection) => void;
  sections: MenuSection[];
}> = ({ onSectionChange, sections }) => {
  const isExpanded = true;
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

  const renderSections = (
    parentSectionId: string | null,
    level: number = 0
  ) => {
    return sections
      .filter((section) => section.parentSectionId === parentSectionId)
      .map((section) => {
        const isActive = section.id === activeItem;
        const isOpen = openSections.includes(section.id);
        const hasSubsection = sections.some(
          (s) => s.parentSectionId === section.id
        );
        const { background, fontSize } = getLevelStyle(level);

        return (
          <div key={section.id} className={`ml-${level + 1}`}>
            {/* Section Button */}
            <button
              onClick={() => {
                if (section.url) {
                  setActiveItem(section.id);
                  onSectionChange(section);
                }

                if (hasSubsection) {
                  toggleSubSection(section.id);
                }
              }}
              className={`group mb-2 flex w-full items-center rounded-lg p-2 text-sm font-medium transition-all duration-200
                ${background}
                ${
                  isActive
                    ? "bg-blue-300/80 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {/* Section Icon */}
              <IconifyIcon
                icon={section.icon ?? defaultIcon}
                className={`h-5 w-5 transition-colors
                  ${
                    activeItem === section.id
                      ? "text-blue-500"
                      : "text-gray-500 group-hover:text-gray-600"
                  }
                `}
              />
              {isExpanded && (
                <div className="ml-3 flex flex-1 items-center justify-between">
                  {/* Section Name */}
                  <span className={`font-bold text-base ${fontSize}`}>
                    {section.name}
                  </span>

                  <div className="flex items-center space-x-2 ml-auto">
                    {/* Section Badge */}
                    {section.badge !== undefined && section.badge > 0 && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                        {section.badge}
                      </span>
                    )}

                    {/* Section Expand Icon */}
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

            {/* Render Subsections */}
            {isExpanded &&
              isOpen &&
              hasSubsection &&
              renderSections(section.id, level + 1)}
          </div>
        );
      });
  };

  return (
    <aside
      className={`
      relative min-h-full bg-white  border-gray-200 transition-all duration-300 ease-in-out border-l border-r
      ${isExpanded ? "w-64" : "w-20"}
    `}
    >
      <nav className="mt-6 px-2">{renderSections(null)}</nav>

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
