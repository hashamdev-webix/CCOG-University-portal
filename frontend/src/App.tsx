import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
import BusinessProfessionalSkillsPage from "./pages/courses/BusinessProfessionalSkillsPage.tsx";
import TechnologyDigitalSkillsPage from "./pages/courses/TechnologyDigitalSkillsPage.tsx";

import CourseDetails from "./pages/courses/CourseDetails.tsx";
import HowToApply from "./pages/HowToApply.tsx";
import Requirements from "./pages/Requirements.tsx";
import FeesScholarships from "./pages/FeeScholarships.tsx";
import CampusLife from "./pages/CampusLife.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import StudentSupport from "./pages/StudentSupport.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import ArticlesPage from "./pages/ArticlesPage.tsx";
import PublicationsPage from "./pages/PublicationsPage.tsx";
import PaymentSuccess from "@/pages/PaymentSuccess.tsx";
import PaymentCancel from "@/pages/PaymentCancel.tsx";
import Articles from "./pages/admin/Articles.tsx";
import InsightDetails from "./pages/InsightDetails.tsx";
import ContactMessagesPage from "./pages/admin/ContactMessagesPage.tsx";
import CreativeArtsMediaPage from "./pages/courses/CreativeArtsMediaPage.tsx";
import EducationCertificationProgramsPage from "./pages/courses/EducationCertificationProgramsPage.tsx";
import HealthcareExamPreparationPage from "./pages/courses/HealthcareExamPreparationPage.tsx";
import HospitalityServiceIndustryPage from "./pages/courses/HospitalityServiceIndustryPage.tsx";
import LanguageCommunicationPage from "./pages/courses/LanguageCommunicationPage.tsx";
import LogisticsTransportationPage from "./pages/courses/LogisticsTransportationPage.tsx";
import SafetySecurityCompliancePage from "./pages/courses/SafetySecurityCompliancePage.tsx";
import FreeShortCoursesPage from "./pages/courses/FreeShortCoursesPage.tsx";
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
       <Toaster position="top-right" />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/courses" element={<CoursesPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
 <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/payment-cancel" element={<PaymentCancel />} />
             {/* Courses */}


      <Route path="/courses/business-professional-skills" element={<BusinessProfessionalSkillsPage />} />
      <Route path="/courses/technology-digital-skills" element={<TechnologyDigitalSkillsPage />} />
      <Route path="/courses/free-short-courses" element={<FreeShortCoursesPage />} />
      <Route path="/courses/creative-arts-media" element={<CreativeArtsMediaPage />} />
      <Route path="/courses/education-certification-programs" element={<EducationCertificationProgramsPage />} />
      <Route path="/courses/healthcare-exam-preparation" element={<HealthcareExamPreparationPage />} />
      <Route path="/courses/hospitality-service-industry" element={<HospitalityServiceIndustryPage />} />
      <Route path="/courses/language-communication" element={<LanguageCommunicationPage />} />
      <Route path="/courses/logistics-transportation" element={<LogisticsTransportationPage />} />
      <Route path="/courses/safety-security-compliance" element={<SafetySecurityCompliancePage />} />
      <Route path="/courses/details/:id" element={<CourseDetails />} />






 <Route path="/admissions/how-to-apply" element={<HowToApply />} />
      <Route path="/admissions/requirements" element={<Requirements />} />
      <Route path="/admissions/fees-scholarships" element={<FeesScholarships />} />

      <Route path="/student-life/campus-life" element={<CampusLife />} />
      <Route path="/student-life/events" element={<EventsPage />} />
      <Route path="/student-life/student-support" element={<StudentSupport />} />

      <Route path="/research/news" element={<NewsPage />} />
      <Route path="/research/articles" element={<ArticlesPage />} />
      <Route path="/research/publications" element={<PublicationsPage />} />
      <Route path="/insights/:slug" element={<InsightDetails />} />
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
              <Route path="articles" element={<Articles />} />
              <Route path="contact-messages" element={<ContactMessagesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
