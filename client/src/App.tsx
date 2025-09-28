import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminBlog from "./pages/AdminBlog";
import Portal from "./pages/Portal";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BusinessAutomationPage from "./pages/services/BusinessAutomationPage";
import LegalTechPage from "./pages/services/LegalTechPage";
import AiIntegrationPage from "./pages/services/AiIntegrationPage";
import ManagedItPage from "./pages/services/ManagedItPage";
import EmergencySupportPage from "./pages/services/EmergencySupportPage";
import NetworkSecurityPage from "./pages/services/NetworkSecurityPage";
import WebAppsProjectsPage from "./pages/projects/WebAppsProjectsPage";
import ECommerceProjectsPage from "./pages/projects/ECommerceProjectsPage";
import MobileProjectsPage from "./pages/projects/MobileProjectsPage";
import ItSolutionsProjectsPage from "./pages/projects/ItSolutionsProjectsPage";

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

      {/* Portal routes - these don't use MainLayout */}
      <Route path="/portal/:rest*">
        <Portal />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;