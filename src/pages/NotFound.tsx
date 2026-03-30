import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  console.error("404 Error: User attempted to access non-existent route:", location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Seite nicht gefunden</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
