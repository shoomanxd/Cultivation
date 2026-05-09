import { useState } from "react";
import { btnStyle, inputStyle } from "../utils/styles";

export default function ExamsView({ state, dispatch, realm }) {
  const [exams, setExams] = useState(state.exams || []);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", date: "" });

  function addExam() {
    if (!form.name.trim()) return;
    const newExams = [...exams, { ...form, id: Date.now() }];
    setExams(newExams);
    dispatch({ type: "SET_EXAMS", exams: newExams });
    setCreating(false);
    setForm({ name: "", type: "", date: "" });
  }

  function removeExam(id) {
    const newExams = exams.filter(e => e.id !== id);
    setExams(newExams);
    dispatch({ type: "SET_EXAMS", exams: newExams });
  }

  function getDaysLeft(dateStr) {
    if (!dateStr) return "?";
    const d = new Date(dateStr) - new Date();
    return Math.max(0, Math.ceil(d / 86400000));
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ color: realm.glow, fontFamily: "'Cinzel', serif" }}>Tribulation Exams</span>
        <button onClick={() => setCreating(true)} style={btnStyle(realm)}>+ Add Tribulation</button>
      </div>

      {creating && (
        <div style={{
          background: "rgba(255,255,255,0.03)", border: `1px solid ${realm.glow}44`,
          borderRadius: 12, padding: 20, marginBottom: 20,
        }}>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              placeholder="Exam Name (e.g. JEE Mains)"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle(realm)}
            />
            <input
              placeholder="Exam Type (e.g. JEE, NEET, MHT CET…)"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              style={inputStyle(realm)}
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ ...inputStyle(realm), colorScheme: "dark" }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addExam} style={btnStyle(realm)}>Add</button>
              <button
                onClick={() => { setCreating(false); setForm({ name: "", type: "", date: "" }); }}
                style={{ ...btnStyle(realm), opacity: 0.5 }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {exams.map(exam => (
          <div key={exam.id} style={{
            background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}33`,
            borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 16, marginBottom: 4 }}>{exam.name}</div>
              {exam.type && <div style={{ color: "#666", fontSize: 12 }}>{exam.type} Tribulation</div>}
              {exam.date && (
                <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>
                  {new Date(exam.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div>
                <div style={{ color: realm.glow, fontSize: 28, fontFamily: "'Cinzel Decorative', serif" }}>
                  {getDaysLeft(exam.date)}
                </div>
                <div style={{ color: "#555", fontSize: 10, letterSpacing: 2 }}>DAYS REMAIN</div>
              </div>
              <button
                onClick={() => removeExam(exam.id)}
                style={{ ...btnStyle(realm), fontSize: 10, padding: "4px 10px", opacity: 0.5 }}
              >Remove</button>
            </div>
          </div>
        ))}
        {exams.length === 0 && (
          <div style={{ color: "#444", textAlign: "center", fontFamily: "'Cinzel', serif", padding: 32 }}>
            No tribulations set. The Dao awaits your trials.
          </div>
        )}
      </div>
    </div>
  );
}
