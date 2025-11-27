import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherAddCard from "../components/TeacherAddCard";

function TeacherAddCardPage() {
  const { courseName } = useParams();

  return (
    <TeacherAddCard
      courseName={courseName}
    />
  );
}

export default TeacherAddCardPage;
