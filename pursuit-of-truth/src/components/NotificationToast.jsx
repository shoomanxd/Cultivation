import { useEffect } from "react";

export default function NotificationToast({ msg, glow, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, []);

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
