export default function StatCard({ label, value, glow }) {
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
