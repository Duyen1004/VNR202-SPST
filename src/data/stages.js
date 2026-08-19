import { getAssetPath } from "@/lib/utils";

export const stageTreasures = [
  {
    id: 1,
    stageId: 1,
    name: "Ngọn Lửa 1930",
    desc: "Dấu mốc Đảng Cộng sản Việt Nam ra đời",
    icon: "Gem",
    color: "from-blue-400 to-indigo-600",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.6)]"
  },
  {
    id: 2,
    stageId: 2,
    name: "Cờ Việt Minh",
    desc: "Sức mạnh đoàn kết giành chính quyền",
    icon: "Compass",
    color: "from-teal-400 to-emerald-600",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.6)]"
  },
  {
    id: 3,
    stageId: 3,
    name: "Chiến Công Điện Biên",
    desc: "Ý chí kháng chiến toàn dân",
    icon: "Flame",
    color: "from-orange-400 to-red-600",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.6)]"
  },
  {
    id: 4,
    stageId: 4,
    name: "Đường Trường Sơn",
    desc: "Khát vọng thống nhất non sông",
    icon: "Scale",
    color: "from-amber-400 to-yellow-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.6)]"
  },
  {
    id: 5,
    stageId: 5,
    name: "Dấu Mốc Đổi Mới",
    desc: "Tư duy mới từ thực tiễn đất nước",
    icon: "Shield",
    color: "from-purple-400 to-pink-600",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]"
  },
  {
    id: 6,
    stageId: 6,
    name: "Cánh Cửa Hội Nhập",
    desc: "Việt Nam đổi mới và phát triển",
    icon: "Bell",
    color: "from-sky-400 to-blue-600",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.6)]"
  }
];

export const stages = [
  {
    id: 1,
    title: "Đảng ra đời",
    image: getAssetPath("images/milestone-1-dang-ra-doi.jpg"),
    treasureId: 1
  },
  {
    id: 2,
    title: "Giành chính quyền",
    image: getAssetPath("images/milestone-2-gianh-chinh-quyen.jpg"),
    treasureId: 2
  },
  {
    id: 3,
    title: "Kháng chiến chống Pháp",
    image: getAssetPath("images/milestone-3-dien-bien-phu.jpg"),
    treasureId: 3
  },
  {
    id: 4,
    title: "Thống nhất đất nước",
    image: getAssetPath("images/milestone-4-thong-nhat.jpg"),
    treasureId: 4
  },
  {
    id: 5,
    title: "Tìm tòi đổi mới",
    image: getAssetPath("images/milestone-5-doi-moi.jpg"),
    treasureId: 5
  },
  {
    id: 6,
    title: "Đổi mới hội nhập",
    image: getAssetPath("images/milestone-6-hoi-nhap.jpg"),
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
