import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import AuditPage from "./pages/AuditPage";
import AuditReportPage from "./pages/AuditReportPage";
import DocsPage from "./pages/DocsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="report" element={<AuditReportPage />} />
          <Route path="report/:reportId" element={<AuditReportPage />} />
          <Route path="docs" element={<DocsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
