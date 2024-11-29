import { useSearchParams } from "react-router-dom";
import AssignmentPage from "../../pages/AssignmentPage";
import { Modal } from "@mui/material";
import ModalTest from "../../pages/ModalTest";

const ResourceUploadDispatcher: React.FC = () => {
  const [searchParams] = useSearchParams();

  const resourceType = searchParams.get("type");
  const label = searchParams.get("label");
  const classId = searchParams.get("classId");

  if (!resourceType || !label || !classId) {
    return <div>404: Wrong/Unsufficient arguments</div>;
  }

  switch (resourceType) {
    case "assignment":
      return <AssignmentPage label={label} classId={classId} />;
    case "document":
      return <ModalTest />;
    default:
      return (
        <div>
          Resource page for type "{resourceType}" not created yet ahihi!
        </div>
      );
  }
};

export default ResourceUploadDispatcher;
