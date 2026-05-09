import { REALMS, SUBJECTS, TITLES } from "../data/constants";
import StatCard from "./StatCard";

export default function DashboardView({ state, realm, realmIndex }) {
  const totalChapters = Object.values(state.chapters).reduce(
    (sum, subj) => sum + Object.values(subj).filter(Boolean).length,
    0
  );
  const totalPossible = Object.values(SUBJECTS).reduce((s, subj) => s + subj.chapters.length, 0);
  const nextRealm = REALMS[realmIndex + 1];
  const expProgress = nextRealm
    ? ((state.totalExp - realm.exp_required) / (nextRealm.exp_required - realm.exp_required)) * 100
    : 100;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
        <StatCard label="Current Realm" value={realm.name.split(" — ")[0].split(" ").slice(0, 2).join(" ")} glow={realm.glow} />
        <StatCard label="Total EXP" value={state.totalExp.toLocaleString()} glow={realm.glow} />
        <StatCard label="Study Hours" value={state.totalHours.toFixed(1) + "h"} glow={realm.glow} />
        <StatCard label="Current Streak" value={state.streak + " days"} glow={realm.glow} />
        <StatCard label="Chapters Done" value={`${totalChapters}/${totalPossible}`} glow={realm.glow} />
        <StatCard label="Today's XP" value={state.todayExp} glow={realm.glow} />
      </div>

      <div style={{
        background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}33`,
        borderRadius: 12, padding: 20, marginBottom: 24,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#aaa", fontSize: 12, fontFamily: "'Cinzel', serif" }}>
            Cultivation Progress → {nextRealm?.name || "Supreme Peak"}
          </span>
          <span style={{ color: realm.glow, fontSize: 12 }}>{Math.round(expProgress)}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "#111" }}>
          <div style={{
            width: `${Math.min(expProgress, 100)}%`, height: "100%", borderRadius: 4,
            background: `linear-gradient(90deg, ${realm.color}, ${realm.glow})`,
            boxShadow: `0 0 10px ${realm.glow}`, transition: "width 1s",
          }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {Object.entries(SUBJECTS).map(([name, subj]) => {
          const done = Object.values(state.chapters[name] || {}).filter(Boolean).length;
          const pct = Math.round((done / subj.chapters.length) * 100);
          return (
            <div key={name} style={{
              background: "rgba(255,255,255,0.02)", border: `1px solid ${subj.glow}33`,
              borderRadius: 12, padding: 16,
            }}>
              <div style={{ color: subj.color, fontSize: 13, fontFamily: "'Cinzel', serif", marginBottom: 8 }}>{name}</div>
              <div style={{ height: 4, borderRadius: 2, background: "#111", marginBottom: 6 }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: subj.color }} />
              </div>
              <div style={{ color: "#666", fontSize: 11 }}>{done}/{subj.chapters.length} chapters — {pct}%</div>
            </div>
          );
        })}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}22`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ color: realm.glow, fontSize: 11, letterSpacing: 3, fontFamily: "'Cinzel', serif", marginBottom: 12 }}>
          ACTIVE TITLES
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {state.titles.map(t => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: 20, background: realm.glow + "22",
              border: `1px solid ${realm.glow}44`, color: realm.glow, fontSize: 11,
              fontFamily: "'Cinzel', serif",
            }}>
              {TITLES.find(x => x.id === t)?.name || t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
