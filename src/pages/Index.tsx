
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/contexts/RouterContext";
import { useEffect } from "react";

const Index = () => {
  const { user, isLoading } = useAuth();
  const { navigate } = useRouter();
  
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return null;
};

export default Index;
