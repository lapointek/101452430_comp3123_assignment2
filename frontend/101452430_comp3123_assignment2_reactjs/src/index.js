import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeComponents from "./pages/EmployeeComponents";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="employeecomponents" element={<EmployeeComponents />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
