import { useEffect, useState } from "react";
import TeacherTemplate from "./TeacherTemplate";
import SectionTemplateVer2 from "./SectionTemplateVer2";
import ResourceDetailVer2 from "../CourseResource/ResourceDetail";
import {
  getResourcesAPI,
  deleteResourceAPI,
  addResourceAPI,
  updateResourceAPI,
} from "../../services/resourcesCourse";
import {
  emptyInfoOf,
  ICourseResource,
  newlyCreatedResourceId,
} from "../../types/resourceType";
import ReactModal from "react-modal";
import { ResourceType } from "../types/class-resource";
import { set } from "react-hook-form";
import {
  AddCourseResourceRequestBody,
  UpdateCourseResourceRequestBody,
} from "../../services/resourceType";

interface TeacherProps {
  name: string;
  email: string;
}

interface CourseClassProps {
  name: string;
  isTeacher: boolean;
  courseData: any;
}

const MainCourse: React.FC<CourseClassProps> = ({
  name,
  isTeacher,
  courseData,
}) => {
  const [isEditResourceEnabled, setIsEditResourceEnabled] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<ICourseResource | null>(null);
  const teachersDetails = courseData.teacherDetails.map((teacher: any) => ({
    name: `${teacher.firstName} ${teacher.lastName}`,
    email: teacher.email,
  }));

  const [resources, setResources] = useState<ICourseResource[]>([]);
  const [sections, setSections] = useState<string[]>([]);

  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const [deletingResource, setDeletingResource] =
    useState<ICourseResource | null>(null);

  useEffect(() => {
    getResourcesAPI(courseData.slug)
      .then((res) => {
        setResources(res);

        const existingSections = new Set<string>();
        const sections = res
          .map((resource) => {
            if (
              resource.sectionLabel &&
              !existingSections.has(resource.sectionLabel)
            ) {
              existingSections.add(resource.sectionLabel as string);
            }
            return resource.sectionLabel;
          })
          .filter((section) => section !== undefined);
        setSections(Array.from(existingSections));
      })
      .catch((err) => {
        console.log("Error in MainCourse: ", err.message);
      });
  }, [courseData.slug]);

  const handleViewResourceDetail = (resource: ICourseResource) => {
    setSelectedResource(resource);
  };

  const handleEditResource = (resource: ICourseResource) => {
    setIsEditResourceEnabled(true);
    setSelectedResource(resource);
  };

  const handleDeleteResource = (resource: ICourseResource) => {
    deleteResourceAPI(courseData.slug, resource._id)
      .then((deletedResource) => {
        const updatedResources = resources.filter(
          (res) => res._id !== deletedResource._id
        );
        setResources(updatedResources);
      })
      .catch((err) => {
        alert("Failed to delete resource: " + err.message);
      });
  };

  const handleCreateNewResource = (
    sectionName: string,
    resourceType: ResourceType
  ) => {
    setIsEditResourceEnabled(true);
    setSelectedResource({
      _id: newlyCreatedResourceId,
      title: "New resource title",
      courseId: courseData.slug,
      resourceType: resourceType,
      resourceInfo: emptyInfoOf(resourceType),
      sectionLabel: sectionName,
    });
  };

  const handleSectionCreation = (sectionName: string) => {
    setSections([...sections, sectionName]);
  };

  const handleEditCompleted = (newResource: ICourseResource) => {
    setSelectedResource(null);
    setIsEditResourceEnabled(false);

    if (newResource._id === newlyCreatedResourceId) {
      const uploadBody: AddCourseResourceRequestBody = {
        title: newResource.title,
        resourceType: newResource.resourceType,
        resourceInfo: newResource.resourceInfo,
        sectionLabel: newResource.sectionLabel,
      };
      addResourceAPI(courseData.slug, uploadBody)
        .then((addedResourceId) => {
          const addedResource = { ...newResource, _id: addedResourceId };
          setResources([...resources, addedResource]);
        })
        .catch((err) => {
          alert("Failed to add new resource: " + err.message);
        });
      return;
    }

    const uploadBody: UpdateCourseResourceRequestBody = {
      title: newResource.title,
      resourceInfo: newResource.resourceInfo,
      sectionLabel: newResource.sectionLabel,
    };

    updateResourceAPI(courseData.slug, newResource._id, uploadBody)
      .then((updatedResource) => {
        const updatedResources = resources.map((res) =>
          res._id === updatedResource._id ? updatedResource : res
        );
        setResources(updatedResources);
      })
      .catch((err) => {
        alert("Failed to update resource: " + err.message);
      });
  };

  return (
    <div className="flex flex-col h-100 bg-gray-50">
      <div className="p-3 rounded-md border-1 mx-3 mt-3">
        <h1 className="text-2xl text-left font-bold text-blue-500">{name}</h1>
      </div>

      <div className="flex-grow p-3 overflow-hidden">
        <div className="grid grid-cols-10 gap-4 h-full">
          <div className="col-span-7 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
            {sections.map((section, index) => {
              const sectionResources = resources.filter(
                (resource) => resource.sectionLabel === section
              );

              return (
                <SectionTemplateVer2
                  key={index}
                  sectionTitle={section}
                  resources={sectionResources}
                  isEditable={isTeacher}
                  onViewDetail={handleViewResourceDetail}
                  onEdit={handleEditResource}
                  onDelete={(res) => setDeletingResource(res)}
                  onCreateNew={(res) => handleCreateNewResource(section, res)}
                />
              );
            })}

            <div className="text-center mt-4">
              <button
                onClick={() => setIsAddingSection(true)}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Thêm đề mục mới
              </button>
            </div>

            {selectedResource !== null && (
              <ReactModal
                isOpen={selectedResource !== null}
                onRequestClose={() => setSelectedResource(null)}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              >
                <ResourceDetailVer2
                  resource={selectedResource}
                  isEditing={isTeacher && isEditResourceEnabled}
                  onReturn={() => {
                    setSelectedResource(null);
                    setIsEditResourceEnabled(false);
                  }}
                  onEditCompleted={handleEditCompleted}
                />
              </ReactModal>
            )}

            <ReactModal
              isOpen={isAddingSection}
              onRequestClose={() => setIsAddingSection(false)}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              <h2 className="text-2xl font-bold mb-4">Nhập tên đề mục mới</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  className="border rounded px-3 py-2"
                  placeholder="Nhập tên mới ..."
                  required
                />
                <button
                  type="submit"
                  onClick={() => {
                    setIsAddingSection(false);
                    handleSectionCreation(newSectionName);
                    setNewSectionName("");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit"
                >
                  Ok
                </button>
              </div>
            </ReactModal>

            <ReactModal
              isOpen={deletingResource !== null}
              onRequestClose={() => setDeletingResource(null)}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              <h2 className="text-2xl font-bold mb-4">
                Thầy cô có muốn xóa thiệt hông
              </h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setDeletingResource(null);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit"
                >
                  Hông
                </button>
                <button
                  onClick={() => {
                    if (deletingResource) {
                      handleDeleteResource(deletingResource);
                    }
                    setDeletingResource(null);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit"
                >
                  Thiệt
                </button>
              </div>
            </ReactModal>
          </div>

          <aside className="col-span-3 p-4 bg-white border border-gray-300 rounded-lg border-1 overflow-y-auto hide-scrollbar">
            <div className="font-bold text-lg mb-4">Thông tin chung</div>
            <hr />
            <div className="font-bold text-lg py-1 text-left">Giáo viên: </div>
            <div className="flex flex-column justify-start text-left space-y-4 mt-2">
              {teachersDetails.map((teacher: TeacherProps, index: number) => (
                <TeacherTemplate
                  key={index}
                  name={teacher.name}
                  email={teacher.email}
                />
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
