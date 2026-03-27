import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

// Public Pages
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import CoursesPage from "./pages/CoursesPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import AdmissionsPage from "./pages/AdmissionsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

// Student Dashboard
import StudentLayout from "./pages/student/StudentLayout.tsx";
import StudentOverview from "./pages/student/StudentOverview.tsx";
import ApplicationPage from "./pages/student/ApplicationPage.tsx";
import DocumentsUploadPage from "./pages/student/DocumentsUploadPage.tsx";
import PaymentsStudentPage from "./pages/student/PaymentsStudentPage.tsx";
import OfferLetterPage from "./pages/student/OfferLetterPage.tsx";
import OnlineClassesPage from "./pages/student/OnlineClassesPage.tsx";
import StudentSettingsPage from "./pages/student/StudentSettingsPage.tsx";

// Admin Panel
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminOverview from "./pages/admin/AdminOverview.tsx";
import ApplicationsPage from "./pages/admin/ApplicationsPage.tsx";
import StudentsPage from "./pages/admin/StudentsPage.tsx";
import CoursesAdminPage from "./pages/admin/CoursesAdminPage.tsx";
import PaymentsPage from "./pages/admin/PaymentsPage.tsx";
import DocumentsPage from "./pages/admin/DocumentsPage.tsx";
import OffersPage from "./pages/admin/OffersPage.tsx";
import SettingsPage from "./pages/admin/SettingsPage.tsx";

const queryClient = new QueryClient();

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function StudentRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Student Dashboard */}
            <Route path="/dashboard" element={<StudentRoute><StudentLayout /></StudentRoute>}>
              <Route index element={<StudentOverview />} />
              <Route path="application" element={<ApplicationPage />} />
              <Route path="documents" element={<DocumentsUploadPage />} />
              <Route path="payments" element={<PaymentsStudentPage />} />
              <Route path="offer" element={<OfferLetterPage />} />
              <Route path="classes" element={<OnlineClassesPage />} />
              <Route path="settings" element={<StudentSettingsPage />} />
            </Route>

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="courses" element={<CoursesAdminPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="offers" element={<OffersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
