import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import AttemptQuiz from "../components/AttemptQuiz";
import { AuthProvider } from "../components/contexts/AuthContext";
import DashboardPage from "../screens/Dashboard/DashboardPage";
import LoginPage from "../screens/LoginPage/LoginPage";
import RegisterPage from "../screens/RegisterPage/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";
import InitialPage from "../screens/InitialPage/InitialPage.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<InitialPage />} exact />
          <Route path="/Quiz/:permalinks" element={<AttemptQuiz />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<InitialPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default AppRouter;
