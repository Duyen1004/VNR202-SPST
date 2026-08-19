import React, { useState, useEffect } from "react";
import { Gem, Compass, Flame, Scale, Shield, Bell, ArrowRight, RotateCcw, Home, Sun, Printer, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAssetPath } from "@/lib/utils";

const TREASURES = [
  {
    id: 1,
    name: "Ngọn Lửa 1930",
    desc: "Dấu mốc Đảng Cộng sản Việt Nam ra đời",
    icon: Gem,
    color: "from-blue-400 to-indigo-600",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.6)]",
    stage: "Ải 1"
  },
  {
    id: 2,
    name: "Cờ Việt Minh",
    desc: "Sức mạnh đoàn kết giành chính quyền",
    icon: Compass,
    color: "from-teal-400 to-emerald-600",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.6)]",
    stage: "Ải 2"
  },
  {
    id: 3,
    name: "Chiến Công Điện Biên",
    desc: "Ý chí kháng chiến toàn dân",
    icon: Flame,
    color: "from-orange-400 to-red-600",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.6)]",
    stage: "Ải 3"
  },
  {
    id: 4,
    name: "Đường Trường Sơn",
    desc: "Khát vọng thống nhất non sông",
    icon: Scale,
    color: "from-amber-400 to-yellow-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.6)]",
    stage: "Ải 4"
  },
  {
    id: 5,
    name: "Dấu Mốc Đổi Mới",
    desc: "Tư duy mới từ thực tiễn đất nước",
    icon: Shield,
    color: "from-purple-400 to-pink-600",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
    stage: "Ải 5"
  },
  {
    id: 6,
    name: "Cánh Cửa Hội Nhập",
    desc: "Việt Nam đổi mới và phát triển",
    icon: Bell,
    color: "from-sky-400 to-blue-600",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.6)]",
    stage: "Ải 6"
  }
];

export function FinalReward({ earnedTreasureIds = TREASURES.map((item) => item.id), onReset, onBackToHome }) {
  // States: 'gather' | 'merging' | 'merged' | 'revealing' | 'victory'
  const [phase, setPhase] = useState("gather");
  const [activeTreasureIndex, setActiveTreasureIndex] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const earnedTreasures = TREASURES.filter((item) => earnedTreasureIds.includes(item.id));

  useEffect(() => {
    if (phase === "gather") {
      const interval = setInterval(() => {
        setActiveTreasureIndex((prev) => (prev + 1) % earnedTreasures.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [earnedTreasures.length, phase]);

  function handleStartMerge() {
    setPhase("merging");

    // After 2.5 seconds of fast rotation, trigger the flash/merge
    setTimeout(() => {
      setPhase("merged");
    }, 2500);
  }

  function handleRevealWorld() {
    setPhase("revealing");

    // After a brief flash/transition, show the victory screen
    setTimeout(() => {
      setPhase("victory");
    }, 1800);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      {/* Dynamic inline styles for smooth animations and printing optimization */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.4); }
          50% { box-shadow: 0 0 60px rgba(245, 158, 11, 0.8); }
        }
        @keyframes spin-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes flash-in {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fire-flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); filter: brightness(1); }
          20% { transform: scale(1.05) rotate(1deg); filter: brightness(1.1); }
          40% { transform: scale(0.95) rotate(-2deg); filter: brightness(0.9); }
          60% { transform: scale(1.02) rotate(2deg); filter: brightness(1.15); }
          80% { transform: scale(0.98) rotate(0deg); filter: brightness(0.95); }
        }
        @keyframes sun-ray {
          0% { transform: rotate(0deg); opacity: 0.15; }
          100% { transform: rotate(360deg); opacity: 0.35; }
        }
        .animate-float {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-pulse-gold {
          animation: pulse-gold 3s ease-in-out infinite;
        }
        .animate-fire {
          animation: fire-flicker 0.15s ease-in-out infinite;
        }
        .animate-sun-ray {
          animation: sun-ray 25s linear infinite;
        }

        .print-only-certificate {
          display: none;
        }

        /* PRINT STYLING */
        @page {
          size: A4 portrait;
          margin: 8mm;
        }

        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            overflow: hidden !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          /* Hide everything else */
          body * {
            visibility: hidden;
          }
          /* Show only the portrait print certificate */
          #print-area-portrait, #print-area-portrait * {
            visibility: visible;
          }
          #print-area {
            display: none !important;
          }
          #print-area-portrait {
            display: flex !important;
            position: fixed !important;
            left: 8mm !important;
            top: 8mm !important;
            transform: none !important;
            width: 194mm !important;
            max-width: none !important;
            height: 281mm !important;
            max-height: none !important;
            min-height: 0 !important;
            box-shadow: none !important;
            border: 6px double #d4af37 !important;
            background: #fffdf5 !important;
            margin: 0 !important;
            padding: 15mm 13mm !important;
            overflow: hidden !important;
            border-radius: 10mm !important;
          }
          #print-area-portrait .print-seal {
            height: 34mm !important;
            width: 46mm !important;
          }
          #print-area-portrait .print-seal img {
            height: 34mm !important;
            width: 46mm !important;
          }
        }
      `}</style>

      <div className="mx-auto flex h-full max-w-[1320px] items-center">
        <Card className="relative h-full w-full overflow-hidden rounded-[38px] border-[#ecd7ad] bg-[linear-gradient(135deg,rgba(26,21,16,0.97)_0%,rgba(17,14,11,0.985)_52%,rgba(9,8,6,0.99)_100%)] text-white shadow-[0_28px_90px_rgba(59,41,14,0.32)]">
          {/* BACKGROUND PHASES */}
          {(phase === "gather" || phase === "merging" || phase === "merged") && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-40 select-none pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath("images/hang-pac-bo.jpg")})` }}
            />
          )}

          {phase === "revealing" && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-white animate-[flash-in_1.8s_ease-out_forwards]">
              <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,236,179,1)_0%,rgba(255,255,255,1)_60%,rgba(245,158,11,1)_100%)]" />
            </div>
          )}

          {phase === "victory" && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] opacity-80 select-none pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath("images/pac-bo-map-bg.jpg")})` }}
            />
          )}

          {phase !== "victory" && phase !== "revealing" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.9)_80%)] pointer-events-none" />
          )}

          {phase === "victory" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,220,0.15)_0%,rgba(24,32,20,0.85)_100%)] pointer-events-none" />
          )}

          {/* MAIN LAYOUT */}
          <CardContent
            className={`relative z-10 flex min-h-0 flex-col items-center px-4 py-5 md:px-5 lg:px-6 ${
              phase === "victory"
                ? "h-full justify-start gap-2 overflow-hidden py-4"
                : "h-full justify-between"
            }`}
          >
        
        {/* HEADER / NARRATION PANEL */}
        <div className={`max-w-[740px] px-2 text-center ${phase === "victory" ? "space-y-1.5" : "space-y-3"}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest animate-pulse">
            <span>PHẦN THƯỞNG ĐẶC BIỆT</span>
          </div>

          <h1 className={`font-title font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 leading-normal ${
            phase === "victory" ? "py-0.5 text-[38px] md:text-[50px]" : "py-2 text-3xl md:text-5xl"
          }`}>
            {phase === "gather" && "SÁU BẢO VẬT HỘI TỤ"}
            {phase === "merging" && "HỢP NHẤT BẢO VẬT..."}
            {phase === "merged" && "ÁNH SÁNG CỦA ĐẢNG"}
            {phase === "revealing" && "ÁNH SÁNG LAN TỎA"}
            {phase === "victory" && (showCertificate ? "CHỨNG NHẬN VINH DANH" : "THẾ GIỚI THỰC LỘ DIỆN")}
          </h1>

          <p className={`leading-relaxed text-amber-100/85 ${phase === "victory" ? "text-[13px] md:text-[15px]" : "text-sm md:text-base"}`}>
            {phase === "gather" && "Sáu bảo vật linh thiêng từ sáu ải tri thức đang tỏa sáng rực rỡ, sẵn sàng hợp nhất thành nguồn năng lượng vĩ đại nhất."}
            {phase === "merging" && "Năng lượng từ 6 ải giao thoa, xoáy sâu vào không gian, phá tan màn sương che phủ của những chiếc bóng trong hang."}
            {phase === "merged" && "Sáu bảo vật đã hợp nhất thành Ánh sáng của Đảng, biểu tượng soi đường cho hành trình tri thức và niềm tin cách mạng."}
            {phase === "revealing" && "Luồng sáng vĩ đại quét qua vách đá, xóa nhòa những cái bóng giả tạo của cuộc đời ảo ảnh..."}
            {phase === "victory" && (
              showCertificate 
                ? "Chứng nhận ghi nhận hành trình tìm hiểu Lịch sử Đảng Cộng sản Việt Nam và vượt thoát khỏi hang Pác Pó."
                : "Ánh sáng chân lý đã chiếu rọi toàn bộ hang động, biến những ảo ảnh bóng tối thành cát bụi và mở ra trước mắt bạn thế giới thật tươi sáng đầy tự do!"
            )}
          </p>
        </div>

        {/* INTERACTIVE CENTRAL ANIMATION AREA */}
        <div
          className={`relative flex w-full items-center justify-center ${
            phase === "victory" ? "my-0 flex-none" : "my-4 min-h-0 flex-1"
          }`}
        >
          
          {/* ORBIT OF THE 6 TREASURES */}
          {(phase === "gather" || phase === "merging") && (
            <div 
              className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-dashed border-amber-500/20 flex items-center justify-center"
              style={{
                animation: phase === "merging" ? "spin-orbit 1.2s linear infinite" : "spin-orbit 12s linear infinite"
              }}
            >
              {earnedTreasures.map((item, idx) => {
                const total = earnedTreasures.length;
                const angle = (idx * 360) / total;
                const radius = phase === "merging" ? "20px" : "130px"; // Converging effect in CSS
                
                const IconComponent = item.icon;
                const isActive = activeTreasureIndex === idx && phase === "gather";

                return (
                  <div
                    key={item.id}
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{
                      transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
                    }}
                  >
                    {/* Treasure Node */}
                    <div 
                      className={`relative flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${item.color} ${item.glow} border border-white/20 transition-all duration-300 ${
                        isActive ? "scale-125 z-20 border-white" : "scale-100 opacity-90"
                      }`}
                      style={{
                        animation: "counter-spin 12s linear infinite",
                        animationPlayState: phase === "merging" ? "paused" : "running"
                      }}
                    >
                      <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                      
                      {/* Aura Ripple for active */}
                      {isActive && (
                        <div className="absolute inset-[-6px] rounded-full border border-white/40 animate-ping" />
                      )}
                    </div>

                    {/* Miniature label for active items */}
                    {isActive && (
                      <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-max bg-black/90 border border-amber-500/50 text-[10px] font-bold px-2 py-0.5 rounded text-amber-300 shadow-md">
                        {item.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* INNER CENTER CORE */}
          {phase === "gather" && (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center animate-pulse">
              <div className="h-3 w-3 rounded-full bg-amber-400/70 shadow-[0_0_22px_rgba(251,191,36,0.72)]" />
            </div>
          )}

          {phase === "merging" && (
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 blur-md animate-ping" />
          )}

          {/* PARTY LIGHT EMBLEM REVEALED */}
          {(phase === "merged" || phase === "revealing") && (
            <div className="relative flex flex-col items-center animate-float">
              <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25)_0%,transparent_70%)] animate-pulse" />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-400/10 animate-sun-ray" 
                style={{ backgroundImage: "repeating-conic-gradient(from 0deg, transparent 0deg, transparent 15deg, rgba(245,158,11,0.06) 15deg, rgba(245,158,11,0.06) 30deg)" }}
              />

              <div className="relative flex h-60 w-[360px] max-w-full items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#fff8d6_0%,#facc15_32%,rgba(239,68,68,0.32)_56%,transparent_72%)] blur-md animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-amber-200/30 animate-[ping_1.8s_ease-out_infinite]" />
                <img
                  src={getAssetPath("images/party-badge.png")}
                  alt="Huy hiệu Đảng"
                  className="relative z-10 h-56 w-full object-contain drop-shadow-[0_0_34px_rgba(254,240,138,0.78)]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="mt-4 px-4 py-1.5 rounded-full border border-amber-400 bg-gradient-to-r from-amber-600/80 to-yellow-600/80 shadow-[0_4px_20px_rgba(245,158,11,0.4)]">
                <span className="font-title text-sm font-bold tracking-wider text-amber-50 text-shadow-sm">
                  ÁNH SÁNG CỦA ĐẢNG
                </span>
              </div>
            </div>
          )}

          {/* FINAL VICTORY SCREEN STATE */}
          {phase === "victory" && (
            <div className="relative flex w-full max-w-[840px] flex-col items-center px-2">
              
              {/* THE CERTIFICATE VIEW */}
              {showCertificate ? (
                <>
                <div 
                  id="print-area"
                  className="relative flex h-[405px] w-full max-w-[865px] flex-col justify-between overflow-hidden rounded-3xl border-[6px] double border-amber-600/70 bg-[#fffdf6] px-5 py-4 text-[#5b401e] shadow-2xl"
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(254,249,195,0.2) 0%, transparent 80%)",
                  }}
                >
                  {/* Greek Classic Border Line Inside */}
                  <div className="absolute inset-2 border border-amber-800/10 pointer-events-none rounded-2xl" />
                  <div className="absolute inset-3 border-2 border-amber-600/20 pointer-events-none rounded-xl" />
                  
                  {/* Seal Watermark in center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                    <Sun className="h-68 w-68 text-amber-900" />
                  </div>

                  {/* Top Header */}
                  <div className="relative mt-1 text-center">
                    <Award className="mx-auto h-5.5 w-5.5 text-amber-600 drop-shadow-sm" />
                    <div className="mx-auto mt-1.5 h-px w-20 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                    <p className="mt-1.5 text-[8px] font-extrabold tracking-[0.2em] text-amber-700">
                      HÀNH TRÌNH LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM
                    </p>
                    <h2 className="mt-1 font-title text-[24px] font-black leading-tight tracking-wide text-amber-900 md:text-[32px]">
                      CHỨNG NHẬN HOÀN THÀNH HỌC PHẦN
                    </h2>
                  </div>

                  {/* Body Text */}
                  <div className="relative my-1 space-y-2.5 px-5 text-center md:px-10">
                    <p className="text-[10px] italic text-amber-700">Chứng nhận này trân trọng vinh danh học viên:</p>
                    
                    <h3 className="mx-auto min-h-[30px] max-w-[450px] rounded-full border border-amber-900/10 border-b border-dashed border-amber-900/25 bg-white/55 px-7 py-2.5 font-title text-[22px] font-black uppercase text-amber-950 shadow-[0_10px_24px_rgba(177,126,45,0.08)] drop-shadow-sm md:text-[28px]">
                      {studentName.trim() || "(Vui lòng điền tên của bạn)"}
                    </h3>

                    <p className="mx-auto max-w-[610px] text-[11px] font-medium leading-6 text-amber-900/90 md:text-[13px]">
                      Đã kiên trì học hỏi và hoàn thành xuất sắc thử thách <strong>"Hành trình thoát khỏi hang Pác Pó"</strong>. Vượt qua 6 chặng lịch sử Đảng Cộng sản Việt Nam, thu thập đủ 6 biểu tượng tri thức để hợp nhất thành <strong>Ánh sáng của Đảng</strong>, củng cố hiểu biết về hành trình cách mạng Việt Nam.
                    </p>
                  </div>

                  {/* Footer (Signatures & Seal) */}
                  <div className="relative mb-0.5 flex items-end justify-between gap-5 px-5 md:px-9">
                    <div className="w-1/3 text-left">
                      <p className="text-[10px] font-extrabold text-amber-800">NGÀY HOÀN THÀNH</p>
                      <p className="mt-1 text-[12px] font-bold text-amber-900">
                        {new Date().toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                      <div className="mt-1.5 h-0.5 w-20 bg-amber-900/20" />
                    </div>

                    {/* Party emblem seal */}
                    <div className="print-seal relative -mt-3 flex h-20 w-24 items-center justify-center">
                      <img
                        src={getAssetPath("images/party-badge.png")}
                        alt="Huy hiệu Đảng"
                        className="h-20 w-24 object-contain drop-shadow-[0_8px_18px_rgba(177,99,20,0.28)]"
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    <div className="w-1/3 text-right">
                      <p className="text-[10px] font-extrabold text-amber-800">NGƯỜI DẪN ĐƯỜNG</p>
                      <p className="mt-1 text-[17px] font-bold italic leading-none tracking-wide text-amber-950 select-none">
                        Hang Pác Pó
                      </p>
                      <div className="ml-auto mt-1.5 h-0.5 w-20 bg-amber-900/20" />
                    </div>
                  </div>

                </div>
                <div
                  id="print-area-portrait"
                  className="print-only-certificate relative flex-col justify-between overflow-hidden rounded-[34px] border-[6px] double border-amber-600/70 bg-[#fffdf6] text-[#5b401e]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 50% 48%, rgba(254,249,195,0.24) 0%, transparent 68%)",
                  }}
                >
                  <div className="absolute inset-2 rounded-[26px] border border-amber-800/10 pointer-events-none" />
                  <div className="absolute inset-4 rounded-[20px] border-2 border-amber-600/20 pointer-events-none" />

                  <div className="relative text-center">
                    <img
                      src={getAssetPath("images/party-badge.png")}
                      alt="Huy hiệu Đảng"
                      className="mx-auto h-24 w-32 object-contain drop-shadow-[0_8px_18px_rgba(177,99,20,0.16)]"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
                    <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-700">
                      Hành trình Lịch sử Đảng Cộng sản Việt Nam
                    </p>
                    <h2 className="mx-auto mt-5 max-w-[430px] font-title text-[40px] font-black leading-tight tracking-wide text-amber-900">
                      CHỨNG NHẬN HOÀN THÀNH HỌC PHẦN
                    </h2>
                  </div>

                  <div className="relative space-y-5 text-center">
                    <p className="text-[14px] italic text-amber-700">
                      Chứng nhận này trân trọng vinh danh học viên:
                    </p>
                    <h3 className="mx-auto min-h-[58px] max-w-[390px] rounded-full border border-amber-900/10 border-b border-dashed border-amber-900/25 bg-white/60 px-7 py-3.5 font-title text-[34px] font-black uppercase text-amber-950 shadow-[0_10px_24px_rgba(177,126,45,0.08)]">
                      {studentName.trim() || "(Vui lòng điền tên của bạn)"}
                    </h3>
                    <p className="mx-auto max-w-[430px] text-[16px] font-medium leading-8 text-amber-900/90">
                      Đã kiên trì học hỏi và hoàn thành xuất sắc thử thách <strong>"Hành trình thoát khỏi hang Pác Pó"</strong>. Vượt qua 6 chặng lịch sử Đảng Cộng sản Việt Nam, thu thập đủ 6 biểu tượng tri thức để hợp nhất thành <strong>Ánh sáng của Đảng</strong>, củng cố hiểu biết về hành trình cách mạng Việt Nam.
                    </p>
                    <div className="print-seal mx-auto flex items-center justify-center">
                      <img
                        src={getAssetPath("images/party-badge.png")}
                        alt="Huy hiệu Đảng"
                        className="object-contain drop-shadow-[0_10px_22px_rgba(177,99,20,0.22)]"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="relative flex items-end justify-between gap-8 px-4">
                    <div className="w-1/2 text-left">
                      <p className="text-[12px] font-extrabold text-amber-800">NGÀY HOÀN THÀNH</p>
                      <p className="mt-2 text-[15px] font-bold text-amber-900">
                        {new Date().toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                      <div className="mt-2 h-0.5 w-28 bg-amber-900/20" />
                    </div>

                    <div className="w-1/2 text-right">
                      <p className="text-[12px] font-extrabold text-amber-800">NGƯỜI DẪN ĐƯỜNG</p>
                      <p className="mt-2 text-[22px] font-bold italic leading-none tracking-wide text-amber-950 select-none">
                        Hang Pác Pó
                      </p>
                      <div className="ml-auto mt-2 h-0.5 w-28 bg-amber-900/20" />
                    </div>
                  </div>
                </div>
                </>
              ) : (
                /* MAIN VICTORY EMBLEM AND CARD */
                <Card className="w-full max-w-[760px] overflow-hidden rounded-[30px] border-[#ecc67e] bg-[linear-gradient(135deg,rgba(255,253,248,0.985)_0%,rgba(252,244,222,0.97)_52%,rgba(247,233,198,0.95)_100%)] text-[#5c411c] shadow-[0_18px_52px_rgba(151,118,43,0.22)]">
                  <CardContent className="flex flex-col items-center px-5 pb-5 pt-6 text-center md:px-7 md:pb-6 md:pt-6">
                    {/* Shiny Emblem */}
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-full border border-[#ebd095] bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-[0_7px_16px_rgba(214,158,46,0.26)]">
                      <Sun className="h-6.5 w-6.5 text-white animate-spin-slow" style={{ animationDuration: "20s" }} />
                    </div>

                     <div className="mt-3 space-y-1">
                      <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#a17424]">
                        CHÚC MỪNG HỌC VIÊN
                      </p>
                      <h2 className="font-title text-[23px] font-black leading-none text-[#5c4017] md:text-[32px]">
                      HOÀN THÀNH HÀNH TRÌNH LỊCH SỬ
                      </h2>
                    </div>

                    <p className="mt-3 max-w-[520px] text-[13px] font-semibold leading-5 text-[#755c3c] md:text-[14px]">
                      Bạn đã xuất sắc vượt qua toàn bộ 6 thử thách, nắm được các chặng lớn trong lịch sử Đảng Cộng sản Việt Nam. Ánh sáng của Đảng đã soi rõ những mốc son cách mạng, giúp hành trình học tập trở nên sinh động và dễ nhớ hơn.
                    </p>

                    {/* Custom Name input to generate certificate */}
                    <div className="mt-4 w-full max-w-[455px] rounded-[20px] border border-amber-900/10 bg-amber-900/5 px-3.5 py-2.5 shadow-[0_8px_18px_rgba(151,118,43,0.08)]">
                      <label className="block text-left text-[13px] font-bold text-amber-800">Nhập tên của bạn để cấp chứng nhận hoàn thành:</label>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <input 
                          type="text" 
                          placeholder="Họ và tên học viên..."
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="h-9 flex-1 rounded-[13px] border border-amber-300 bg-white px-3 text-[13px] font-bold text-[#5c411c] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <Button 
                          onClick={() => studentName.trim() && setShowCertificate(true)}
                          disabled={!studentName.trim()}
                          className="h-9 rounded-[13px] bg-gradient-to-r from-amber-600 to-amber-700 px-4 text-[13px] font-bold text-white hover:brightness-105 sm:min-w-[188px]"
                        >
                          Nhận chứng nhận
                        </Button>
                      </div>
                    </div>

                    {/* Summary of Treasures collected */}
                    <div className="mt-4 w-full max-w-[455px] border-t border-[#eadbb7] pt-3">
                      <div className="grid grid-cols-6 gap-2">
                      {earnedTreasures.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={item.id} className="flex flex-col items-center gap-1">
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-white shadow-sm`} title={item.name}>
                              <IconComponent className="h-3 w-3" />
                            </div>
                            <span className="text-[9px] font-bold text-[#8d714a]">{item.stage}</span>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
          )}

        </div>

        {/* DYNAMIC ACTION BUTTONS */}
        <div
          className={`relative z-20 flex w-full flex-col items-center justify-center px-4 sm:flex-row ${
            phase === "victory" ? "mt-0.5 gap-2 pb-1" : "gap-3.5"
          }`}
        >
          {phase === "gather" && (
            <Button
              onClick={handleStartMerge}
              className="h-12 min-w-[260px] rounded-full bg-[linear-gradient(180deg,#ffe59b,#f5cc63)] border border-[#e5ba51] px-8 font-title text-[15px] font-black uppercase tracking-[0.12em] text-[#4f3718] shadow-[0_20px_42px_rgba(234,192,92,0.38)] hover:brightness-105 transition-all transform hover:scale-[1.03]"
            >
              Hợp nhất bảo vật
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {phase === "merged" && (
            <Button
              onClick={handleRevealWorld}
              className="h-12 min-w-[260px] rounded-full bg-[linear-gradient(180deg,#ffce73,#eb9b2f)] border border-[#df8c22] px-8 font-title text-[15px] font-black uppercase tracking-[0.12em] text-white shadow-[0_20px_42px_rgba(235,145,52,0.4)] hover:brightness-105 transition-all transform hover:scale-[1.03]"
            >
              Chiếu sáng thế giới thật
            </Button>
          )}

          {phase === "victory" && (
            <>
              {showCertificate ? (
                <>
                  <Button
                    onClick={handlePrint}
                    className="h-12 min-w-[190px] rounded-full bg-[linear-gradient(180deg,#ffce73,#eb9b2f)] border border-[#df8c22] text-[14px] font-black text-white shadow-lg hover:brightness-105 transition-all transform hover:scale-[1.02]"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    In / Tải PDF chứng nhận
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowCertificate(false)}
                    className="h-12 min-w-[170px] rounded-full border-[#d8c49b] bg-white/90 text-[14px] font-bold text-[#5f4621] shadow-lg hover:bg-white transition-all transform hover:scale-[1.02]"
                  >
                    Quay lại tổng quan
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={onBackToHome}
                    className="h-9 min-w-[152px] rounded-full border-[#d8c49b] bg-white/90 text-[13px] font-bold text-[#5f4621] shadow-lg hover:bg-white transition-all transform hover:scale-[1.02]"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Về trang chủ
                  </Button>
                  <Button
                    onClick={onReset}
                    className="h-9 min-w-[152px] rounded-full bg-[linear-gradient(180deg,#ffe59b,#f5cc63)] border border-[#e5ba51] text-[13px] font-black text-[#4f3718] shadow-lg hover:brightness-105 transition-all transform hover:scale-[1.02]"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Khám phá lại
                  </Button>
                </>
              )}
            </>
          )}
        </div>

          </CardContent>
        </Card>
      </div>
    </>
  );
}
