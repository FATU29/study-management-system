import { LoaderFunction, useSearchParams } from "react-router-dom";
import CourseClass from "../components/Dashboard/CourseClass";
import { Class, ClassResource } from "../components/types/class-resource";

// loader can't be use with Route component
export const classLoader: LoaderFunction = async ({ params }) => {
  if (params.courseId && params.courseId === "cs101") {
    return mockedClass;
  }
  return null;
};

const ClassPageExample: React.FC = () => {
  // const currentClass = useLoaderData() as Class;

  const [searchParams] = useSearchParams();
  const currentClassId = searchParams.get("classId");
  const currentClass = currentClassId === "cs101" ? mockedClass : null;

  if (currentClass) {
    return (
      <CourseClass
        classId={currentClass.id}
        title={currentClass.title}
        teachers={currentClass.teachers}
        resources={currentClass.resources}
      />
    );
  }
  return <div>Course not found! Course="{currentClass}"</div>;
};

export default ClassPageExample;

// Mock data

const classTitle = "Nhập môn công nghệ phần mềm 22_3";

const classTeachers = [
  "Nguyễn Lê Hoàng Dũng",
  "Phạm Hoàng Hải",
  "Hồ Tuấn Thanh",
  "Phạm Minh Tuấn",
];

const classResources: ClassResource[] = [
  {
    id: "lesson1",
    sectionLabel: "Tài liệu môn học",
    title: "Bài giảng 1",
    type: "document",
    url: "https://example.com/lesson1",
    description: "Bài giảng về giới thiệu môn học",
    openDate: new Date("2022-03-01"),
    dueDate: null,
  },
  {
    id: "lesson2",
    sectionLabel: "Tài liệu môn học",
    title: "Bài giảng 2",
    type: "document",
    url: "https://example.com/lesson2",
    description: "Bài giảng về quy trình phát triển phần mềm",
    openDate: new Date("2022-03-03"),
    dueDate: null,
  },
  {
    id: "assignment1",
    sectionLabel: "Bài tập lý thuyết",
    title: "Bài tập 1",
    type: "assignment",
    url: "https://example.com/assignment1",
    description: "Bài tập về quy trình phát triển phần mềm",
    openDate: new Date("2022-03-05"),
    dueDate: new Date("2022-03-10"),
  },
  {
    id: "assignment2",
    sectionLabel: "Bài tập thực hành",
    title: "Bài tập 2",
    type: "assignment",
    url: "https://example.com/assignment2",
    description: "Bài tập về thiết kế phần mềm",
    openDate: new Date("2022-03-10"),
    dueDate: new Date("2022-03-15"),
  },
];

export const mockedClass: Class = {
  id: "cs101",
  title: classTitle,
  teachers: classTeachers,
  students: [],
  resources: classResources,
};
