// UNUSED, use ones in src/types/resourceType.ts instead
export type ResourceType = "document" | "link" | "assignment" | "announcement";

export type Class = {
  id: string;
  title: string;
  teachers: string[]; // TeacherId[] in the DB
  students: string[]; // StudentId[] in the DB
  resources: ClassResource[];
  rating?: number;
};

export type ClassResource = {
  id: string;
  sectionLabel: string;
  type: ResourceType;
  title: string;
  url?: string; // For external link or single-file
  description?: string; // File-only resource may not need description
  openDate?: Date | null;
  dueDate?: Date | null;
  submissions?: Submission[]; // For "submission" type, or save submissionIds
};

export type Submission = {
  id: string;
  assignmentId: string;
  studentId: string;
  lastSubmissionDate: Date | null;
  submittedFiles?: File[];
  grade: number;
};

export type File = {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadDate: Date;
  uploaderId: string;
  sourceId: string; // From resource or submission or personal storage or message, etc.
};
