export default function FloatingParticles() {
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
