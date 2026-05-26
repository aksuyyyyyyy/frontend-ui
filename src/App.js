import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

/* PAGE TRANSITION */

function PageWrapper({ children }) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -10,
      }}

      transition={{
        duration: 0.35,
      }}

      style={{
        width: "100%",
        height: "100%",
      }}
    >

      {children}

    </motion.div>
  );
}

/* CHECK AUTH */

function isAuthenticated() {

  return !!localStorage.getItem(
    "auth_user"
  );
}

/* PRIVATE ROUTE */

function PrivateRoute({ children }) {

  return isAuthenticated()
    ? children
    : (
      <Navigate
        to="/login"
        replace
      />
    );
}

/* PUBLIC ROUTE */

function PublicRoute({ children }) {

  return isAuthenticated()
    ? (
      <Navigate
        to="/dashboard"
        replace
      />
    )
    : children;
}

/* ROUTES */

function AnimatedRoutes() {

  const location =
    useLocation();

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* LANDING */}

        <Route
          path="/"
          element={
            <PageWrapper>

              <LandingPage />

            </PageWrapper>
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <PublicRoute>

              <PageWrapper>

                <LoginPage />

              </PageWrapper>

            </PublicRoute>
          }
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={
            <PublicRoute>

              <PageWrapper>

                <RegisterPage />

              </PageWrapper>

            </PublicRoute>
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>

              <PageWrapper>

                <Dashboard />

              </PageWrapper>

            </PrivateRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </AnimatePresence>
  );
}

/* APP */

export default function App() {

  return (

    <Router>

      <AnimatedRoutes />

    </Router>
  );
}