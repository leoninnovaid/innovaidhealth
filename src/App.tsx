import { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { LocaleProvider } from "@/i18n/LocaleContext";

const Index = lazy(() => import("./pages/Index.tsx"));
const Impressum = lazy(() => import("./pages/Impressum.tsx"));
const Datenschutz = lazy(() => import("./pages/Datenschutz.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <TooltipProvider>
    <HashRouter>
      <LocaleProvider>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LocaleProvider>
    </HashRouter>
  </TooltipProvider>
);

export default App;
