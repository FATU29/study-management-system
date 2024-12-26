import {useState} from 'react';
import TeacherTemplate from './TeacherTemplate';
import SectionTemplate from './SectionTemplate';
import ResouceDetail from '../ResoursesCourse/Resource';

interface FileProps {
  name: string;
  url: string;
  exercise?: {
    type: "file" | "quiz";
    name: string;
    fileUrl?: string;
    questions?: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  }[];
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];
}
const mockLesson: FileProps = {
  name: "Bài học 1: Giới thiệu React",
  url: "https://www.youtube.com/watch?v=34wqVtxCtAM", // Thay bằng URL video của bạn
  exercise: [
    {
      type: "file",
      name: "Nộp bài tập React cơ bản",
    },
    {
      type: "quiz",
      name: "Trắc nghiệm về React",
      questions: [
        {
          question: "React là gì?",
          options: [
            "Thư viện JavaScript",
            "Ngôn ngữ lập trình",
            "Framework",
            "Công cụ thiết kế",
          ],
          correctAnswer: "Thư viện JavaScript",
        },
        {
          question: "Công ty nào phát triển React?",
          options: ["Google", "Microsoft", "Facebook", "Apple"],
          correctAnswer: "Facebook",
        },
        {
          question: "React sử dụng mô hình nào?",
          options: ["MVC", "MVP", "Flux", "MVVM"],
          correctAnswer: "Flux",
        },
      ],
    },
   
  ],
  documents: [
    { name: "Hướng dẫn sử dụng React", url: "/files/react-guide.pdf", type: "pdf" },
    { name: "Slide bài giảng", url: "/files/slides.pptx", type: "pptx" },
    { name: "Ghi chú", url: "/files/notes.txt", type: "txt" },
  ],
};
interface TeacherProps {
  name: string;
  email: string;
}

interface CourseClassProps {
  name: string;
  isTeacher: boolean;
  courseData: any;
}

const MainCourse: React.FC<CourseClassProps> = ({ name, isTeacher, courseData }) => {
  const [selectedLesson, setSelectedLesson] = useState<FileProps | null>(null);
  const teachersD = courseData.teacherDetails.map((teacher: any) => ({
    name: `${teacher.firstName} ${teacher.lastName}`,
    email: teacher.email,
  }));

  const doc: FileProps[] = [
    { name: "Bài giảng 1", url: "https://www.google.com" },
    { name: "Bài giảng 2", url: "https://www.google.com" },
    { name: "Bài giảng 3", url: "https://www.google.com" },
  ];

  const handleViewDetail = (lesson: FileProps) => {
    setSelectedLesson(lesson);
  };

  const handleBack = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="flex flex-col h-100 bg-gray-50">
      <div className="p-3 rounded-md border-1 mx-3 mt-3">
        <h1 className="text-2xl text-left font-bold text-blue-500">{name}</h1>
      </div>

      <div className="flex-grow p-3 overflow-hidden">
        <div className="grid grid-cols-10 gap-4 h-full">
          <div className="col-span-7 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
            {selectedLesson ? (
              <ResouceDetail lesson={mockLesson} onBack={handleBack} />
            ) : (
              <>
                <SectionTemplate title="Bài giảng" files={doc} isTeacher={true} onViewDetail={handleViewDetail} />
                <SectionTemplate title="Lý thuyết" files={doc} isTeacher={isTeacher} onViewDetail={handleViewDetail} />
                <SectionTemplate title="Thực hành" files={doc} isTeacher={isTeacher} onViewDetail={handleViewDetail} />
              </>
            )}
          </div>

          <aside className="col-span-3 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
            <div className="font-bold text-lg mb-4">Thông tin chung</div>
            <hr />
            <div className="font-bold text-lg py-1 text-left">Giáo viên: </div>
            <div className="flex flex-column justify-start text-left space-y-4 mt-2">
              {teachersD.map((teacher: TeacherProps, index: number) => (
                <TeacherTemplate key={index} name={teacher.name} email={teacher.email} />
              ))}
            </div>
            <hr />
            <div className="font-bold text-lg mb-4">Thông báo</div>
          </aside>
        </div>
      </div>
    </div>
  );
};
  
  export default MainCourse;
