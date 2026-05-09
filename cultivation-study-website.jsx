import { useState, useEffect, useRef, useCallback } from "react";

const REALMS = [
  { name: "Blood Solidification", color: "#8B0000", glow: "#FF2222", min_hours: 0, min_chapters: 0, exp_required: 0, aura: "blood" },
  { name: "Awakening", color: "#4B0082", glow: "#9400D3", min_hours: 5, min_chapters: 5, exp_required: 500, aura: "awakening" },
  { name: "Bone Sacrifice", color: "#800020", glow: "#DC143C", min_hours: 15, min_chapters: 12, exp_required: 1500, aura: "crimson" },
  { name: "Berserker Soul — Initial", color: "#1a0050", glow: "#6600FF", min_hours: 30, min_chapters: 20, exp_required: 3000, aura: "cosmic" },
  { name: "Berserker Soul — Middle", color: "#00008B", glow: "#0044FF", min_hours: 50, min_chapters: 30, exp_required: 5000, aura: "cosmic" },
  { name: "Berserker Soul — Half-step into Later", color: "#003366", glow: "#0088FF", min_hours: 75, min_chapters: 45, exp_required: 8000, aura: "cosmic" },
  { name: "Berserker Soul — Later", color: "#002244", glow: "#00AAFF", min_hours: 100, min_chapters: 60, exp_required: 12000, aura: "cosmic" },
  { name: "Berserker Soul — Great Completion", color: "#001133", glow: "#00CCFF", min_hours: 130, min_chapters: 75, exp_required: 17000, aura: "cosmic" },
  { name: "Life Matrix", color: "#003300", glow: "#00FF88", min_hours: 170, min_chapters: 90, exp_required: 23000, aura: "life" },
  { name: "Life Privation", color: "#004400", glow: "#00FF44", min_hours: 220, min_chapters: 110, exp_required: 30000, aura: "life" },
  { name: "Life Palace", color: "#005500", glow: "#44FF00", min_hours: 280, min_chapters: 130, exp_required: 38000, aura: "life" },
  { name: "World of Life", color: "#006600", glow: "#88FF00", min_hours: 350, min_chapters: 150, exp_required: 47000, aura: "life" },
  { name: "Lunar Kalpa", color: "#1a1a4a", glow: "#AAAAFF", min_hours: 430, min_chapters: 170, exp_required: 57000, aura: "lunar" },
  { name: "Solar Kalpa", color: "#4a3a00", glow: "#FFDD00", min_hours: 520, min_chapters: 190, exp_required: 68000, aura: "solar" },
  { name: "Master of Fate, Lives, and Death", color: "#2a0a2a", glow: "#FF00FF", min_hours: 620, min_chapters: 210, exp_required: 80000, aura: "fate" },
  { name: "Rise and Fall of Fate", color: "#3a0020", glow: "#FF44AA", min_hours: 730, min_chapters: 230, exp_required: 93000, aura: "fate" },
  { name: "Reincarnation of Life", color: "#0a2a3a", glow: "#00FFFF", min_hours: 850, min_chapters: 250, exp_required: 107000, aura: "divine" },
  { name: "Death of the Universe", color: "#000000", glow: "#FFFFFF", min_hours: 980, min_chapters: 270, exp_required: 122000, aura: "void" },
  { name: "Sublime Paragon", color: "#1a0a00", glow: "#FFD700", min_hours: 1120, min_chapters: 290, exp_required: 138000, aura: "paragon" },
  { name: "Bhaashate — Early", color: "#2a1a00", glow: "#FFA500", min_hours: 1270, min_chapters: 310, exp_required: 155000, aura: "transcendent" },
  { name: "Bhaashate — Middle", color: "#3a2a00", glow: "#FF8C00", min_hours: 1430, min_chapters: 330, exp_required: 173000, aura: "transcendent" },
  { name: "Bhaashate — Late", color: "#4a3a00", glow: "#FF7F00", min_hours: 1600, min_chapters: 350, exp_required: 192000, aura: "transcendent" },
  { name: "Avacaniya — Early", color: "#1a0030", glow: "#E040FB", min_hours: 1800, min_chapters: 375, exp_required: 212000, aura: "supreme" },
  { name: "Avacaniya — Middle", color: "#2a0040", glow: "#CE93D8", min_hours: 2000, min_chapters: 400, exp_required: 233000, aura: "supreme" },
  { name: "Avacaniya — Late", color: "#3a0050", glow: "#BA68C8", min_hours: 2200, min_chapters: 425, exp_required: 255000, aura: "supreme" },
  { name: "Avacaniya — Peak", color: "#4a0060", glow: "#AB47BC", min_hours: 2500, min_chapters: 450, exp_required: 280000, aura: "supreme" },
];

const SUBJECTS = {
  Physics: {
    color: "#00AAFF",
    glow: "#0066CC",
    chapters: [
      "Kinematics 1D","Kinematics 2D","NLM","Circular Motion","WPE",
      "COM, Collision, Momentum","Rotational Mechanics","KTG & Thermodynamics","SHM","Waves",
      "Heat Transfer","Modern Physics – 1 (Dual Nature of matter and Radiation, Atoms)",
      "Modern Physics – 2 (Nuclei)","Ray Optics","Current Electricity",
      "Magnetic Effects of Current and Magnetism","EMI","Electrostatics","Gravitation","Capacitance",
      "Fluid","Elasticity","Calorimetry","Thermal Expansion","EM Waves","Wave Optics","AC",
      "Semiconductors","Unit, Dimension and Error Analysis"
    ]
  },
  Chemistry: {
    color: "#00FF99",
    glow: "#006633",
    chapters: [
      "SBC X Solution","Atomic Structure","Periodicity","Chemical Bonding","GOC","Stereochemistry",
      "Reaction Mechanism","Hydrocarbons","Haloalkane and Arenes","Alcohol Phenol Ether",
      "Aldehyde Ketone Carboxylic Acid","Amines","Biomolecules","Organic Finisher","Equilibrium",
      "Thermodynamics","Chemical Kinetics","Redox & Electrochemistry","D-F Block","Coordination"
    ]
  },
  Biology: {
    color: "#FF6699",
    glow: "#CC0044",
    chapters: [
      "Cell — The Unit of Life","Cell Cycle and Cell Division","Biomolecules","Genetics",
      "Molecular Basis of Inheritance","Evolution","Biotechnology","Applications of Biotechnology",
      "Organisms and Populations","Ecosystem","Biodiversity","Human Reproduction",
      "Reproductive Health","Plant Reproduction","Human Health and Disease",
      "Microbes in Human Welfare","Photosynthesis","Plant Respiration","Plant Growth and Development",
      "Breathing","Circulation","Excretion","Locomotion","Neural Control and Coordination",
      "Chemical Control and Coordination","Frog","Plant Morphology","Plant Anatomy",
      "The Living World","Biological Classification","Plant Classification","Animal Classification"
    ]
  }
};

const TITLES = [
  { id: "dao_seeker", name: "Dao Seeker", req: "Start your journey" },
  { id: "mechanics_comprehender", name: "Mechanics Comprehender", req: "Complete all Physics mechanics chapters" },
  { id: "master_genetics", name: "Master of Genetics", req: "Complete Genetics + Molecular Basis chapters" },
  { id: "lord_organic", name: "Lord of Organic Chemistry", req: "Complete all organic chemistry chapters" },
  { id: "berserker_scholar", name: "Berserker Scholar", req: "Study 10+ hours in a single day" },
  { id: "fate_defier", name: "Fate Defier", req: "30-day streak" },
  { id: "cultivator_truth", name: "Cultivator of Truth", req: "Reach Berserker Soul realm" },
];

const EXAM_TYPES = ["JEE", "NEET", "MHT CET", "IAT", "NEST", "Custom"];

const SU_MING_IMG = "https://i.imgur.com/7WBqKTR.jpeg";
const POT_IMG = "https://i.imgur.com/8o1X3bD.jpeg";

function ParticleCanvas({ realmIndex }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const realm = REALMS[realmIndex] || REALMS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      opacity: Math.random(),
      life: Math.random(),
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        p.opacity = Math.sin(p.life * Math.PI) * 0.8;
        if (p.y < 0 || p.life > 1) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.life = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = realm.glow + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [realmIndex]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function BreakthroughOverlay({ realm, onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => onDone(), 4000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: `radial-gradient(circle at 50% 50%, ${realm.glow}33 0%, #000000EE 60%, #000 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "all 0.5s",
    }}>
      <div style={{
        fontSize: 11, letterSpacing: 8, color: realm.glow, textTransform: "uppercase",
        opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.8s",
        fontFamily: "'Cinzel', serif", marginBottom: 16,
      }}>Realm Breakthrough</div>
      <div style={{
        fontSize: 42, fontWeight: 700, color: "#FFF",
        fontFamily: "'Cinzel Decorative', serif",
        textShadow: `0 0 40px ${realm.glow}, 0 0 80px ${realm.glow}`,
        opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.8s, transform 0.8s",
        transform: phase >= 2 ? "scale(1)" : "scale(0.5)",
        textAlign: "center", padding: "0 2rem",
      }}>{realm.name}</div>
      <div style={{
        marginTop: 24, fontSize: 13, color: realm.glow, letterSpacing: 3,
        opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.8s",
        fontFamily: "'Cinzel', serif",
      }}>Your cultivation has stabilized.</div>
      <LightningEffect color={realm.glow} active={phase >= 1} />
    </div>
  );
}

function LightningEffect({ color, active }) {
  const paths = [
    "M50,0 L45,30 L55,25 L40,60 L52,55 L38,90",
    "M150,0 L158,35 L145,30 L162,65 L150,60 L165,95",
    "M250,0 L242,40 L255,35 L240,75 L252,68 L238,100",
  ];
  if (!active) return null;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 100" preserveAspectRatio="xMidYMid slice">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"
          style={{ animation: `flicker 0.15s ${i * 0.05}s infinite alternate` }} />
      ))}
      <style>{`@keyframes flicker{from{opacity:0.2}to{opacity:0.9}}`}</style>
    </svg>
  );
}

function AuraRing({ realm, size = 200 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {[1, 0.6, 0.3].map((op, i) => (
        <div key={i} style={{
          position: "absolute", width: `${size - i * 30}px`, height: `${size - i * 30}px`,
          borderRadius: "50%",
          border: `${2 - i * 0.5}px solid ${realm.glow}`,
          opacity: op,
          animation: `pulseRing ${2 + i}s ease-in-out infinite`,
          boxShadow: `0 0 ${20 + i * 10}px ${realm.glow}`,
        }} />
      ))}
      <style>{`@keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.05);opacity:0.4}}`}</style>
    </div>
  );
}

function NotificationToast({ msg, glow, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 9998,
      background: "rgba(0,0,0,0.92)", border: `1px solid ${glow}`,
      boxShadow: `0 0 20px ${glow}44`, borderRadius: 12, padding: "16px 24px",
      color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 14,
      maxWidth: 340, animation: "slideIn 0.4s ease",
    }}>
      <div style={{ color: glow, fontSize: 10, letterSpacing: 4, marginBottom: 4 }}>CULTIVATION SYSTEM</div>
      {msg}
      <style>{`@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}

function StatCard({ label, value, glow, icon }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: `1px solid ${glow}33`,
      borderRadius: 12, padding: "16px 20px",
      boxShadow: `0 0 15px ${glow}11`,
    }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: glow, marginBottom: 6, fontFamily: "'Cinzel', serif" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#FFF", fontFamily: "'Cinzel Decorative', serif" }}>{value}</div>
    </div>
  );
}

function TimerView({ state, dispatch, realm }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [sessionDone, setSessionDone] = useState(false);
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [focus, setFocus] = useState(3);
  const intervalRef = useRef(null);

  const MODES = { pomodoro: 25 * 60, deep: 90 * 60, focus: 50 * 60 };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else clearInterval(intervalRef.current);
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
      <div style={{ fontSize: 18, color: realm.glow, marginBottom: 24, textAlign: "center" }}>Session Complete — Log Your Cultivation</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={selectStyle(realm)}>
          {Object.keys(SUBJECTS).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={chapter} onChange={e => setChapter(+e.target.value)} style={selectStyle(realm)}>
          {SUBJECTS[subject].chapters.map((c, i) => <option key={i} value={i}>{c}</option>)}
        </select>
        <div style={{ color: "#aaa", fontSize: 12 }}>Difficulty (1–5): <span style={{ color: realm.glow }}>{difficulty}</span></div>
        <input type="range" min={1} max={5} value={difficulty} onChange={e => setDifficulty(+e.target.value)} />
        <div style={{ color: "#aaa", fontSize: 12 }}>Focus Quality (1–5): <span style={{ color: realm.glow }}>{focus}</span></div>
        <input type="range" min={1} max={5} value={focus} onChange={e => setFocus(+e.target.value)} />
        <button onClick={() => { dispatch({ type: "MARK_CHAPTER", subject, chapter: SUBJECTS[subject].chapters[chapter] }); setSessionDone(false); setSeconds(0); }}
          style={btnStyle(realm)}>
          Mark Chapter as Studied & Save
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "32px 16px" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {Object.keys(MODES).map(m => (
          <button key={m} onClick={() => { setMode(m); setSeconds(0); setRunning(false); }}
            style={{ ...btnStyle(realm), opacity: mode === m ? 1 : 0.4, fontSize: 11 }}>
            {m === "pomodoro" ? "Pomodoro 25m" : m === "deep" ? "Deep Work 90m" : "Focus 50m"}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", width: 220, height: 220 }}>
        <svg viewBox="0 0 220 220" width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="110" cy="110" r="100" fill="none" stroke={realm.glow + "22"} strokeWidth="6" />
          <circle cx="110" cy="110" r="100" fill="none" stroke={realm.glow} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 100}`} strokeDashoffset={`${2 * Math.PI * 100 * (1 - pct / 100)}`}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#FFF", fontFamily: "'Cinzel Decorative', serif" }}>{fmt(seconds)}</div>
          <div style={{ fontSize: 10, color: realm.glow, letterSpacing: 3 }}>{mode.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => setRunning(r => !r)} style={{ ...btnStyle(realm), minWidth: 120 }}>
          {running ? "⏸ Pause" : "▶ Begin Cultivation"}
        </button>
        {seconds > 0 && <button onClick={finish} style={{ ...btnStyle(realm), background: realm.glow + "22" }}>Complete Session</button>}
      </div>

      <div style={{ textAlign: "center", color: "#666", fontSize: 12, fontFamily: "'Cinzel', serif" }}>
        Every second of study is cultivation energy.<br/>The Dao does not wait.
      </div>
    </div>
  );
}

function ChaptersView({ state, dispatch, realm }) {
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
          <div style={{ width: `${(completedCount / total) * 100}%`, height: "100%", borderRadius: 2, background: subj.color, transition: "width 0.5s" }} />
        </div>
        <span style={{ color: subj.color, fontSize: 12, fontFamily: "'Cinzel', serif" }}>{completedCount}/{total} Chapters Comprehended</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {subj.chapters.map((ch, i) => {
          const done = !!completed[ch];
          return (
            <div key={i} onClick={() => dispatch({ type: "TOGGLE_CHAPTER", subject: activeSubject, chapter: ch })}
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
                {String(i + 1).padStart(2, "0")} — {ch}
              </span>
              {done && <span style={{ marginLeft: "auto", fontSize: 10, color: subj.color, letterSpacing: 2 }}>COMPREHENDED</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardView({ state, realm, realmIndex }) {
  const totalChapters = Object.values(state.chapters).reduce((sum, subj) => sum + Object.values(subj).filter(Boolean).length, 0);
  const totalPossible = Object.values(SUBJECTS).reduce((s, subj) => s + subj.chapters.length, 0);
  const nextRealm = REALMS[realmIndex + 1];
  const expProgress = nextRealm ? ((state.totalExp - realm.exp_required) / (nextRealm.exp_required - realm.exp_required)) * 100 : 100;

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

      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}33`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#aaa", fontSize: 12, fontFamily: "'Cinzel', serif" }}>Cultivation Progress → {nextRealm?.name || "Supreme Peak"}</span>
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
            <div key={name} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${subj.glow}33`, borderRadius: 12, padding: 16 }}>
              <div style={{ color: subj.color, fontSize: 13, fontFamily: "'Cinzel', serif", marginBottom: 8 }}>{name}</div>
              <div style={{ height: 4, borderRadius: 2, background: "#111", marginBottom: 6 }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: subj.color }} />
              </div>
              <div style={{ color: "#666", fontSize: 11 }}>{done}/{subj.chapters.length} chapters — {pct}%</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}22`, borderRadius: 12, padding: 20 }}>
        <div style={{ color: realm.glow, fontSize: 11, letterSpacing: 3, fontFamily: "'Cinzel', serif", marginBottom: 12 }}>ACTIVE TITLES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {state.titles.map(t => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: 20, background: realm.glow + "22",
              border: `1px solid ${realm.glow}44`, color: realm.glow, fontSize: 11,
              fontFamily: "'Cinzel', serif",
            }}>{TITLES.find(x => x.id === t)?.name || t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExamsView({ state, dispatch, realm }) {
  const [exams, setExams] = useState(state.exams || []);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", type: "JEE", date: "" });

  function addExam() {
    const newExams = [...exams, { ...form, id: Date.now() }];
    setExams(newExams);
    dispatch({ type: "SET_EXAMS", exams: newExams });
    setCreating(false);
    setForm({ name: "", type: "JEE", date: "" });
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
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${realm.glow}44`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <input placeholder="Exam Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle(realm)} />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={selectStyle(realm)}>
              {EXAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle(realm)} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addExam} style={btnStyle(realm)}>Add</button>
              <button onClick={() => setCreating(false)} style={{ ...btnStyle(realm), opacity: 0.5 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {exams.map(exam => (
          <div key={exam.id} style={{
            background: "rgba(255,255,255,0.02)", border: `1px solid ${realm.glow}33`,
            borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <div style={{ color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 16, marginBottom: 4 }}>{exam.name}</div>
              <div style={{ color: "#666", fontSize: 12 }}>{exam.type} Tribulation</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: realm.glow, fontSize: 28, fontFamily: "'Cinzel Decorative', serif" }}>{getDaysLeft(exam.date)}</div>
              <div style={{ color: "#555", fontSize: 10, letterSpacing: 2 }}>DAYS REMAIN</div>
            </div>
          </div>
        ))}
        {exams.length === 0 && <div style={{ color: "#444", textAlign: "center", fontFamily: "'Cinzel', serif", padding: 32 }}>No tribulations set. The Dao awaits your trials.</div>}
      </div>
    </div>
  );
}

function TasksView({ state, dispatch, realm }) {
  const [tasks, setTasks] = useState(state.tasks || []);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("normal");

  function addTask() {
    if (!input.trim()) return;
    const newTasks = [...tasks, { id: Date.now(), text: input, priority, done: false }];
    setTasks(newTasks);
    dispatch({ type: "SET_TASKS", tasks: newTasks });
    setInput("");
  }

  function toggleTask(id) {
    const newTasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(newTasks);
    dispatch({ type: "SET_TASKS", tasks: newTasks });
  }

  const priorityColors = { high: "#FF4444", normal: realm.glow, low: "#44FF44" };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", fontFamily: "'Cinzel', serif", marginBottom: 12 }}>DAILY MISSIONS & TRIALS</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {["high", "normal", "low"].map(p => (
            <button key={p} onClick={() => setPriority(p)}
              style={{ ...btnStyle(realm, priority === p), borderColor: priorityColors[p], color: priority === p ? priorityColors[p] : "#444", fontSize: 11 }}>
              {p === "high" ? "⚔ Trial" : p === "normal" ? "◈ Mission" : "◇ Task"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Inscribe your mission..." style={{ ...inputStyle(realm), flex: 1 }} />
          <button onClick={addTask} style={btnStyle(realm)}>Add</button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {tasks.map(task => (
          <div key={task.id} onClick={() => toggleTask(task.id)} style={{
            display: "flex", gap: 12, alignItems: "center", padding: "12px 16px",
            background: task.done ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${task.done ? "#ffffff11" : priorityColors[task.priority] + "44"}`,
            borderRadius: 8, cursor: "pointer", transition: "all 0.3s",
            opacity: task.done ? 0.4 : 1,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 3,
              border: `2px solid ${priorityColors[task.priority]}`,
              background: task.done ? priorityColors[task.priority] : "transparent",
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {task.done && <span style={{ color: "#000", fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ color: task.done ? "#555" : "#CCC", fontSize: 13, fontFamily: "'Cinzel', serif", textDecoration: task.done ? "line-through" : "none" }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RealmsView({ state, realmIndex, realm }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", fontFamily: "'Cinzel', serif", marginBottom: 20 }}>CULTIVATION REALM PATHWAY</div>
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
              {current && <span style={{ color: r.glow, fontSize: 10, letterSpacing: 3, fontFamily: "'Cinzel', serif" }}>CURRENT</span>}
              {!current && unlocked && <span style={{ color: "#444", fontSize: 10 }}>✓</span>}
              {!unlocked && <span style={{ color: "#333", fontSize: 10 }}>🔒</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingPage({ onEnter }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setTimeout(() => setPhase(1), 200);
    setTimeout(() => setPhase(2), 800);
    setTimeout(() => setPhase(3), 1400);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Cinzel', serif", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, #330066 0%, #000 60%)" }} />

      <div style={{
        position: "relative", zIndex: 10, textAlign: "center",
        opacity: phase >= 1 ? 1 : 0, transition: "opacity 1s",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 8, color: "#6600FF", marginBottom: 32 }}>☯ THE CULTIVATION SYSTEM AWAKENS ☯</div>

        <div style={{
          display: "flex", gap: 48, alignItems: "center", justifyContent: "center", marginBottom: 40,
          flexWrap: "wrap",
        }}>
          <img src={POT_IMG} alt="Pursuit of Truth"
            onError={e => e.target.style.display = "none"}
            style={{
              width: 140, height: 200, objectFit: "cover", borderRadius: 8,
              border: "1px solid #6600FF", boxShadow: "0 0 30px #6600FF88",
              opacity: phase >= 2 ? 1 : 0, transition: "opacity 1s 0.3s",
            }} />
          <div>
            <h1 style={{
              fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 700, color: "#FFF",
              fontFamily: "'Cinzel Decorative', serif",
              textShadow: "0 0 60px #6600FF, 0 0 120px #6600FF66",
              margin: 0, lineHeight: 1.1,
              opacity: phase >= 2 ? 1 : 0, transition: "opacity 1s",
            }}>Pursuit of Truth</h1>
            <div style={{
              fontSize: "clamp(16px, 3vw, 22px)", color: "#9900FF", marginTop: 8,
              letterSpacing: 4, opacity: phase >= 2 ? 1 : 0, transition: "opacity 1s 0.3s",
            }}>CULTIVATION STUDY SYSTEM</div>
          </div>
          <img src={SU_MING_IMG} alt="Su Ming"
            onError={e => e.target.style.display = "none"}
            style={{
              width: 140, height: 200, objectFit: "cover", borderRadius: 8,
              border: "1px solid #9900FF", boxShadow: "0 0 30px #9900FF88",
              opacity: phase >= 2 ? 1 : 0, transition: "opacity 1s 0.6s",
            }} />
        </div>

        <div style={{
          color: "#888", fontSize: 14, letterSpacing: 2, marginBottom: 48, lineHeight: 1.8,
          opacity: phase >= 3 ? 1 : 0, transition: "opacity 1s",
        }}>
          "Walk the Path of Truth."<br />
          Every chapter is cultivation.<br />
          Break through your limits.
        </div>

        <button onClick={onEnter}
          style={{
            padding: "16px 56px", background: "transparent", border: "1px solid #6600FF",
            color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: 4,
            cursor: "pointer", borderRadius: 4,
            boxShadow: "0 0 20px #6600FF66",
            transition: "all 0.3s",
            opacity: phase >= 3 ? 1 : 0,
          }}
          onMouseOver={e => e.target.style.boxShadow = "0 0 40px #6600FF"}
          onMouseOut={e => e.target.style.boxShadow = "0 0 20px #6600FF66"}>
          BEGIN CULTIVATION
        </button>

        <div style={{ display: "flex", gap: 32, marginTop: 64, color: "#333", fontSize: 11, letterSpacing: 3, flexWrap: "wrap", justifyContent: "center" }}>
          <span>BLOOD SOLIDIFICATION</span><span>→</span>
          <span>AWAKENING</span><span>→</span>
          <span>BERSERKER SOUL</span><span>→</span>
          <span>AVACANIYA PEAK</span>
        </div>
      </div>

      <FloatingParticles />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          borderRadius: "50%",
          background: ["#6600FF", "#9900FF", "#CC00FF", "#FF00FF"][Math.floor(Math.random() * 4)],
          animation: `float ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite alternate`,
          opacity: Math.random() * 0.6 + 0.2,
        }} />
      ))}
      <style>{`@keyframes float{from{transform:translateY(0)}to{transform:translateY(-20px)}}`}</style>
    </div>
  );
}

function initialState() {
  const saved = localStorage.getItem("pot_cultivation");
  if (saved) try { return JSON.parse(saved); } catch {}
  return {
    totalExp: 0,
    totalHours: 0,
    todayExp: 0,
    streak: 0,
    chapters: { Physics: {}, Chemistry: {}, Biology: {} },
    titles: ["dao_seeker"],
    sessions: [],
    exams: [],
    tasks: [],
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_CHAPTER": {
      const done = !state.chapters[action.subject]?.[action.chapter];
      const exp = done ? 120 : -120;
      const newChapters = {
        ...state.chapters,
        [action.subject]: { ...state.chapters[action.subject], [action.chapter]: done }
      };
      return { ...state, chapters: newChapters, totalExp: Math.max(0, state.totalExp + exp), todayExp: Math.max(0, state.todayExp + exp) };
    }
    case "MARK_CHAPTER": {
      const newChapters = { ...state.chapters, [action.subject]: { ...state.chapters[action.subject], [action.chapter]: true } };
      return { ...state, chapters: newChapters };
    }
    case "ADD_SESSION": {
      const exp = Math.round(action.hours * 200);
      return { ...state, totalHours: state.totalHours + action.hours, totalExp: state.totalExp + exp, todayExp: state.todayExp + exp, sessions: [...state.sessions, { hours: action.hours, subject: action.subject, chapter: action.chapter, time: Date.now() }] };
    }
    case "SET_EXAMS": return { ...state, exams: action.exams };
    case "SET_TASKS": return { ...state, tasks: action.tasks };
    case "EARN_EXP": return { ...state, totalExp: state.totalExp + action.amount, todayExp: state.todayExp + action.amount };
    default: return state;
  }
}

function btnStyle(realm, active = false) {
  return {
    padding: "8px 20px", background: active ? realm.glow + "33" : "transparent",
    border: `1px solid ${active ? realm.glow : realm.glow + "55"}`,
    color: active ? "#FFF" : realm.glow, borderRadius: 6, cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 1,
    transition: "all 0.2s",
  };
}

function inputStyle(realm) {
  return {
    padding: "10px 14px", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${realm.glow}44`, borderRadius: 6,
    color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 13, outline: "none",
    width: "100%",
  };
}

function selectStyle(realm) {
  return {
    ...inputStyle(realm),
    appearance: "none", cursor: "pointer",
  };
}

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "chapters", label: "Chapters", icon: "◈" },
  { id: "timer", label: "Timer", icon: "⏱" },
  { id: "realms", label: "Realms", icon: "☯" },
  { id: "exams", label: "Exams", icon: "⚔" },
  { id: "tasks", label: "Tasks", icon: "◇" },
];

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [state, dispatch] = useState(() => [initialState(), () => {}]);
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
    const totalChapters = Object.values(stateData.chapters).reduce((s, sub) => s + Object.values(sub).filter(Boolean).length, 0);
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
              <img src={SU_MING_IMG} alt="Su Ming"
                onError={e => { e.target.style.display = "none"; }}
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `1px solid ${realm.glow}` }} />
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
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  padding: "14px 20px", background: "transparent", border: "none",
                  borderBottom: tab === t.id ? `2px solid ${realm.glow}` : "2px solid transparent",
                  color: tab === t.id ? realm.glow : "#444", fontFamily: "'Cinzel', serif",
                  fontSize: 11, letterSpacing: 2, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}>
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
            <div style={{ color: "#222", fontSize: 10, letterSpacing: 4 }}>PURSUIT OF TRUTH · CULTIVATION SYSTEM · THE DAO DOES NOT WAIT</div>
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
