import exp from "constants";
import { useAuth } from "../contexts/AuthContext";
import {getCoursesAPI} from "../services/courses";
import { useCallback, useState } from "react";

interface Course {
    _id: string;
    name: string;
    description: string;
    teacher: string;
    students: string[];
    createdAt: Date;
}

interface CourseContextType {
    courses: Course[];
    fetchCourses: () => void;
}
