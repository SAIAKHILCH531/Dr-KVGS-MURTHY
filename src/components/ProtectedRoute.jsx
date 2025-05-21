import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setAuthenticated(!!user);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    if (loading) return <div className="p-4">Loading...</div>;
    if (!authenticated) return <Navigate to="/admin/login" replace />;
    return children;
  };
  export default ProtectedRoute;