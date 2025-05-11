
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursePage from "./pages/CoursePage";
import CourseNotFound from "./pages/CourseNotFound";
import CreatorStudio from "./pages/CreatorStudio";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Explore from "./pages/Explore";
import AITutorBuilder from "./pages/AITutorBuilder";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/course-not-found/:courseId" element={<CourseNotFound />} />
            <Route path="/creator-studio" element={<CreatorStudio />} />
            <Route path="/profile/:userId/:role" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/ai-tutor-builder" element={<AITutorBuilder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
