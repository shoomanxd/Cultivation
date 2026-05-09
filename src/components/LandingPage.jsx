import { useState } from "react";
import FloatingParticles from "./FloatingParticles";
import { SU_MING_IMG, POT_IMG } from "../data/constants";

export default function LandingPage({ onEnter }) {
  const [phase, setPhase] = useState(0);

  // Trigger phases on mount
  useState(() => {
    setTimeout(() => setPhase(1), 200);
    setTimeout(() => setPhase(2), 800);
    setTimeout(() => setPhase(3), 1400);
  });

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
        <div style={{ fontSize: 11, letterSpacing: 8, color: "#6600FF", marginBottom: 32 }}>
          ☯ THE CULTIVATION SYSTEM AWAKENS ☯
        </div>

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

        <button
          onClick={onEnter}
          style={{
            padding: "16px 56px", background: "transparent", border: "1px solid #6600FF",
            color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: 4,
            cursor: "pointer", borderRadius: 4,
            boxShadow: "0 0 20px #6600FF66",
            transition: "all 0.3s",
            opacity: phase >= 3 ? 1 : 0,
          }}
          onMouseOver={e => e.target.style.boxShadow = "0 0 40px #6600FF"}
          onMouseOut={e => e.target.style.boxShadow = "0 0 20px #6600FF66"}
        >
          BEGIN CULTIVATION
        </button>

        <div style={{
          display: "flex", gap: 32, marginTop: 64, color: "#333", fontSize: 11,
          letterSpacing: 3, flexWrap: "wrap", justifyContent: "center",
        }}>
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
