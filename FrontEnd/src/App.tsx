import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./hooks/theme-provider";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignupPage";
import MainLayout from "./layouts/Main-Layout";
import HomePage from "./Pages/HomePage";
import VideoPage from "./Pages/VideoPlayPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { currUser, isCheckingAuth, checkUser } = useAuthStore();
  // const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const excludedPaths = ["/login", "/signUp"];

    if (excludedPaths.includes(currentPath) ) {
      return;
    }
    checkUser();
  }, [currentPath,checkUser]);

  if (isCheckingAuth && !currUser) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Toaster position="top-center" />

      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={currUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/X" element={<VideoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
