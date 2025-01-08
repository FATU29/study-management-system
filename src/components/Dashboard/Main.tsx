import React, { useEffect, useState } from "react";
import IconifyIcon from "../utils/icon/index";
import CalendarSidebar from "./CalendarSidebar";
import { getLocalCourses } from "../../helpers/LocalStorage";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROLE_TYPE } from "../../types/roleType";

interface RecentCourseProps {
  _id?: string;
  title: string;
  teacher: string;
  assistant: string;
  onClick?: () => void;
}

// RecentCourse component
const RecentCourse = ({
  title,
  teacher,
  assistant,
  onClick,
}: RecentCourseProps) => (
  <div
    onClick={onClick}
    className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-xl cursor-pointer"
  >
    <div className="mb-4 h-45 w-full bg-gray-200">
      <img
        src="https://thaitrien.com/wp-content/uploads/2021/09/Phong-nen-hoc-online-by-Thaitrien.com-1-scaled.jpg"
        alt="bg-classroom"
      />
    </div>
    <h3 className="mb-2 text-lg font-medium text-gray-800">{title}</h3>
  </div>
);

const CourseMain = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<RecentCourseProps[]>([]);
  useEffect(() => {
    const courses = getLocalCourses(user?._id?.toString() || "");
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
            {/* <img src="https://placehold.in/1200x200" className="h-12" alt="Logo" /> */}
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
                <h2 className="mb-4 text-2xl font-bold text-blue-600">
                  Khóa học gần đây
                </h2>
                <div className="relative">
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 h-[300px] w-[200px]">
                      {courses.map((course, index) => (
                        <RecentCourse
                          key={index}
                          title={course.title}
                          teacher={"Nguyễn Văn A"}
                          assistant={"Nguyễn Văn B"}
                          onClick={() => {
                            if (course._id && course.title) {
                              navigate(`course\\${course._id}`, {
                                state: {
                                  name: course.title,
                                  isTeacher: user?.role === ROLE_TYPE.TEACHER,
                                  courseData: course,
                                  userId: user?._id,
                                },
                              });
                            }
                          }}
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
                <h2 className="mb-4 text-2xl font-bold text-blue-600">
                  Tất cả khóa học
                </h2>

                <div className="grid grid-rows-2 w-full grid-flow-col gap-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="py-1 rounded-lg bg-blue-200 hover:bg-blue-300 cursor-pointer"
                      onClick={() => {
                        if (course._id && course.title) {
                          navigate(`course\\${course._id}`, {
                            state: {
                              name: course.title,
                              isTeacher: user?.role === ROLE_TYPE.TEACHER,
                              courseData: course,
                              userId: user?._id,
                            },
                          });
                        }
                      }}
                    >
                      <h3 className="mb-2 text-lg font-medium text-gray-800">
                        {course.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div>
                <h2 className="mb-4 text-xl font-medium text-gray-800">
                  Tất cả khóa học
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <IconifyIcon icon={Icon} className="h-4 w-4" />
                    <span className="font-medium">
                      Cấu trúc dữ liệu và giải thuật
                    </span>
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
              </div> */}
            </div>
          </div>

          {/* Right Sidebar - Scrollable */}
          <div className="col-span-3 w-[305px] overflow-hidden">
            <div className="h-full overflow-y-auto hide-scrollbar">
              <CalendarSidebar
                currentDate={new Date(2020, 11)}
                events={[]}
                onDateChange={(date) => console.log("Date changed:", date)}
                onViewChange={(view) => console.log("View changed:", view)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMain;
