import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          {/* We'll add /audit, /report etc. here later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
