import React, { Suspense, lazy } from "react";
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
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const Portal = lazy(() => import("./pages/Portal"));
const BusinessAutomationPage = lazy(() => import("./pages/services/BusinessAutomationPage"));
const LegalTechPage = lazy(() => import("./pages/services/LegalTechPage"));
const AiIntegrationPage = lazy(() => import("./pages/services/AiIntegrationPage"));
const ManagedItPage = lazy(() => import("./pages/services/ManagedItPage"));
const EmergencySupportPage = lazy(() => import("./pages/services/EmergencySupportPage"));
const NetworkSecurityPage = lazy(() => import("./pages/services/NetworkSecurityPage"));
const WebAppsProjectsPage = lazy(() => import("./pages/projects/WebAppsProjectsPage"));
const ECommerceProjectsPage = lazy(() => import("./pages/projects/ECommerceProjectsPage"));
const MobileProjectsPage = lazy(() => import("./pages/projects/MobileProjectsPage"));
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
      <Route path="/admin/blog" component={AdminBlog} />
      
      {/* Service Pages */}
      <Route path="/services/business-automation" component={BusinessAutomationPage} />
      <Route path="/services/legal-tech" component={LegalTechPage} />
      <Route path="/services/ai-integration" component={AiIntegrationPage} />
      <Route path="/services/managed-it" component={ManagedItPage} />
      <Route path="/services/emergency-support" component={EmergencySupportPage} />
      <Route path="/services/network-security" component={NetworkSecurityPage} />

      {/* Project Pages */}
      <Route path="/projects/web-apps" component={WebAppsProjectsPage} />
      <Route path="/projects/e-commerce" component={ECommerceProjectsPage} />
      <Route path="/projects/mobile" component={MobileProjectsPage} />
      <Route path="/projects/it-solutions" component={ItSolutionsProjectsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {/* Portal routes without MainLayout */}
            <Route path="/portal/:rest*">
              <Toaster />
              <Portal />
            </Route>
            
            {/* All other routes with MainLayout */}
            <Route>
              <MainLayout>
                <Toaster />
                <Router />
              </MainLayout>
            </Route>
          </Switch>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;