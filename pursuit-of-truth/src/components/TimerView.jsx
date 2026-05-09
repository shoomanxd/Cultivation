import { useState, useRef, useEffect } from "react";
import { SUBJECTS } from "../data/constants";
import { btnStyle, selectStyle } from "../utils/styles";

const MODES = { pomodoro: 25 * 60, deep: 90 * 60, focus: 50 * 60 };

export default function TimerView({ state, dispatch, realm }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [sessionDone, setSessionDone] = useState(false);
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [focus, setFocus] = useState(3);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const total = MODES[mode];
  const pct = Math.min((seconds / total) * 100, 100);

  function finish() {
    setRunning(false);
    setSessionDone(true);
    const hrs = seconds / 3600;
    dispatch({ type: "ADD_SESSION", hours: hrs, subject, chapter: SUBJECTS[subject].chapters[chapter] });
  }

  if (sessionDone) return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 32, fontFamily: "'Cinzel', serif" }}>
      <div style={{ fontSize: 18, color: realm.glow, marginBottom: 24, textAlign: "center" }}>
        Session Complete — Log Your Cultivation
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={selectStyle(realm)}>
          {Object.keys(SUBJECTS).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={chapter} onChange={e => setChapter(+e.target.value)} style={selectStyle(realm)}>
          {SUBJECTS[subject].chapters.map((c, i) => <option key={i} value={i}>{c}</option>)}
        </select>
        <div style={{ color: "#aaa", fontSize: 12 }}>
          Difficulty (1–5): <span style={{ color: realm.glow }}>{difficulty}</span>
        </div>
        <input type="range" min={1} max={5} value={difficulty} onChange={e => setDifficulty(+e.target.value)} />
        <div style={{ color: "#aaa", fontSize: 12 }}>
          Focus Quality (1–5): <span style={{ color: realm.glow }}>{focus}</span>
        </div>
        <input type="range" min={1} max={5} value={focus} onChange={e => setFocus(+e.target.value)} />
        <button
          onClick={() => {
            dispatch({ type: "MARK_CHAPTER", subject, chapter: SUBJECTS[subject].chapters[chapter] });
            setSessionDone(false);
            setSeconds(0);
          }}
          style={btnStyle(realm)}
        >
          Mark Chapter as Studied & Save
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "32px 16px" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {Object.keys(MODES).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setSeconds(0); setRunning(false); }}
            style={{ ...btnStyle(realm), opacity: mode === m ? 1 : 0.4, fontSize: 11 }}
          >
            {m === "pomodoro" ? "Pomodoro 25m" : m === "deep" ? "Deep Work 90m" : "Focus 50m"}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", width: 220, height: 220 }}>
        <svg viewBox="0 0 220 220" width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="110" cy="110" r="100" fill="none" stroke={realm.glow + "22"} strokeWidth="6" />
          <circle
            cx="110" cy="110" r="100" fill="none" stroke={realm.glow} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 100}`}
            strokeDashoffset={`${2 * Math.PI * 100 * (1 - pct / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#FFF", fontFamily: "'Cinzel Decorative', serif" }}>
            {fmt(seconds)}
          </div>
          <div style={{ fontSize: 10, color: realm.glow, letterSpacing: 3 }}>{mode.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => setRunning(r => !r)} style={{ ...btnStyle(realm), minWidth: 120 }}>
          {running ? "⏸ Pause" : "▶ Begin Cultivation"}
        </button>
        {seconds > 0 && (
          <button onClick={finish} style={{ ...btnStyle(realm), background: realm.glow + "22" }}>
            Complete Session
          </button>
        )}
      </div>

      <div style={{ textAlign: "center", color: "#666", fontSize: 12, fontFamily: "'Cinzel', serif" }}>
        Every second of study is cultivation energy.<br />The Dao does not wait.
      </div>
    </div>
  );
}
