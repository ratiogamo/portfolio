import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MainLayout from "@/components/MainLayout";
import { apiRequest } from "./lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize profile data when the app loads
    const initProfileData = async () => {
      try {
        // Use direct initialization instead of scraping
        await apiRequest("POST", "/api/initialize-profile", {
          name: 'James D',
          title: 'AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio',
          description: 'I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.',
          hourlyRate: '$59.25/hr',
          totalEarnings: '50+ Projects Completed',
          jobSuccessScore: 'Top-Rated Plus',
          totalJobs: 50,
          totalHours: 12000,
          profileUrl: 'https://www.upwork.com/freelancers/~01139a1ed402cf0463',
          responseTime: 'Quick',
          availability: 'More than 30 hrs/week',
          location: 'Miami, United States',
        });
      } catch (error) {
        console.error("Failed to initialize profile data:", error);
      }
    };

    initProfileData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MainLayout>
          <Toaster />
          <Router />
        </MainLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
