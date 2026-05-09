import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import AuditPage from "./pages/AuditPage";
import AuditReportPage from "./pages/AuditReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="report" element={<AuditReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
