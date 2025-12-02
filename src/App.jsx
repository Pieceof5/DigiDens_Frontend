import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardPage from "./pages/TeacherAddCardPage";
import TeacherCourseInstancePage from "./pages/TeacherCourseInstancePage"; // uusi sivu
import TeacherStudentListPage from "./pages/TeacherStudentListPage";
import StudentFrontPage from "./pages/StudentFrontPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Opettajan kurssitoteutukset */}
        <Route path="/teacherCourses/:teacherId" element={<TeacherCoursesPage />} />

        {/* Yksittäisen kurssitoteutuksen sivu */}
        <Route
          path="/teacherCourses/:teacherId/:courseInstanceId"
          element={<TeacherCourseInstancePage />}
        />

        {/* Suoritekorttien hallinta */}
        <Route
          path="/teacherCourses/:teacherId/:courseInstanceId/teacherCards"
          element={<TeacherAddCardPage />}
        />

        {/* Opiskelijalista toteutuksella */}
        <Route
          path="/teacherCourses/:teacherId/:courseInstanceId/group/:groupId"
          element={<TeacherStudentListPage />}
        />

        {/* Opiskelijan etusivu */}
        <Route path="/studentCourses" element={<StudentFrontPage />} />
      </Routes>
    </Router>
  );
}

export default App;
