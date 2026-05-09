import { useState } from "react";
import { SUBJECTS } from "../data/constants";
import { btnStyle } from "../utils/styles";

export default function ChaptersView({ state, dispatch, realm }) {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const subj = SUBJECTS[activeSubject];
  const completed = state.chapters[activeSubject] || {};
  const completedCount = Object.values(completed).filter(Boolean).length;
  const total = subj.chapters.length;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {Object.keys(SUBJECTS).map(s => (
          <button key={s} onClick={() => setActiveSubject(s)}
            style={{ ...btnStyle(realm, activeSubject === s), background: activeSubject === s ? SUBJECTS[s].glow + "44" : "transparent" }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#111" }}>
          <div style={{
            width: `${(completedCount / total) * 100}%`, height: "100%", borderRadius: 2,
            background: subj.color, transition: "width 0.5s",
          }} />
        </div>
        <span style={{ color: subj.color, fontSize: 12, fontFamily: "'Cinzel', serif" }}>
          {completedCount}/{total} Chapters Comprehended
        </span>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {subj.chapters.map((ch, i) => {
          const done = !!completed[ch];
          return (
            <div key={i}
              onClick={() => dispatch({ type: "TOGGLE_CHAPTER", subject: activeSubject, chapter: ch })}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                background: done ? subj.glow + "22" : "rgba(255,255,255,0.02)",
                border: `1px solid ${done ? subj.color + "66" : "#ffffff11"}`,
                borderRadius: 8, cursor: "pointer", transition: "all 0.3s",
              }}>
              <div style={{
                width: 20, height: 20, borderRadius: 4, border: `2px solid ${subj.color}`,
                background: done ? subj.color : "transparent", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done && <span style={{ color: "#000", fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ color: done ? "#FFF" : "#888", fontSize: 13, fontFamily: "'Cinzel', serif" }}>
                {ch}
              </span>
              {done && (
                <span style={{ marginLeft: "auto", fontSize: 10, color: subj.color, letterSpacing: 2 }}>
                  COMPREHENDED
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
