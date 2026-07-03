import React, { useEffect, useState } from "react";
import { ArrowLeft, SunMedium } from "lucide-react";
import { StageGame } from "@/components/stage-game";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WorldMap } from "@/components/world-map";
import { FinalReward } from "@/components/final-reward";
import { getAssetPath } from "@/lib/utils";

const pills = [
  "Mỗi chương là một ải riêng",
  "Cuối ải có thử thách vượt ải",
  "Qua hết các ải để hoàn thành học phần"
];

const features = [
  {
    icon: "◆",
    title: "Mỗi Chương Một Ải",
    description: "Học theo từng cụm kiến thức"
  },
  {
    icon: "✦",
    title: "Cổng Tri Thức",
    description: "Câu hỏi theo đúng chương"
  },
  {
    icon: <SunMedium className="h-4 w-4" />,
    title: "Thử Thách Vượt Ải",
    description: "Ôn tập trước khi sang ải mới"
  }
];

const criticalAssets = [
  "images/plato.png",
  "images/world-map-forest-mountain-bg.png"
];

function HomeScreen({ onOpenMap }) {
  return (
    <div className="mx-auto flex h-full max-w-[1320px] items-center">
      <Card className="h-full w-full overflow-hidden rounded-[38px] border-[#ecd7ad] bg-[linear-gradient(135deg,rgba(255,252,245,0.98)_0%,rgba(251,241,214,0.96)_52%,rgba(247,233,198,0.95)_100%)] shadow-[0_28px_90px_rgba(214,181,104,0.22)]">
        <CardContent className="grid h-full gap-4 p-4 md:grid-cols-[340px_minmax(0,1fr)] lg:grid-cols-[370px_minmax(0,1fr)] lg:gap-5 lg:p-5 xl:grid-cols-[390px_minmax(0,1fr)] xl:px-6 xl:py-5">
          <section className="flex h-full flex-col justify-center">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="overflow-hidden rounded-[34px] border border-[#e6d2a8] bg-[#fbf3dd] shadow-[0_24px_48px_rgba(123,94,42,0.14)]">
                <img
                  src={getAssetPath("images/plato.png")}
                  alt="Plato tại cửa hang động"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-[340px] w-full object-cover object-center md:h-[390px] lg:h-[430px] xl:h-[470px]"
                />
              </div>
              <p className="mx-auto mt-2 max-w-[320px] text-center font-title text-[14px] italic leading-6 text-[#967247] xl:text-[15px]">
                Bước qua bóng tối, mở từng cánh cổng bằng tri thức
              </p>
            </div>
          </section>

          <section className="flex h-full flex-col justify-center">
            <div className="mx-auto flex w-full max-w-[940px] flex-col justify-center gap-3">
              <Badge className="w-fit rounded-full border-[#ecc97e] bg-[#fff0cc] px-5 py-2.5 text-[11px] font-extrabold tracking-[0.16em] text-[#a06d1d]">
                Phiên bản mê cung triết học
              </Badge>

              <div className="space-y-1">
                <p className="font-title text-[24px] font-black leading-none tracking-[0.03em] text-[#5b411f] xl:text-[28px]">
                  HÀNH TRÌNH
                </p>
                <p className="font-title text-[50px] font-black leading-[0.94] tracking-[0.02em] text-[#da9618] xl:text-[60px]">
                  THOÁT KHỎI
                </p>
                <p className="font-title text-[28px] font-black leading-none tracking-[0.02em] text-[#5b411f] xl:text-[33px]">
                  HANG ĐỘNG PLATO
                </p>
              </div>

              <p className="max-w-[820px] text-[16px] leading-7 text-[#7c6241]">
                Di chuyển từng bước trong hang, vượt cổng tri thức để tìm đường ra ánh sáng.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {pills.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#efdcb5] bg-[#fff8eb] px-4 py-1.5 text-[12px] font-semibold text-[#88673d] shadow-[0_8px_18px_rgba(231,205,150,0.16)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Card className="rounded-[30px] border-[#ecdcb8] bg-[linear-gradient(180deg,rgba(255,251,241,0.98),rgba(250,241,220,0.94))] shadow-[0_16px_34px_rgba(198,162,88,0.12)]">
                <CardContent className="space-y-3 p-4 xl:p-5">
                  <p className="text-[15px] leading-7 text-[#755d3f]">
                    Bạn sẽ vượt qua từng <strong className="font-extrabold text-[#b87b1d]">ải theo chương học.</strong>{" "}
                    Trong mỗi ải, bạn di chuyển qua các cổng tri thức gắn với nội dung của chương đó.
                    Khi kết thúc ải, một màn{" "}
                    <strong className="font-extrabold text-[#b87b1d]">Thử thách vượt ải</strong> sẽ xuất hiện để
                    ôn tập trước khi sang chương tiếp theo.
                  </p>

                  <div className="rounded-[18px] border border-[#f4c6c8] bg-[#ffe8ea] px-5 py-2.5 text-[13px] font-semibold text-[#d56f7f]">
                    ! Trả lời sai sẽ mất mạng và khiến bóng tối tiến gần hơn.
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-3 md:grid-cols-3">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="rounded-[26px] border-[#ebddbd] bg-[#fffaf0] shadow-[0_14px_26px_rgba(205,177,116,0.1)]"
                  >
                    <CardContent className="flex items-center gap-3 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1d2] text-[14px] text-[#735128]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-title text-[16px] font-bold text-[#5b411f]">{feature.title}</h3>
                        <p className="mt-0.5 text-[12px] leading-5 text-[#8b6f49]">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-1">
                <Button
                  onClick={onOpenMap}
                  className="h-12 min-w-[280px] rounded-full bg-[linear-gradient(180deg,#ffe59b,#f5cc63)] px-8 font-title text-[15px] font-black uppercase tracking-[0.14em] text-[#4f3718] shadow-[0_20px_42px_rgba(234,192,92,0.34)] hover:brightness-105"
                >
                  Vào hang động
                </Button>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedStage, setSelectedStage] = useState(null);
  const [highestUnlockedStage, setHighestUnlockedStage] = useState(1);
  const [pendingUnlockedStageId, setPendingUnlockedStageId] = useState(null);
  const [collectedTreasureIds, setCollectedTreasureIds] = useState([]);

  useEffect(() => {
    criticalAssets.forEach((asset) => {
      const img = new Image();
      img.decoding = "async";
      img.src = getAssetPath(asset);
    });
  }, []);

  function handleStageComplete(stageId) {
    setCollectedTreasureIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));

    const nextUnlockedStage = Math.min(6, stageId + 1);

    setHighestUnlockedStage((prev) => {
      if (nextUnlockedStage > prev) {
        setPendingUnlockedStageId(nextUnlockedStage);
      }

      return Math.max(prev, nextUnlockedStage);
    });
  }

  function handleReset() {
    setHighestUnlockedStage(1);
    setPendingUnlockedStageId(null);
    setCollectedTreasureIds([]);
    setSelectedStage(null);
    setScreen("home");
  }

  return (
    <main className="h-screen overflow-hidden bg-hero-light px-4 py-4 text-foreground lg:px-6">
      {screen === "home" ? (
        <HomeScreen onOpenMap={() => setScreen("map")} />
      ) : screen === "map" ? (
        <div className="mx-auto flex h-full max-w-[1320px] flex-col gap-2 overflow-hidden">
          <div className="shrink-0 flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setScreen("home")}
              className="h-10 border-[#ead2a2] bg-white/80 px-4 text-sm font-bold text-[#6a4d24]"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại trang chủ
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <WorldMap
              highestUnlockedStage={highestUnlockedStage}
              collectedTreasureIds={collectedTreasureIds}
              unlockedStageId={pendingUnlockedStageId}
              onDismissUnlock={() => setPendingUnlockedStageId(null)}
              onSelectStage={(stage) => {
                if (stage.id > highestUnlockedStage) return;
                setPendingUnlockedStageId(null);
                setSelectedStage(stage.id);
                setScreen("stage");
              }}
            />
          </div>
        </div>
      ) : screen === "reward" ? (
        <FinalReward
          earnedTreasureIds={collectedTreasureIds}
          onReset={handleReset}
          onBackToHome={() => setScreen("home")}
        />
      ) : (
        <StageGame
          stageId={selectedStage ?? 1}
          onBack={() => {
            if (selectedStage === 6 && collectedTreasureIds.length >= 6) {
              setScreen("reward");
            } else {
              setScreen("map");
            }
          }}
          onStageComplete={handleStageComplete}
        />
      )}
    </main>
  );
}
