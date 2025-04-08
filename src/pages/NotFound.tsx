
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold text-transport-blue mb-4">404</h1>
        <p className="text-xl text-transport-gray mb-6">The page you are looking for could not be found</p>
        <p className="text-sm text-gray-500 mb-8">
          The page at <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code> does not exist
        </p>
        <Link to="/" className="inline-flex items-center bg-transport-orange text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
