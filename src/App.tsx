
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const DirectorPage = lazy(() => import("./pages/Director"));
const Contact = lazy(() => import("./pages/Contact"));
const Footprint = lazy(() => import("./pages/Footprint"));
const PremiumFleet = lazy(() => import("./pages/PremiumFleet"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading indicator
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transport-blue mx-auto"></div>
      <p className="mt-4 text-transport-gray">Loading...</p>
    </div>
  </div>
);

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

// Root App component
const App = () => {
  // Debug logs for initialization
  useEffect(() => {
    console.log("[APP] App component mounted");
    console.log("[APP] Using HashRouter for routing");
    console.log("[APP] Current URL:", window.location.href);
    console.log("[APP] Current pathname:", window.location.pathname);
    console.log("[APP] Current hash:", window.location.hash);
    
    // Check if DOM is fully loaded
    console.log("[APP] Document readyState:", document.readyState);
    console.log("[APP] Body children:", document.body.children.length);
    console.log("[APP] Root element:", document.getElementById("root"));

    // Force a re-render if needed on hash change
    const handleHashChange = () => {
      console.log("[APP] Hash changed:", window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/director" element={<DirectorPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/footprint" element={<Footprint />} />
              <Route path="/fleet" element={<PremiumFleet />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </HashRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
