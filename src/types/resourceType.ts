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
        dueDate: new Date(),
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
