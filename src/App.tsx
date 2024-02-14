import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import { ReactNode } from "react";

function checkRefreshToken() {
  const refreshToken = Cookies.get("refresh_token");
  return !!refreshToken;
}

function AuthenticatedRoute({ element }: { element: ReactNode }) {
  const isAuthenticated = checkRefreshToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <AuthenticatedRoute element={<Home />} />
            </Layout>
          }
        >
          <Route index element={<AuthenticatedRoute element={<Home />} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
