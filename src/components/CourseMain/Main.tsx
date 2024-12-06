import React from 'react';
import TeacherTemplate from './TeacherTemplate';
import IconifyIcon from '../utils/icon';
import CalendarSidebar from './CalendarSidebar';

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
        <div className="flex h-screen overflow-y-hidden w-full">
            <div className="flex flex-col flex-grow overflow-y-auto">
                <div className='flex items-center mb-0 w-full'>
                    <button className='flex items-center'>
                        <IconifyIcon icon="ic:twotone-arrow-back" width="30" height="30" />
                    </button>
                    <h1 className='text-2xl font-bold text-left ml-2'>{name}</h1>
                </div>
                <div className='text-left text-base px-10'>
                    <p>Khóa học /<span className='font-bold text-lg'> {name}</span></p>
                </div>
                <div className='text-left font-bold text-xl px-2'>
                    Thông tin môn học
                </div>
                <div className='flex justify-start py-6 space-x-5'>
                    {teachers.map((teacher, index) => (
                        <TeacherTemplate key={index} name={teacher.name} email={teacher.email} />
                    ))}
                </div>
                <div className='flex text-left font-bold text-xl px-2 py-2 pt-6'>
                    Tài liệu
                    <button className='ml-2'>
                        <IconifyIcon icon="material-symbols-light:note-add-outline" width="20" height="20" />
                    </button>
                </div>
                <div className='w-full'>
                    {doc.map((file, index) => (
                        <div key={index} className='flex text-left px-2 w-full'>
                            <IconifyIcon icon="basil:document-outline" width="20" height="20" style={{ color: 'black' }} />
                            <p className='ml-2 align-middle'>{file.name}</p>
                            <a href={file.url} target='_blank' rel='noreferrer' className='flex ml-auto'>
                                <button className='px-2'>
                                    <IconifyIcon icon="material-symbols-light:download" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                                <button className=''>
                                    <IconifyIcon icon="material-symbols-light:edit-outline" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
                <div className='flex text-left font-bold text-xl px-2 py-2 pt-6'>
                    Lý thuyết
                    <button className='ml-2'>
                        <IconifyIcon icon="material-symbols-light:note-add-outline" width="20" height="20" />
                    </button>
                </div>
                <div className='w-full'>
                    {doc.map((file, index) => (
                        <div key={index} className='flex text-left px-2 w-full'>
                            <IconifyIcon icon="basil:document-outline" width="20" height="20" style={{ color: 'black' }} />
                            <p className='ml-2'>{file.name}</p>
                            <a href={file.url} target='_blank' rel='noreferrer' className='flex ml-auto'>
                                <button className='px-2'>
                                    <IconifyIcon icon="material-symbols-light:download" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                                <button className=''>
                                    <IconifyIcon icon="material-symbols-light:edit-outline" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
                <div className='flex text-left font-bold text-xl px-2 py-2 pt-6'>
                    Thực hành
                    <button className='ml-2'>
                        <IconifyIcon icon="material-symbols-light:note-add-outline" width="20" height="20" />
                    </button>
                </div>
                <div className='w-full'>
                    {doc.map((file, index) => (
                        <div key={index} className='flex text-left px-2 w-full'>
                            <IconifyIcon icon="basil:document-outline" width="20" height="20" style={{ color: 'black' }} />
                            <p className='ml-2'>{file.name}</p>
                            <a href={file.url} target='_blank' rel='noreferrer' className='flex ml-auto'>
                                <button className='px-2'>
                                    <IconifyIcon icon="material-symbols-light:download" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                                <button className=''>
                                    <IconifyIcon icon="material-symbols-light:edit-outline" width="20" height="20" style={{ color: 'black' }} />
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 w-1/3 overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <CalendarSidebar 
                        currentDate={new Date(2024, 11)}
                        events={[]}
                        onDateChange={(date) => console.log('Date changed:', date)}
                        onViewChange={(view) => console.log('View changed:', view)}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainCourse;
