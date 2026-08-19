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
  "Mỗi chặng là một giai đoạn lịch sử",
  "Cuối chặng có thử thách vượt ải",
  "Qua hết các chặng để hoàn thành học phần"
];

const features = [
  {
    icon: "◆",
    title: "Mỗi Chặng Một Ải",
    description: "Học theo từng giai đoạn lịch sử"
  },
  {
    icon: "✦",
    title: "Cổng Lịch Sử",
    description: "Câu hỏi theo từng mốc lớn"
  },
  {
    icon: <SunMedium className="h-4 w-4" />,
    title: "Thử Thách Vượt Ải",
    description: "Ôn tập trước khi sang chặng mới"
  }
];

const criticalAssets = [
  "images/bac-ho-pac-bo.jpg",
  "images/hang-pac-bo.jpg",
  "images/pac-bo-map-bg.jpg",
  "images/pac-bo-stage-1.png",
  "images/pac-bo-stage-2.png",
  "images/pac-bo-stage-3.png",
  "images/pac-bo-stage-4.png",
  "images/pac-bo-stage-5.png",
  "images/pac-bo-stage-6.png"
];

function HomeScreen({ onOpenMap }) {
  return (
    <div className="mx-auto flex h-full max-w-[1320px] items-center">
      <Card className="h-full w-full overflow-hidden rounded-[38px] border-[#8eaa7b] bg-[linear-gradient(135deg,rgba(238,246,225,0.98)_0%,rgba(214,232,197,0.96)_48%,rgba(169,197,135,0.94)_100%)] shadow-[0_28px_90px_rgba(19,56,34,0.28)]">
        <CardContent className="grid h-full gap-4 p-4 md:grid-cols-[340px_minmax(0,1fr)] lg:grid-cols-[370px_minmax(0,1fr)] lg:gap-5 lg:p-5 xl:grid-cols-[390px_minmax(0,1fr)] xl:px-6 xl:py-5">
          <section className="flex h-full flex-col justify-center">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="relative overflow-hidden rounded-[34px] border border-[#7f9f6d] bg-[#dfead2] shadow-[0_24px_48px_rgba(23,68,42,0.22)]">
                <img
                  src={getAssetPath("images/bac-ho-pac-bo.jpg")}
                  alt="Bác Hồ ở Pác Bó"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-[340px] w-full object-cover object-center md:h-[390px] lg:h-[430px] xl:h-[470px]"
                />
                <div className="absolute bottom-3 right-3 w-[46%] overflow-hidden rounded-[22px] border-4 border-[#eef6df] shadow-[0_18px_34px_rgba(8,34,21,0.34)]">
                  <img
                    src={getAssetPath("images/hang-pac-bo.jpg")}
                    alt="Cửa hang Pác Bó"
                    loading="eager"
                    decoding="async"
                    className="h-[128px] w-full object-cover object-center md:h-[150px] lg:h-[170px]"
                  />
                </div>
              </div>
              <p className="mx-auto mt-2 max-w-[320px] text-center font-title text-[14px] italic leading-6 text-[#e7f1d7] xl:text-[15px]">
                Bước qua bóng tối, mở từng cánh cổng bằng tri thức
              </p>
            </div>
          </section>

          <section className="flex h-full flex-col justify-center">
            <div className="mx-auto flex w-full max-w-[940px] flex-col justify-center gap-3">
              <Badge className="w-fit rounded-full border-[#94b574] bg-[#e6f2d8] px-5 py-2.5 text-[11px] font-extrabold tracking-[0.16em] text-[#315d33]">
                Phiên bản mê cung lịch sử
              </Badge>

              <div className="space-y-1">
                <p className="font-title text-[24px] font-black leading-none tracking-[0.03em] text-[#24452a] xl:text-[28px]">
                  HÀNH TRÌNH
                </p>
                <p className="font-title text-[50px] font-black leading-[0.94] tracking-[0.02em] text-[#2f7a3a] xl:text-[60px]">
                  KHÁM PHÁ
                </p>
                <p className="font-title text-[28px] font-black leading-none tracking-[0.02em] text-[#24452a] xl:text-[33px]">
                  HANG PÁC PÓ
                </p>
              </div>

              <p className="max-w-[820px] text-[16px] leading-7 text-[#385f3a]">
                Di chuyển từng bước trong hang, vượt cổng lịch sử để mở khóa hành trình cách mạng Việt Nam.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {pills.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#a9c590] bg-[#edf6df] px-4 py-1.5 text-[12px] font-semibold text-[#3f6537] shadow-[0_8px_18px_rgba(74,115,55,0.14)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Card className="rounded-[30px] border-[#acc595] bg-[linear-gradient(180deg,rgba(244,250,236,0.98),rgba(224,239,209,0.94))] shadow-[0_16px_34px_rgba(49,88,47,0.13)]">
                <CardContent className="space-y-3 p-4 xl:p-5">
                  <p className="text-[15px] leading-7 text-[#385a34]">
                    Bạn sẽ vượt qua từng <strong className="font-extrabold text-[#2f7a3a]">ải theo giai đoạn lịch sử.</strong>{" "}
                    Trong mỗi ải, bạn di chuyển qua các cổng tri thức gắn với nội dung lịch sử Đảng.
                    Khi kết thúc ải, một màn{" "}
                    <strong className="font-extrabold text-[#2f7a3a]">Thử thách vượt ải</strong> sẽ xuất hiện để
                    ôn tập trước khi sang chặng tiếp theo.
                  </p>

                  <div className="rounded-[18px] border border-[#b6d29c] bg-[#e8f4d7] px-5 py-2.5 text-[13px] font-semibold text-[#47713c]">
                    ! Trả lời sai sẽ mất mạng và khiến bóng tối tiến gần hơn.
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-3 md:grid-cols-3">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="rounded-[26px] border-[#b4cb9f] bg-[#f2f8e9] shadow-[0_14px_26px_rgba(52,94,46,0.1)]"
                  >
                    <CardContent className="flex items-center gap-3 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dcecc9] text-[14px] text-[#2f6030]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-title text-[16px] font-bold text-[#294d2b]">{feature.title}</h3>
                        <p className="mt-0.5 text-[12px] leading-5 text-[#55734a]">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-1">
                <Button
                  onClick={onOpenMap}
                  className="h-12 min-w-[280px] rounded-full bg-[linear-gradient(180deg,#d7ed8f,#89b64e)] px-8 font-title text-[15px] font-black uppercase tracking-[0.14em] text-[#203d23] shadow-[0_20px_42px_rgba(80,126,51,0.3)] hover:brightness-105"
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
    <main className="h-screen overflow-hidden bg-[radial-gradient(circle_at_78%_12%,rgba(238,230,160,0.38),transparent_30%),radial-gradient(circle_at_14%_22%,rgba(224,242,202,0.72),transparent_34%),linear-gradient(135deg,#eef6df_0%,#d9e9c8_48%,#b8d19d_100%)] px-4 py-4 text-foreground lg:px-6">
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
          onBack={(completedStageId) => {
            if (completedStageId === 6 || (selectedStage === 6 && collectedTreasureIds.length >= 6)) {
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
