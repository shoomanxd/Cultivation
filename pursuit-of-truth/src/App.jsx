import { useState, useEffect, useRef } from "react";
import { REALMS, TABS, SU_MING_IMG } from "./data/constants";
import { initialState, reducer } from "./utils/state";

import ParticleCanvas from "./components/ParticleCanvas";
import AuraRing from "./components/AuraRing";
import BreakthroughOverlay from "./components/BreakthroughOverlay";
import NotificationToast from "./components/NotificationToast";
import LandingPage from "./components/LandingPage";
import DashboardView from "./components/DashboardView";
import ChaptersView from "./components/ChaptersView";
import TimerView from "./components/TimerView";
import RealmsView from "./components/RealmsView";
import ExamsView from "./components/ExamsView";
import TasksView from "./components/TasksView";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [stateData, setStateData] = useState(initialState);
  const [notification, setNotification] = useState(null);
  const [breakthrough, setBreakthrough] = useState(null);
  const prevRealmRef = useRef(null);

  function dispatchAction(action) {
    setStateData(prev => {
      const next = reducer(prev, action);
      localStorage.setItem("pot_cultivation", JSON.stringify(next));
      return next;
    });
  }

  const realmIndex = REALMS.findIndex((r, i) => {
    const next = REALMS[i + 1];
    return !next || stateData.totalExp < next.exp_required;
  });
  const realm = REALMS[Math.max(0, realmIndex)];

  useEffect(() => {
    if (prevRealmRef.current !== null && prevRealmRef.current !== realmIndex && realmIndex > prevRealmRef.current) {
      setBreakthrough(realm);
      setNotification(null);
    } else if (prevRealmRef.current !== null && prevRealmRef.current !== realmIndex) {
      setNotification({ msg: "You have broken through into " + realm.name + "!", glow: realm.glow });
    }
    prevRealmRef.current = realmIndex;
  }, [realmIndex]);

  useEffect(() => {
    const totalChapters = Object.values(stateData.chapters).reduce(
      (s, sub) => s + Object.values(sub).filter(Boolean).length,
      0
    );
    if (totalChapters > 0 && stateData.sessions.length > 0) {
      const lastMsg = "Your cultivation has stabilized. The Dao grows stronger.";
      if (!notification || notification.msg !== lastMsg) {
        if (stateData.todayExp > 0 && stateData.todayExp % 500 === 0) {
          setNotification({ msg: lastMsg, glow: realm.glow });
        }
      }
    }
  }, [stateData.totalExp]);

  if (showLanding) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet" />
      <LandingPage onEnter={() => setShowLanding(false)} />
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#050508", color: "#FFF", fontFamily: "'Cinzel', serif", position: "relative" }}>
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${realm.glow}11 0%, transparent 60%)` }} />
          <ParticleCanvas realmIndex={realmIndex} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto" }}>
          <header style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px", borderBottom: `1px solid ${realm.glow}22`,
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={SU_MING_IMG}
                alt="Su Ming"
                onError={e => { e.target.style.display = "none"; }}
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `1px solid ${realm.glow}` }}
              />
              <div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 14, color: "#FFF" }}>Pursuit of Truth</div>
                <div style={{ fontSize: 9, color: realm.glow, letterSpacing: 3 }}>CULTIVATION SYSTEM</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <AuraRing realm={realm} size={50} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#FFF", fontFamily: "'Cinzel', serif" }}>{realm.name}</div>
                <div style={{ fontSize: 9, color: realm.glow, letterSpacing: 2 }}>{stateData.totalExp.toLocaleString()} EXP</div>
              </div>
            </div>
          </header>

          <nav style={{ display: "flex", padding: "0 24px", borderBottom: `1px solid ${realm.glow}11`, overflow: "auto" }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "14px 20px", background: "transparent", border: "none",
                  borderBottom: tab === t.id ? `2px solid ${realm.glow}` : "2px solid transparent",
                  color: tab === t.id ? realm.glow : "#444", fontFamily: "'Cinzel', serif",
                  fontSize: 11, letterSpacing: 2, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>

          <main>
            {tab === "dashboard" && <DashboardView state={stateData} realm={realm} realmIndex={realmIndex} />}
            {tab === "chapters" && <ChaptersView state={stateData} dispatch={dispatchAction} realm={realm} />}
            {tab === "timer" && <TimerView state={stateData} dispatch={dispatchAction} realm={realm} />}
            {tab === "realms" && <RealmsView state={stateData} realmIndex={realmIndex} realm={realm} />}
            {tab === "exams" && <ExamsView state={stateData} dispatch={dispatchAction} realm={realm} />}
            {tab === "tasks" && <TasksView state={stateData} dispatch={dispatchAction} realm={realm} />}
          </main>

          <footer style={{ padding: "32px 24px", borderTop: `1px solid ${realm.glow}11`, textAlign: "center" }}>
            <div style={{ color: "#222", fontSize: 10, letterSpacing: 4 }}>
              PURSUIT OF TRUTH · CULTIVATION SYSTEM · THE DAO DOES NOT WAIT
            </div>
          </footer>
        </div>

        {notification && (
          <NotificationToast msg={notification.msg} glow={notification.glow} onDone={() => setNotification(null)} />
        )}
        {breakthrough && (
          <BreakthroughOverlay realm={breakthrough} onDone={() => setBreakthrough(null)} />
        )}
      </div>
    </>
  );
}
