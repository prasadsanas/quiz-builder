import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/Signup" element={<RegisterPage />} exact />
          <Route element={<PrivateRoutes />}>
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default AppRouter;
