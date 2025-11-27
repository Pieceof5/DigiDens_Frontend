// src/mockdata.js

export const users = [
  { id: 1, username: "admin", password: "admin123", role: "ADMIN", firstname: "Admin", lastname: "User", gradeLevel: "N/A" },
  { id: 2, username: "teacher1", password: "password123", role: "TEACHER", firstname: "Maija", lastname: "Erkola", gradeLevel: "N/A" },
  { id: 3, username: "teacher2", password: "password123", role: "TEACHER", firstname: "Jaakko", lastname: "Sippola", gradeLevel: "N/A" },
  { id: 4, username: "student1", password: "password123", role: "STUDENT", firstname: "Matti", lastname: "Heinonen", gradeLevel: "1", studentNumber: "S0001" },
  { id: 5, username: "student2", password: "password123", role: "STUDENT", firstname: "Veera", lastname: "Nukari", gradeLevel: "1", studentNumber: "S0002" },
  { id: 6, username: "student3", password: "password123", role: "STUDENT", firstname: "Oskari", lastname: "Laine", gradeLevel: "2", studentNumber: "S0003" },
  { id: 7, username: "student4", password: "password123", role: "STUDENT", firstname: "Liisa", lastname: "Virtanen", gradeLevel: "2", studentNumber: "S0004" },
  { id: 8, username: "student5", password: "password123", role: "STUDENT", firstname: "Janne", lastname: "Korhonen", gradeLevel: "1", studentNumber: "S0005" },
  { id: 9, username: "student6", password: "password123", role: "STUDENT", firstname: "Sanna", lastname: "Mäkinen", gradeLevel: "3", studentNumber: "S0006" },
  { id: 10, username: "student7", password: "password123", role: "STUDENT", firstname: "Eero", lastname: "Lehtonen", gradeLevel: "2", studentNumber: "S0007" },
  { id: 11, username: "student8", password: "password123", role: "STUDENT", firstname: "Anni", lastname: "Hakala", gradeLevel: "1", studentNumber: "S0008" },
  { id: 12, username: "student9", password: "password123", role: "STUDENT", firstname: "Petri", lastname: "Salmi", gradeLevel: "3", studentNumber: "S0009" },
  { id: 13, username: "student10", password: "password123", role: "STUDENT", firstname: "Kaisa", lastname: "Rantanen", gradeLevel: "2", studentNumber: "S0010" }
];

export const courses = [
  { id: 1, courseCode: "DENT-0002", name: "Kirurgia", gradeLevel: "2", teacherId: 2, studentIds: [6,7,10,13] },
  { id: 2, courseCode: "DENT-0003", name: "Hammaslääketieteen perusteet", gradeLevel: "1", teacherId: 3, studentIds: [4,5,8,11] },
  { id: 3, courseCode: "DENT-0004", name: "Kliininen harjoittelu", gradeLevel: "2", teacherId: 2, studentIds: [6,7,10,13] },
  { id: 4, courseCode: "DENT-0005", name: "Testikurssi ilman osallistujia", gradeLevel: "N/A", teacherId: null, studentIds: [] }
];
