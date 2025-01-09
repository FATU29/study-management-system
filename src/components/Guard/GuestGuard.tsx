import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../helpers/Spinner";

interface TProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: TProps) => {
  const { user, loadingInAuth } = useAuth();
  const navigate = useNavigate();
 
  if (user) {
    if (user.role === "USER") {
      navigate("/home", { replace: true });
    } else if (user.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if(user.role === "TEACHER"){
      navigate("/home", { replace: true });
    }
    return null; 
  }

   
  if (loadingInAuth || (user && !loadingInAuth)) {
    return <Spinner />;
  }
 
  return <>{children}</>;
};

export default GuestGuard;
