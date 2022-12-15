import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router } from "./domain";
import { Footer } from "./common";
import { AuthProvider } from "../context/AuthProvider";

export const App = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Router />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    <Footer />
  </>
);
