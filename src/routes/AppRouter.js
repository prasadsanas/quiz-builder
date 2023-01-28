import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import AttemptQuiz from "../components/AttemptQuiz";
import { AuthProvider } from "../components/contexts/AuthContext";
import DashboardPage from "../screens/Dashboard/DashboardPage";
import LoginPage from "../screens/LoginPage/LoginPage";
import RegisterPage from "../screens/RegisterPage/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} exact />
          <Route path="/Signup" element={<RegisterPage />} />
          <Route path="/Quiz/:permalinks" element={<AttemptQuiz />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default AppRouter;
