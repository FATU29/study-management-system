import React from "react";
import IconifyIcon from "../utils/icon";

interface TeacherProps {
  name: string;
  email: string;
}

const TeacherTemplate: React.FC<TeacherProps> = ({ name, email }) => {
  return (
    <div className="card w-auto mx-auto text-left border-1 rounded-lg bg-white">
      <div className="px-3">
        <h2 className="text-base mt-3 mb-1">Giáo viên: {name}</h2>
        <h1 className="text-gray-500 text-sm mb-3">
          Email:
          <span className="text-gray-500 ml-1 sub-title">{email}</span>
        </h1>
      </div>

      <div className="w-full border-t px-3 pt-2">
        <div className="flex justify-center items-center space-x-4">
          <div>
            <button className="">
              <IconifyIcon
                icon="material-symbols:send-outline"
                width="30"
                height="30"
              ></IconifyIcon>
            </button>
          </div>
          <div className="w-full text-gray-200 text-center">|</div>
          <div>
            <button className="">
              <IconifyIcon icon="mdi:github" width="30" height="30" />
            </button>
          </div>
          <div className="w-full text-gray-200 text-center">|</div>
          <div>
            <button className="">
              <IconifyIcon icon="ph:dots-three-bold" width="30" height="30" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTemplate;
