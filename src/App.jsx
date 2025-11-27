import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardPage from "./pages/TeacherAddCardPage";
import StudentFrontPage from "./pages/StudentFrontPage";
import TeacherYearsPage from "./pages/TeacherYearsPage";
import TeacherGroupsPage from "./pages/TeacherGroups.page";
import TeacherStudentListPage from "./pages/TeacherStudentListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacherYears" element={<TeacherYearsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses" element={<TeacherCoursesPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseName" element={<TeacherGroupsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseName/teacherCards" element={<TeacherAddCardPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseName/group/:groupId" element={<TeacherStudentListPage />} />
        <Route path="/studentCourses" element={<StudentFrontPage />} />
      </Routes>
    </Router>
  );
}

export default App;
