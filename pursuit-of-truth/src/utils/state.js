export function initialState() {
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

export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_CHAPTER": {
      const done = !state.chapters[action.subject]?.[action.chapter];
      const exp = done ? 120 : -120;
      const newChapters = {
        ...state.chapters,
        [action.subject]: { ...state.chapters[action.subject], [action.chapter]: done }
      };
      return {
        ...state,
        chapters: newChapters,
        totalExp: Math.max(0, state.totalExp + exp),
        todayExp: Math.max(0, state.todayExp + exp),
      };
    }
    case "MARK_CHAPTER": {
      const newChapters = {
        ...state.chapters,
        [action.subject]: { ...state.chapters[action.subject], [action.chapter]: true }
      };
      return { ...state, chapters: newChapters };
    }
    case "ADD_SESSION": {
      const exp = Math.round(action.hours * 200);
      return {
        ...state,
        totalHours: state.totalHours + action.hours,
        totalExp: state.totalExp + exp,
        todayExp: state.todayExp + exp,
        sessions: [
          ...state.sessions,
          { hours: action.hours, subject: action.subject, chapter: action.chapter, time: Date.now() }
        ],
      };
    }
    case "SET_EXAMS": return { ...state, exams: action.exams };
    case "SET_TASKS": return { ...state, tasks: action.tasks };
    case "EARN_EXP": return { ...state, totalExp: state.totalExp + action.amount, todayExp: state.todayExp + action.amount };
    default: return state;
  }
}
