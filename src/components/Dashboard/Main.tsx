import React, {useEffect, useState} from 'react';
import IconifyIcon from '../utils/icon/index';
import CalendarSidebar from './CalendarSidebar';
import { getLocalCourses } from '../../helpers/LocalStorage';
import { useAuth } from "../../contexts/AuthContext";



interface RecentCourseProps {
    title: string;
    teacher: string;
    assistant: string;
}

// RecentCourse component
const RecentCourse = ({ title, teacher, assistant }: RecentCourseProps) => (
    <div className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="mb-4 h-45 w-full bg-gray-200">
            <img src="https://thaitrien.com/wp-content/uploads/2021/09/Phong-nen-hoc-online-by-Thaitrien.com-1-scaled.jpg" alt="bg-classroom" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">{title}</h3>
    </div>
);

const CourseMain = () => {
    // const courses = [
    //     {
    //         title: "Cấu trúc dữ liệu và giải thuật",
    //         teacher: "Nguyễn Văn A",
    //         assistant: "Nguyễn Văn B"
    //     },
    //     {
    //         title: "Hệ thống thông tin",
    //         teacher: "Nguyễn Văn A",
    //         assistant: "Nguyễn Văn B"
    //     },
    //     {
    //         title: "Hệ điều hành",
    //         teacher: "Nguyễn Văn A",
    //         assistant: "Nguyễn Văn B"
    //     },
    //     {
    //         title: "Lập trình Web",
    //         teacher: "Nguyễn Văn C",
    //         assistant: "Nguyễn Văn D"
    //     },
    //     {
    //         title: "Trí tuệ nhân tạo",
    //         teacher: "Nguyễn Văn E",
    //         assistant: "Nguyễn Văn F"
    //     }
    // ];
    const [courses, setCourses] = useState<RecentCourseProps[]>([]);
    useEffect(() => {
        const courses = getLocalCourses();
        setCourses(courses);
    }, []);

    const Icon = "cuida:caret-down-outline";

    return (
        <div className="flex h-100 w-100 flex-col bg-gray-50 border-r border-gray-200">
            {/* Banner Section - Fixed height */}
            <div className="p-6">
                <div className="relative mb-8 w-full rounded-xl bg-white p-4">
                    <div className="flex items-center justify-between">
                        <div className="absolute left-4 top-4">
                            <img 
                                src="https://havamall.com/wp-content/uploads/2021/11/v%C3%B2ng-hoa-qu%E1%BA%A3-m%E1%BB%8Dng.png"
                                alt="Decoration icon"
                                className="h-16 w-16"
                            />
                        </div>
                        <div className="mx-auto flex items-center">
                            <img 
                                src="https://i.pinimg.com/originals/1a/0c/5e/1a0c5e2006aa60924da816fe673421f0.png"
                                alt="Decoration text"
                                className="h-20 object-fit-fill w-19"
                            />
                        </div>
                        <div className="absolute right-4 top-4">
                            <img 
                                src="https://havamall.com/wp-content/uploads/2021/11/v%C3%B2ng-hoa-qu%E1%BA%A3-m%E1%BB%8Dng.png"
                                alt="Decoration icon"
                                className="h-16 w-16"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-hidden px-6 pb-6">
                <div className="grid h-full grid-cols-12 gap-6">
                    {/* Left Content - Scrollable */}
                    <div className="col-span-9 overflow-hidden">
                        <div className="h-full overflow-y-auto pr-4 hide-scrollbar">
                            {/* Recent Courses - Horizontal Scroll */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-2xl font-bold text-blue-600">Khóa học gần đây</h2>
                                <div className="relative">
                                    <div className="overflow-x-auto pb-4">
                                        <div className="flex gap-6">
                                            {courses.map((course, index) => (
                                                <RecentCourse 
                                                    key={index}
                                                    title={course.title}
                                                    teacher={"Nguyễn Văn A"}
                                                    assistant={"Nguyễn Văn B"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Optional scroll indicators */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50"></div>
                                </div>
                            </div>

                            {/* All Courses Section */}
                            <div>
                                <h2 className="mb-4 text-xl font-medium text-gray-800">Tất cả khóa học</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <IconifyIcon icon={Icon} className="h-4 w-4" />
                                        <span className="font-medium">Cấu trúc dữ liệu và giải thuật</span>
                                    </div>
                                    <div className="ml-6 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <IconifyIcon icon={Icon} className="h-4 w-4" />
                                            <span>Lý thuyết</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <IconifyIcon icon={Icon} className="h-4 w-4" />
                                            <span>Thực hành</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <IconifyIcon icon={Icon} className="h-4 w-4" />
                                        <span className="font-medium">Hệ thống máy tính</span>
                                    </div>
                                    <div className="ml-6">
                                        <div className="flex items-center space-x-2">
                                            <IconifyIcon icon={Icon} className="h-4 w-4" />
                                            <span>Lý thuyết</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Scrollable */}
                    <div className="col-span-3 w-[305px] overflow-hidden">
                        <div className="h-full overflow-y-auto hide-scrollbar">
                            <CalendarSidebar 
                                currentDate={new Date(2020, 11)}
                                events={[]}
                                onDateChange={(date) => console.log('Date changed:', date)}
                                onViewChange={(view) => console.log('View changed:', view)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseMain;