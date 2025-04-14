import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherUpload from "./pages/TeacherUpload";
import NavBar from "./components/NavBar";
import ViewPortfolios from "./pages/ViewPorfolios";
import StudentUploadPage from "./pages/StudentUploadPage";
import ParentUpload from "./pages/ParentUpload";
import ParentPortfolioView from "./pages/ParentPortfolioView";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<TeacherUpload />} />
          <Route path="/view-porfolios" element={<ViewPortfolios />} />
          <Route path="/student-upload" element={<StudentUploadPage />} />
          <Route path="/parent-upload" element={<ParentUpload />} />
          <Route
            path="/parent-portfolio-view"
            element={<ParentPortfolioView />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
