
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesPage from "./pages/Services";
import DirectorPage from "./pages/Director";
import Contact from "./pages/Contact";
import Footprint from "./pages/Footprint";
import PremiumFleet from "./pages/PremiumFleet";
import NotFound from "./pages/NotFound";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  console.log("App component rendering");
  console.log("Current route:", window.location.pathname);
  console.log("Query client options:", queryClient.getDefaultOptions());
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <HashRouter>
        <TooltipProvider delayDuration={300}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/director" element={<DirectorPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/footprint" element={<Footprint />} />
            <Route path="/fleet" element={<PremiumFleet />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
