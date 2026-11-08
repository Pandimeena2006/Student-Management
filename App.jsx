import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import { fetchStudents, addStudent } from "./api.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setError("");
      setStudents(await fetchStudents());
    } catch (e) {
      setError(e.message + " Is the backend running on port 8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (student) => {
    const saved = await addStudent(student);
    setStudents((prev) => [...prev, saved]);
  };

  return (
    <main className="page">
      <header className="page-head">
        <h1>Student management</h1>
        <p>{students.length} enrolled</p>
      </header>

      <div className="layout">
        <section className="panel">
          <h2>Add a student</h2>
          <StudentForm onSubmit={handleAdd} />
        </section>

        <section className="panel">
          <h2>All students</h2>
          {error && <p className="error">{error}</p>}
          <StudentList students={students} loading={loading} />
        </section>
      </div>
    </main>
  );
}
