import React from "react";
import { useParams, useLocation } from "react-router-dom";
import TeacherAddCard from "../components/TeacherAddCard";

export default function TeacherAddCardPage() {
  const { teacherId, courseInstanceId } = useParams();
  const location = useLocation();
  const instance = location.state?.instance || null;

  if (!courseInstanceId) return <p>Kurssitoteutus ei ole määritelty.</p>;

  return (
    <TeacherAddCard
      courseName={instance?.courseName}
      courseInstanceId={courseInstanceId}
    />
  );
}
