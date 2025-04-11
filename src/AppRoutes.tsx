import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Pricing } from './pages/Pricing';
import { Teams } from './pages/Teams';
import { Mentorship } from './pages/Mentorship';
import SignIn from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import ForgotPassword from './pages/Forgot';
import ResetPassword from './pages/Reset';
import FormTeam from './pages/Form';
import Collaborator from './pages/collab';
import ProtectedRoute from './components/ProtectedRoute';
import LearningHub from './pages/LearningHub';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/pricing"
        element={
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentorship"
        element={
          <ProtectedRoute>
            <Mentorship />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-hub"
        element={
          <ProtectedRoute>
            <LearningHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="/formteam"
        element={
          <ProtectedRoute>
            <FormTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collab"
        element={
          <ProtectedRoute>
            <Collaborator />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
