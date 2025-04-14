
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard immediately
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  // Return a loading state to avoid flickering
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-pulse text-intellilock-blue">
          Loading IntelliLock...
        </div>
      </div>
    </div>
  );
};

export default Index;
