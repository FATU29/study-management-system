import React from 'react';
import IconifyIcon from "../utils/icon";

interface FileProps {
  name: string;
  url: string;
}

interface SectionTemplateProps {
  title: string;
  files: FileProps[];
}

const SectionTemplate: React.FC<SectionTemplateProps> = ({ title, files }) => {
  return (
    <div>
      <div className="font-bold text-xl py-4">{title}</div>
      <div className="w-full space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center p-2 border border-gray-200 rounded-md hover:shadow-sm"
          >
            <IconifyIcon
              icon="basil:document-outline"
              width="20"
              height="20"
              style={{ color: "black" }}
            />
            <p className="ml-2">{file.name}</p>
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="flex ml-auto"
            >
              <button className="px-2">
                <IconifyIcon
                  icon="material-symbols-light:download"
                  width="20"
                  height="20"
                  style={{ color: "black" }}
                />
              </button>
              <button>
                <IconifyIcon
                  icon="material-symbols-light:edit-outline"
                  width="20"
                  height="20"
                  style={{ color: "black" }}
                />
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTemplate;