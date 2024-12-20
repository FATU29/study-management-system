import React from 'react';
import TeacherTemplate from './TeacherTemplate';
import CalendarSidebar from '../Dashboard/CalendarSidebar';
import SectionTemplate from './SectionTemplate';

interface CourseClassProps {
    name: string;
    isTeacher: boolean;
}

interface TeacherProps {
    name: string;
    email: string;
}

interface FileProps {
    name: string;
    url: string;
}

const MainCourse = ({ name, isTeacher }: CourseClassProps) => {
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
            <div className="p-3 rounded-md border-1 mx-3 mt-3">
                <h1 className="text-2xl text-left font-bold text-blue-500">{name} - CSC100002</h1>
            </div>

            {/* Body */}
            <div className="flex-grow p-3 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-2 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">


                <SectionTemplate title="Tài liệu" files={doc} isTeacher={true}/>

                <SectionTemplate title="Lý thuyết" files={doc} isTeacher={false} />


                <SectionTemplate title="Thực hành" files={doc} isTeacher={true}/>


                </div>

                <aside className="col-span-1 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
                    <div className="font-bold text-lg mb-4">Thông tin chung</div>
                    
                    <hr />
                    <div className="font-bold text-lg py-1 text-left">Giáo viên: </div>
                    <div className="flex flex-column justify-start text-left space-y-4 mt-2">
                    {teachers.map((teacher, index) => (
                        <TeacherTemplate
                        key={index}
                        name={teacher.name}
                        email={teacher.email}/>
                    ))}
                    </div>
                    <hr />
                    <CalendarSidebar />
                </aside>
                </div>
            </div>
            </div>

    );
}

export default MainCourse;
