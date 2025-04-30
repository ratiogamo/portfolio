import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import NotFound from "@/pages/not-found.tsx";
import Home from "@/pages/Home.tsx";
import MainLayout from "@/components/MainLayout.tsx";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
