import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { Admin } from "./admin/index";
import { ListAdmin } from "./components/list";
import { Home } from "./pages";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      {location.pathname === "/admin" ? (
        <Route path="/admin" element={<Admin />} />
      ) : location.pathname === "/admin/users" ? (
        <Route path="/admin/users" element={<ListAdmin />} />
      ) : (
        <Route path="/" element={<Home />} />
      )}
      <Route
        path="*"
        element={
          <Navigate to={location.pathname === "/admin" ? "/admin" : "/"} />
        }
      />
    </Routes>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </ChakraProvider>
  );
};
