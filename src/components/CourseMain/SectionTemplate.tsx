import React, { useState } from 'react';
import IconifyIcon from "../utils/icon";
import AddDocumentDialog from './AddDocumentDialog';

interface FileProps {
  name: string;
  url: string;
}

interface SectionTemplateProps {
  title: string;
  files: FileProps[];
  isTeacher?: boolean;
  onViewDetail: (lesson: FileProps) => void;
}

const SectionTemplate: React.FC<SectionTemplateProps> = ({ title, files, isTeacher, onViewDetail }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (formData: any
  ) => {
    console.log('Submitted:', formData);
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="font-bold text-xl py-4">{title}</div>
      <div className="w-full space-y-4">
        {files.map((file, index) => (
          <div
            key={index} onClick={() => onViewDetail(file)} 
            className="flex items-center p-2 border border-gray-200 rounded-md hover:shadow-sm cursor-pointer"
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
              {isTeacher && (
                <button>
                  <IconifyIcon
                    icon="material-symbols-light:edit-outline"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </button>
              )}
              {isTeacher && (
                <button className="ml-2">
                  <IconifyIcon
                    icon="material-symbols:delete-outline-rounded"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </button>
              )}
            </a>
          </div>
        ))}
      </div>
      {isTeacher && (
        <>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={() => setDialogOpen(true)}
          >
            Thêm tài liệu
          </button>
          <AddDocumentDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            sectionLabel={title}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default SectionTemplate;