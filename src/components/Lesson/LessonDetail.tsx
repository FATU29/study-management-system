import React from 'react';

interface FileProps {
  name: string;
  url: string;
}

interface LessonDetailProps {
  lesson: FileProps;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">{lesson.name}</h2>
      <p>URL: <a href={lesson.url} target="_blank" rel="noopener noreferrer">{lesson.url}</a></p>
      {/* Add more lesson details here */}
    </div>
  );
};

export default LessonDetail;