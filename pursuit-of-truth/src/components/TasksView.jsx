import { useState } from "react";
import { btnStyle, inputStyle } from "../utils/styles";

export default function TasksView({ state, dispatch, realm }) {
  const [tasks, setTasks] = useState(state.tasks || []);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("normal");

  const priorityColors = { high: "#FF4444", normal: realm.glow, low: "#44FF44" };

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

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", fontFamily: "'Cinzel', serif", marginBottom: 12 }}>
          DAILY MISSIONS & TRIALS
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {["high", "normal", "low"].map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              style={{
                ...btnStyle(realm, priority === p),
                borderColor: priorityColors[p],
                color: priority === p ? priorityColors[p] : "#444",
                fontSize: 11,
              }}
            >
              {p === "high" ? "⚔ Trial" : p === "normal" ? "◈ Mission" : "◇ Task"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Inscribe your mission..."
            style={{ ...inputStyle(realm), flex: 1 }}
          />
          <button onClick={addTask} style={btnStyle(realm)}>Add</button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              display: "flex", gap: 12, alignItems: "center", padding: "12px 16px",
              background: task.done ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${task.done ? "#ffffff11" : priorityColors[task.priority] + "44"}`,
              borderRadius: 8, cursor: "pointer", transition: "all 0.3s",
              opacity: task.done ? 0.4 : 1,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 3,
              border: `2px solid ${priorityColors[task.priority]}`,
              background: task.done ? priorityColors[task.priority] : "transparent",
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {task.done && <span style={{ color: "#000", fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{
              color: task.done ? "#555" : "#CCC", fontSize: 13, fontFamily: "'Cinzel', serif",
              textDecoration: task.done ? "line-through" : "none",
            }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
