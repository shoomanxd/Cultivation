export default function LightningEffect({ color, active }) {
  const paths = [
    "M50,0 L45,30 L55,25 L40,60 L52,55 L38,90",
    "M150,0 L158,35 L145,30 L162,65 L150,60 L165,95",
    "M250,0 L242,40 L255,35 L240,75 L252,68 L238,100",
  ];
  if (!active) return null;
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 300 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"
          style={{ animation: `flicker 0.15s ${i * 0.05}s infinite alternate` }} />
      ))}
      <style>{`@keyframes flicker{from{opacity:0.2}to{opacity:0.9}}`}</style>
    </svg>
  );
}
