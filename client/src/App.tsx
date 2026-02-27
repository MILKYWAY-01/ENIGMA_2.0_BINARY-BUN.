import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/dashboard";
import Patients from "@/pages/patients";
import PatientDetail from "@/pages/patient-detail";
import ScreeningWizard from "@/pages/screening-wizard";
import ScreeningResult from "@/pages/screening-result";
import AccuracyReport from "@/pages/accuracy-report";
import ValidationFramework from "@/pages/validation-framework";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/patients" component={Patients}/>
      <Route path="/patients/:id" component={PatientDetail}/>
      <Route path="/patients/:id/screen" component={ScreeningWizard}/>
      <Route path="/screenings/:id" component={ScreeningResult}/>
      <Route path="/reports/accuracy" component={AccuracyReport}/>
      <Route path="/reports/validation" component={ValidationFramework}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
