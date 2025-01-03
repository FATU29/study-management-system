export interface IFile {
  _id: string;
  filename: string;
  mimetype: string; // MIME type
  size: number;
  uploadDate: Date;
}

export interface IDocumentResourceInfo {
  file: IFile;
}

export interface ILinkResourceInfo {
  url: string;
}

export interface IAssignmentResourceInfo {
  description?: string;
  attachments?: IFile[];
  openDate?: Date;
  dueDate: Date;
  maxFileSize?: number;
  maxFileCount?: number;
}

export interface IAnnouncementResourceInfo {
  content: string;
}

export type ResourceType = "document" | "link" | "assignment" | "announcement";
export type ResourceInfo =
  | IDocumentResourceInfo
  | ILinkResourceInfo
  | IAssignmentResourceInfo
  | IAnnouncementResourceInfo;

export interface ICourseResource {
  _id: string;
  title: string;
  courseId: string;
  resourceType: ResourceType;
  resourceInfo: ResourceInfo;
  sectionLabel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const newlyCreatedResourceId = "new-resource";

export const defaultDateOffset = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const emptyInfoOf = (resourceType: ResourceType): ResourceInfo => {
  switch (resourceType) {
    case "document":
      return {
        file: {
          _id: "",
          filename: "",
          mimetype: "",
          size: 0,
          uploadDate: new Date(),
        },
      };
    case "link":
      return { url: "" };
    case "assignment":
      return {
        description: "",
        attachments: [],
        openDate: new Date(),
        dueDate: new Date(Date.now() + defaultDateOffset),
      };
    case "announcement":
      return { content: "" };
  }
};

export const emptyFile: IFile = {
  _id: "",
  filename: "",
  mimetype: "",
  size: 0,
  uploadDate: new Date(),
};

export const resourceNameBy = (resourceType: string) => {
  switch (resourceType) {
    case "announcement":
      return "Thông báo";
    case "document":
      return "Tài liệu";
    case "link":
      return "Liên kết";
    case "assignment":
      return "Bài tập";
    default:
      return "Tài liệu";
  }
};
