import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Spinner } from "./components/ui/Spinner";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetails";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/coin/:coinId", element: <CoinDetail /> },
];

function App() {
  const { loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Layout>{element}</Layout>
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
