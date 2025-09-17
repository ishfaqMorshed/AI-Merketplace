import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import ChatbotProduct from "@/pages/chatbot-product";
import RecruitingProduct from "@/pages/recruiting-product";
import NotFound from "@/pages/not-found";
import AISolutionsPage from "@/pages/ai-solutions";
import AdminDashboard from "@/pages/admin-dashboard";
import ManageProducts from "@/pages/admin-products";
import EditHeroSection from "@/pages/admin-hero";
import EditPricing from "@/pages/admin-pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chatbot" component={ChatbotProduct} />
      <Route path="/chatbot-product" component={ChatbotProduct} />
      <Route path="/recruiting" component={RecruitingProduct} />
      <Route path="/recruiting-product" component={RecruitingProduct} />
      <Route path="/ai-solutions" component={AISolutionsPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/products" component={ManageProducts} />
      <Route path="/admin/hero" component={EditHeroSection} />
      <Route path="/admin/pricing" component={EditPricing} />
  <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
