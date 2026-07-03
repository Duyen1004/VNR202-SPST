import { getAssetPath } from "@/lib/utils";

export const stageTreasures = [
  {
    id: 1,
    stageId: 1,
    name: "Đá Khởi Nguyên",
    desc: "Khởi nguồn tri thức triết học",
    icon: "Gem",
    color: "from-blue-400 to-indigo-600",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.6)]"
  },
  {
    id: 2,
    stageId: 2,
    name: "Kính Dẫn Đường",
    desc: "Định hướng lối thoát trong hang",
    icon: "Compass",
    color: "from-teal-400 to-emerald-600",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.6)]"
  },
  {
    id: 3,
    stageId: 3,
    name: "Lư Hương Chuyển Hóa",
    desc: "Cải biến nhận thức sâu sắc",
    icon: "Flame",
    color: "from-orange-400 to-red-600",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.6)]"
  },
  {
    id: 4,
    stageId: 4,
    name: "Cán Cân Công Lý",
    desc: "Cân bằng lẽ phải và chân lý",
    icon: "Scale",
    color: "from-amber-400 to-yellow-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.6)]"
  },
  {
    id: 5,
    stageId: 5,
    name: "Ấn Tín Liên Minh",
    desc: "Khối đại đoàn kết bền vững",
    icon: "Shield",
    color: "from-purple-400 to-pink-600",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]"
  },
  {
    id: 6,
    stageId: 6,
    name: "Chuông Hòa Hợp",
    desc: "Âm thanh hòa quyện đồng điệu",
    icon: "Bell",
    color: "from-sky-400 to-blue-600",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.6)]"
  }
];

export const stages = [
  {
    id: 1,
    title: "Cổng khởi nguyên",
    image: getAssetPath("images/world-island-stage-1-clean.png"),
    treasureId: 1
  },
  {
    id: 2,
    title: "Nhà người dẫn đường",
    image: getAssetPath("images/world-island-stage-2-clean.png"),
    treasureId: 2
  },
  {
    id: 3,
    title: "Đền chuyển hóa",
    image: getAssetPath("images/world-island-stage-3-clean.png"),
    treasureId: 3
  },
  {
    id: 4,
    title: "Tháp công lý",
    image: getAssetPath("images/world-island-stage-4-clean.png"),
    treasureId: 4
  },
  {
    id: 5,
    title: "Làng liên minh",
    image: getAssetPath("images/world-island-stage-5-clean.png"),
    treasureId: 5
  },
  {
    id: 6,
    title: "Điện hòa hợp",
    image: getAssetPath("images/world-island-stage-6-clean.png"),
    treasureId: 6
  }
];

export const worldMapLayout = [
  { x: 11, y: 68 },
  { x: 28, y: 50 },
  { x: 44, y: 27 },
  { x: 62, y: 40 },
  { x: 78, y: 60 },
  { x: 91, y: 34 }
];
