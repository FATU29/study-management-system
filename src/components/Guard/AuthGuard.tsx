import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../helpers/Spinner";

interface TProps {
  children: ReactNode;
  roleRequires?: string[];
}

const AuthGuard = ({ children, roleRequires = [] }: TProps) => {
  const { user, loadingInAuth } = useAuth();
  const navigate = useNavigate();

  if (loadingInAuth || !user) {
    return <Spinner />;
  }

  if (!user) {
    navigate("/login", { replace: true });
    return;
  }


  if (user.role && !roleRequires.includes(user.role as string)) {
    navigate("/no-access", { replace: true });
    return;
  }

  if (user.verify === 0) {
    navigate("/login", { replace: true });
    return;
  }

  

  return <>{children}</>;
};

export default AuthGuard;
