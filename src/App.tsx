import { HashRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import WissensindexPrototyp from "./pages/WissensindexPrototyp.tsx";
import WissensindexFrage from "./pages/WissensindexFrage.tsx";
import WissensindexKategorie from "./pages/WissensindexKategorie.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <TooltipProvider>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/wissensindex-beta" element={<WissensindexPrototyp />} />
        <Route path="/wissensindex-beta/kategorie/:categoryId" element={<WissensindexKategorie />} />
        <Route path="/wissensindex-beta/:slug" element={<WissensindexFrage />} />
        <Route path="/wissensindex" element={<WissensindexPrototyp />} />
        <Route path="/wissensindex/kategorie/:categoryId" element={<WissensindexKategorie />} />
        <Route path="/wissensindex/:slug" element={<WissensindexFrage />} />
        <Route path="/wissensindex-prototyp" element={<WissensindexPrototyp />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </TooltipProvider>
);

export default App;
