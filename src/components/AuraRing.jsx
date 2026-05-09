export default function AuraRing({ realm, size = 200 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {[1, 0.6, 0.3].map((op, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${size - i * 30}px`,
          height: `${size - i * 30}px`,
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
