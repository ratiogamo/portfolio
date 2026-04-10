import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import MainLayout from "./components/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BusinessAutomationPage = lazy(() => import("./pages/services/BusinessAutomationPage"));
const LegalTechPage = lazy(() => import("./pages/services/LegalTechPage"));
const AiIntegrationPage = lazy(() => import("./pages/services/AiIntegrationPage"));
const EmergencyRescuePage = lazy(() => import("./pages/services/EmergencySupportPage"));
const AgenticArchitecturePage = lazy(() => import("./pages/services/AgenticArchitecturePage"));
const PrivateLlmPage = lazy(() => import("./pages/services/PrivateLlmPage"));
const ItSolutionsProjectsPage = lazy(() => import("./pages/projects/ItSolutionsProjectsPage"));
const NotFound = lazy(() => import("./pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* Service Pages */}
      <Route path="/services/business-automation" component={BusinessAutomationPage} />
      <Route path="/services/legal-tech" component={LegalTechPage} />
      <Route path="/services/ai-integration" component={AiIntegrationPage} />
      <Route path="/services/emergency-rescue" component={EmergencyRescuePage} />
      <Route path="/services/agentic-architecture" component={AgenticArchitecturePage} />
      <Route path="/services/private-llm" component={PrivateLlmPage} />

      {/* Case Studies */}
      <Route path="/projects/case-studies" component={ItSolutionsProjectsPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <MainLayout>
            <Toaster />
            <Router />
          </MainLayout>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;