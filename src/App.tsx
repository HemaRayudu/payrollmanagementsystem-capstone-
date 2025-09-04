import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Pages
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import EmployeeManagement from "@/pages/admin/EmployeeManagement";
import DepartmentManagement from "@/pages/admin/DepartmentManagement";
import PayrollManagement from "@/pages/admin/PayrollManagement";
import LeaveManagement from "@/pages/admin/LeaveManagement";
import JobManagement from "@/pages/admin/JobManagement";
import ReportsAnalytics from "@/pages/admin/ReportsAnalytics";
import EmployeeProfile from "@/pages/employee/EmployeeProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <EmployeeManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <DepartmentManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payroll"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <PayrollManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leave"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <LeaveManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <JobManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout>
                    <ReportsAnalytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <DashboardLayout>
                    <EmployeeDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <DashboardLayout>
                    <EmployeeProfile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/leave"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <DashboardLayout>
                    <div className="p-6">
                      <h1 className="text-3xl font-bold">My Leave Requests</h1>
                      <p className="text-muted-foreground mt-2">Apply for leave and track your requests.</p>
                      <div className="mt-6 text-center text-muted-foreground">
                        Leave request features coming soon...
                      </div>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/salary"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <DashboardLayout>
                    <div className="p-6">
                      <h1 className="text-3xl font-bold">My Salary Slips</h1>
                      <p className="text-muted-foreground mt-2">View and download your salary slips.</p>
                      <div className="mt-6 text-center text-muted-foreground">
                        Salary slip features coming soon...
                      </div>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to appropriate dashboard or login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
