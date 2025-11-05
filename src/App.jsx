import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/SelectCourse/LandingPage";
import DashBoard from './components/layout/DashBoard/DashBoard';
import LoginPage from './pages/Login/LoginPage';
import SignInPage from './pages/SignIn/SignInPage';
import WelcomePage from './pages/Welcome/WelcomePage';
import ProblemPage from './pages/Problem/ProblemPage';
import ResultsPage from './pages/Problem/ResultsPage';
import RecommendSelectPage from './components/SelectCourse/RecommendSelectPage';
import ContinueStudyPage from './pages/ContinueStudy/ContinueStudyPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashBoard />}>
          <Route index element={<WelcomePage />} />
          <Route path="/select-course" element={<LandingPage />} />
          <Route path="/select-recommend" element={<ProtectedRoute><RecommendSelectPage /></ProtectedRoute>} />
          <Route path="/continue-study" element={<ProtectedRoute><ContinueStudyPage /></ProtectedRoute>} />
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signIn" element={<SignInPage />} />
          </Route>
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/problem" element={<ProtectedRoute><ProblemPage /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;