import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts";
import HomePage from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
