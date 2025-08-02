import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BrowseCAs from "./pages/client/BrowseCAs";
import CAProfile from "./pages/client/CAProfile";
import HireCA from "./pages/client/HireCA";
import MyServices from "./pages/client/MyServices";
import ServiceDetails from "./pages/client/ServiceDetails";
import Notifications from "./pages/client/Notifications";
import CADashboard from "./pages/ca/Dashboard";
import CAClients from "./pages/ca/Clients";
import CAEarnings from "./pages/ca/Earnings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Client Routes */}
          <Route path="/client/browse" element={<BrowseCAs />} />
          <Route path="/client/ca/:id" element={<CAProfile />} />
          <Route path="/client/hire/:id" element={<HireCA />} />
          <Route path="/client/services" element={<MyServices />} />
          <Route path="/client/service/:id" element={<ServiceDetails />} />
          <Route path="/client/notifications" element={<Notifications />} />
          
          {/* CA Routes */}
          <Route path="/ca/dashboard" element={<CADashboard />} />
          <Route path="/ca/clients" element={<CAClients />} />
          <Route path="/ca/earnings" element={<CAEarnings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
