import { ResourceInfo, ResourceType } from "../../types/resourceType";

export interface AddCourseResourceRequestBody {
  title: string;
  resourceType: ResourceType;
  resourceInfo: ResourceInfo;
  sectionLabel?: string;
}

export interface UpdateCourseResourceRequestBody {
  title: string;
  resourceInfo: ResourceInfo;
  sectionLabel?: string;
}
