import { useState, useEffect } from "react";
import LightningEffect from "./LightningEffect";

export default function BreakthroughOverlay({ realm, onDone }) {
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
      }}>
        Realm Breakthrough
      </div>
      <div style={{
        fontSize: 42, fontWeight: 700, color: "#FFF",
        fontFamily: "'Cinzel Decorative', serif",
        textShadow: `0 0 40px ${realm.glow}, 0 0 80px ${realm.glow}`,
        opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.8s, transform 0.8s",
        transform: phase >= 2 ? "scale(1)" : "scale(0.5)",
        textAlign: "center", padding: "0 2rem",
      }}>
        {realm.name}
      </div>
      <div style={{
        marginTop: 24, fontSize: 13, color: realm.glow, letterSpacing: 3,
        opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.8s",
        fontFamily: "'Cinzel', serif",
      }}>
        Your cultivation has stabilized.
      </div>
      <LightningEffect color={realm.glow} active={phase >= 1} />
    </div>
  );
}
