import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import LocaleLink from "@/components/LocaleLink";
import { useI18n } from "@/i18n/LocaleContext";

const NotFound = () => {
  const location = useLocation();
  const { copy } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">{copy.notFound.text}</p>
        <LocaleLink to="/" className="text-primary underline hover:text-primary/90">
          {copy.notFound.back}
        </LocaleLink>
      </div>
    </div>
  );
};

export default NotFound;
