import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import loginBg from "../images/Login.png";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container grid flex-1 items-center justify-center md:grid-cols-2 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="hidden h-full bg-muted md:block lg:col-span-1">
          <div
            className="flex h-full w-full items-center justify-center bg-muted  bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${loginBg})` }}
          ></div>
        </div>
        <div className="flex items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
