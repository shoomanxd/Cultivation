import { REALMS } from "../data/constants";

export default function RealmsView({ state, realmIndex, realm }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", fontFamily: "'Cinzel', serif", marginBottom: 20 }}>
        CULTIVATION REALM PATHWAY
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {REALMS.map((r, i) => {
          const unlocked = state.totalExp >= r.exp_required;
          const current = i === realmIndex;
          return (
            <div key={i} style={{
              padding: "14px 20px", borderRadius: 10,
              background: current ? r.glow + "22" : unlocked ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.5)",
              border: `1px solid ${current ? r.glow : unlocked ? r.glow + "44" : "#ffffff0a"}`,
              boxShadow: current ? `0 0 20px ${r.glow}33` : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "all 0.3s",
            }}>
              <div>
                <div style={{ color: current ? "#FFF" : unlocked ? r.glow : "#333", fontFamily: "'Cinzel', serif", fontSize: 13 }}>
                  {current ? "▶ " : ""}{r.name}
                </div>
                <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>
                  {r.exp_required.toLocaleString()} EXP · {r.min_hours}h · {r.min_chapters} chapters
                </div>
              </div>
              {current && (
                <span style={{ color: r.glow, fontSize: 10, letterSpacing: 3, fontFamily: "'Cinzel', serif" }}>CURRENT</span>
              )}
              {!current && unlocked && <span style={{ color: "#444", fontSize: 10 }}>✓</span>}
              {!unlocked && <span style={{ color: "#333", fontSize: 10 }}>🔒</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
