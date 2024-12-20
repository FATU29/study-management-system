import React from 'react';
import TeacherTemplate from './TeacherTemplate';
import IconifyIcon from '../utils/icon';
import CalendarSidebar from '../Dashboard/CalendarSidebar';

interface CourseClassProps {
    name: string;
}

interface TeacherProps {
    name: string;
    email: string;
}

interface FileProps {
    name: string;
    url: string;
}

const MainCourse = ({ name }: CourseClassProps) => {
    const teachers: TeacherProps[] = [
        { name: "Nguyen Van A", email: "nva@gmail.com" },
        { name: "Nguyen Van B", email: "nvb@gmail.com" },
        { name: "Nguyen Van C", email: "nvc@gmail.com" },
    ];

    const doc: FileProps[] = [
        { name: "Bài giảng 1", url: "https://www.google.com" },
        { name: "Bài giảng 2", url: "https://www.google.com" },
        { name: "Bài giảng 3", url: "https://www.google.com" },
    ];

    return (
        <div className="flex flex-col h-100 w-full bg-gray-50">
            <div className="p-4 rounded-md border-1 mx-3 mt-3">
                <h1 className="text-2xl font-bold">Thông tin môn học</h1>
            </div>

            {/* Body */}
            <div className="flex-grow p-3 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-2 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
                    <div className="font-bold text-xl mb-4">Thông tin môn học</div>
                    <div className="flex justify-start py-6 space-x-5">
                    {teachers.map((teacher, index) => (
                        <TeacherTemplate
                        key={index}
                        name={teacher.name}
                        email={teacher.email}
                        />
                    ))}
                    </div>

                    <div className="font-bold text-xl py-4">Tài liệu</div>
                    <div className="w-full space-y-4">
                    {doc.map((file, index) => (
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

                    <div className="font-bold text-xl py-4">Lý thuyết</div>
                    <div className="w-full space-y-4">
                    {doc.map((file, index) => (
                        <div
                        key={index}
                        className="flex items-center p-2 border border-gray-200 rounded-md hover:shadow-sm">
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

                    <div className="font-bold text-xl py-4">Thực hành</div>
                    <div className="w-full space-y-4">
                    {doc.map((file, index) => (
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

                <aside className="col-span-1 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto">
                    <div className="font-bold text-lg mb-4">Sidebar</div>
                    <p>Place your additional content or widgets here.</p>
                </aside>
                </div>
            </div>
            </div>

    );
}

export default MainCourse;
