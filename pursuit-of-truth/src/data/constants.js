export const REALMS = [
  { name: "Blood Solidification", color: "#8B0000", glow: "#FF2222", min_hours: 0, min_chapters: 0, exp_required: 0, aura: "blood" },
  { name: "Awakening", color: "#4B0082", glow: "#9400D3", min_hours: 5, min_chapters: 5, exp_required: 500, aura: "awakening" },
  { name: "Bone Sacrifice", color: "#800020", glow: "#DC143C", min_hours: 15, min_chapters: 12, exp_required: 1500, aura: "crimson" },
  { name: "Berserker Soul — Initial", color: "#1a0050", glow: "#6600FF", min_hours: 30, min_chapters: 20, exp_required: 3000, aura: "cosmic" },
  { name: "Berserker Soul — Middle", color: "#00008B", glow: "#0044FF", min_hours: 50, min_chapters: 30, exp_required: 5000, aura: "cosmic" },
  { name: "Berserker Soul — Half-step into Later", color: "#003366", glow: "#0088FF", min_hours: 75, min_chapters: 45, exp_required: 8000, aura: "cosmic" },
  { name: "Berserker Soul — Later", color: "#002244", glow: "#00AAFF", min_hours: 100, min_chapters: 60, exp_required: 12000, aura: "cosmic" },
  { name: "Berserker Soul — Great Completion", color: "#001133", glow: "#00CCFF", min_hours: 130, min_chapters: 75, exp_required: 17000, aura: "cosmic" },
  { name: "Life Matrix", color: "#003300", glow: "#00FF88", min_hours: 170, min_chapters: 90, exp_required: 23000, aura: "life" },
  { name: "Life Privation", color: "#004400", glow: "#00FF44", min_hours: 220, min_chapters: 110, exp_required: 30000, aura: "life" },
  { name: "Life Palace", color: "#005500", glow: "#44FF00", min_hours: 280, min_chapters: 130, exp_required: 38000, aura: "life" },
  { name: "World of Life", color: "#006600", glow: "#88FF00", min_hours: 350, min_chapters: 150, exp_required: 47000, aura: "life" },
  { name: "Lunar Kalpa", color: "#1a1a4a", glow: "#AAAAFF", min_hours: 430, min_chapters: 170, exp_required: 57000, aura: "lunar" },
  { name: "Solar Kalpa", color: "#4a3a00", glow: "#FFDD00", min_hours: 520, min_chapters: 190, exp_required: 68000, aura: "solar" },
  { name: "Master of Fate, Lives, and Death", color: "#2a0a2a", glow: "#FF00FF", min_hours: 620, min_chapters: 210, exp_required: 80000, aura: "fate" },
  { name: "Rise and Fall of Fate", color: "#3a0020", glow: "#FF44AA", min_hours: 730, min_chapters: 230, exp_required: 93000, aura: "fate" },
  { name: "Reincarnation of Life", color: "#0a2a3a", glow: "#00FFFF", min_hours: 850, min_chapters: 250, exp_required: 107000, aura: "divine" },
  { name: "Death of the Universe", color: "#000000", glow: "#FFFFFF", min_hours: 980, min_chapters: 270, exp_required: 122000, aura: "void" },
  { name: "Sublime Paragon", color: "#1a0a00", glow: "#FFD700", min_hours: 1120, min_chapters: 290, exp_required: 138000, aura: "paragon" },
  { name: "Bhaashate — Early", color: "#2a1a00", glow: "#FFA500", min_hours: 1270, min_chapters: 310, exp_required: 155000, aura: "transcendent" },
  { name: "Bhaashate — Middle", color: "#3a2a00", glow: "#FF8C00", min_hours: 1430, min_chapters: 330, exp_required: 173000, aura: "transcendent" },
  { name: "Bhaashate — Late", color: "#4a3a00", glow: "#FF7F00", min_hours: 1600, min_chapters: 350, exp_required: 192000, aura: "transcendent" },
  { name: "Avacaniya — Early", color: "#1a0030", glow: "#E040FB", min_hours: 1800, min_chapters: 375, exp_required: 212000, aura: "supreme" },
  { name: "Avacaniya — Middle", color: "#2a0040", glow: "#CE93D8", min_hours: 2000, min_chapters: 400, exp_required: 233000, aura: "supreme" },
  { name: "Avacaniya — Late", color: "#3a0050", glow: "#BA68C8", min_hours: 2200, min_chapters: 425, exp_required: 255000, aura: "supreme" },
  { name: "Avacaniya — Peak", color: "#4a0060", glow: "#AB47BC", min_hours: 2500, min_chapters: 450, exp_required: 280000, aura: "supreme" },
];

export const SUBJECTS = {
  Physics: {
    color: "#00AAFF",
    glow: "#0066CC",
    chapters: [
      "Kinematics 1D","Kinematics 2D","NLM","Circular Motion","WPE",
      "COM, Collision, Momentum","Rotational Mechanics","KTG & Thermodynamics","SHM","Waves",
      "Heat Transfer","Modern Physics – 1 (Dual Nature of matter and Radiation, Atoms)",
      "Modern Physics – 2 (Nuclei)","Ray Optics","Current Electricity",
      "Magnetic Effects of Current and Magnetism","EMI","Electrostatics","Gravitation","Capacitance",
      "Fluid","Elasticity","Calorimetry","Thermal Expansion","EM Waves","Wave Optics","AC",
      "Semiconductors","Unit, Dimension and Error Analysis"
    ]
  },
  Chemistry: {
    color: "#00FF99",
    glow: "#006633",
    chapters: [
      "SBC X Solution","Atomic Structure","Periodicity","Chemical Bonding","GOC","Stereochemistry",
      "Reaction Mechanism","Hydrocarbons","Haloalkane and Arenes","Alcohol Phenol Ether",
      "Aldehyde Ketone Carboxylic Acid","Amines","Biomolecules","Organic Finisher","Equilibrium",
      "Thermodynamics","Chemical Kinetics","Redox & Electrochemistry","D-F Block","Coordination"
    ]
  },
  Biology: {
    color: "#FF6699",
    glow: "#CC0044",
    chapters: [
      "Cell — The Unit of Life","Cell Cycle and Cell Division","Biomolecules","Genetics",
      "Molecular Basis of Inheritance","Evolution","Biotechnology","Applications of Biotechnology",
      "Organisms and Populations","Ecosystem","Biodiversity","Human Reproduction",
      "Reproductive Health","Plant Reproduction","Human Health and Disease",
      "Microbes in Human Welfare","Photosynthesis","Plant Respiration","Plant Growth and Development",
      "Breathing","Circulation","Excretion","Locomotion","Neural Control and Coordination",
      "Chemical Control and Coordination","Frog","Plant Morphology","Plant Anatomy",
      "The Living World","Biological Classification","Plant Classification","Animal Classification"
    ]
  }
};

export const TITLES = [
  { id: "dao_seeker", name: "Dao Seeker", req: "Start your journey" },
  { id: "mechanics_comprehender", name: "Mechanics Comprehender", req: "Complete all Physics mechanics chapters" },
  { id: "master_genetics", name: "Master of Genetics", req: "Complete Genetics + Molecular Basis chapters" },
  { id: "lord_organic", name: "Lord of Organic Chemistry", req: "Complete all organic chemistry chapters" },
  { id: "berserker_scholar", name: "Berserker Scholar", req: "Study 10+ hours in a single day" },
  { id: "fate_defier", name: "Fate Defier", req: "30-day streak" },
  { id: "cultivator_truth", name: "Cultivator of Truth", req: "Reach Berserker Soul realm" },
];

export const EXAM_TYPES = ["JEE", "NEET", "MHT CET", "IAT", "NEST", "Custom"];

export const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "chapters", label: "Chapters", icon: "◈" },
  { id: "timer", label: "Timer", icon: "⏱" },
  { id: "realms", label: "Realms", icon: "☯" },
  { id: "exams", label: "Exams", icon: "⚔" },
  { id: "tasks", label: "Tasks", icon: "◇" },
];

export const SU_MING_IMG = "https://i.imgur.com/7WBqKTR.jpeg";
export const POT_IMG = "https://i.imgur.com/8o1X3bD.jpeg";
