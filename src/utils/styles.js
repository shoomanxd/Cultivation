export function btnStyle(realm, active = false) {
  return {
    padding: "8px 20px", background: active ? realm.glow + "33" : "transparent",
    border: `1px solid ${active ? realm.glow : realm.glow + "55"}`,
    color: active ? "#FFF" : realm.glow, borderRadius: 6, cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 1,
    transition: "all 0.2s",
  };
}

export function inputStyle(realm) {
  return {
    padding: "10px 14px", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${realm.glow}44`, borderRadius: 6,
    color: "#FFF", fontFamily: "'Cinzel', serif", fontSize: 13, outline: "none",
    width: "100%",
  };
}

export function selectStyle(realm) {
  return {
    ...inputStyle(realm),
    appearance: "none", cursor: "pointer",
  };
}
