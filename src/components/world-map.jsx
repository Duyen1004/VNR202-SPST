import React, { useEffect, useMemo, useState } from "react";
import { Bell, Compass, Flame, Gem, Lock, LockOpen, Scale, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { lessonStages } from "@/data/gameplay";
import { stages, stageTreasures, worldMapLayout } from "@/data/stages";
import { cn, getAssetPath } from "@/lib/utils";

const treasureIcons = {
  Gem,
  Compass,
  Flame,
  Scale,
  Shield,
  Bell
};

function buildPath(start, end, index) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.hypot(deltaX, deltaY) || 1;
  const unitX = deltaX / distance;
  const unitY = deltaY / distance;
  const normalX = -unitY;
  const normalY = unitX;
  const direction = index % 2 === 0 ? 1 : -1;
  const curveStrength = Math.min(8.5, distance * 0.12) * direction;
  const radius = 4.1;
  const fromX = start.x + unitX * radius;
  const fromY = start.y + unitY * radius;
  const toX = end.x - unitX * radius;
  const toY = end.y - unitY * radius;
  const control1X = fromX + deltaX * 0.3 + normalX * curveStrength;
  const control1Y = fromY + deltaY * 0.2 + normalY * curveStrength;
  const control2X = toX - deltaX * 0.3 + normalX * curveStrength;
  const control2Y = toY - deltaY * 0.2 + normalY * curveStrength;

  return `M ${fromX} ${fromY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${toX} ${toY}`;
}

export function WorldMap({
  onSelectStage,
  highestUnlockedStage = 1,
  collectedTreasureIds = [],
  unlockedStageId = null,
  onDismissUnlock
}) {
  const [displayedUnlockStageId, setDisplayedUnlockStageId] = useState(null);
  const [showUnlockReveal, setShowUnlockReveal] = useState(false);
  const [showUnlockPopup, setShowUnlockPopup] = useState(false);

  const paths = useMemo(
    () =>
      worldMapLayout
        .slice(0, -1)
        .map((point, index) => buildPath(point, worldMapLayout[index + 1], index)),
    []
  );

  useEffect(() => {
    if (unlockedStageId == null) {
      setDisplayedUnlockStageId(null);
      setShowUnlockReveal(false);
      setShowUnlockPopup(false);
      return;
    }

    setDisplayedUnlockStageId(unlockedStageId);
    setShowUnlockReveal(true);
    setShowUnlockPopup(false);

    const revealTimer = window.setTimeout(() => {
      setShowUnlockReveal(false);
    }, 900);

    const popupTimer = window.setTimeout(() => {
      setShowUnlockPopup(true);
    }, 1150);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(popupTimer);
    };
  }, [unlockedStageId]);

  const unlockedStageDetail =
    displayedUnlockStageId != null
      ? lessonStages.find((item) => item.id === displayedUnlockStageId) ?? null
      : null;

  function handleDismissUnlock() {
    setShowUnlockPopup(false);
    setShowUnlockReveal(false);
    if (typeof onDismissUnlock === "function") {
      onDismissUnlock();
    }
  }

  return (
    <Card className="h-full overflow-hidden border-[#cdb893] bg-[linear-gradient(180deg,rgba(248,245,235,0.96),rgba(232,223,203,0.94))] shadow-[0_24px_56px_rgba(96,86,60,0.18)]">
      <CardContent className="flex h-full flex-col gap-3 p-4 lg:gap-4 lg:p-5">
        <div className="shrink-0 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7d6440] lg:text-sm">
              Hành trình mở khóa
            </p>
            <h2 className="font-title text-[25px] font-black text-[#5a3f1c] lg:text-[29px]">
              Bản đồ 6 ải tri thức
            </h2>
            <p className="text-sm text-[#7a6648]">
              Hoàn thành từng ải để mở khóa ải kế tiếp trên hành trình.
            </p>
          </div>

          <div className="w-full max-w-[420px] rounded-[22px] border border-[#dbc69d] bg-[linear-gradient(180deg,rgba(255,251,241,0.96),rgba(247,236,207,0.95))] p-3 shadow-[0_14px_30px_rgba(92,73,34,0.12)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#a47b39]">
              Bảo vật đã thu thập
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {stageTreasures.map((treasure) => {
                const IconComponent = treasureIcons[treasure.icon];
                const collected = collectedTreasureIds.includes(treasure.id);

                return (
                  <div
                    key={treasure.id}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-[16px] border px-2 py-2 text-center transition-all",
                      collected
                        ? "border-[#e7cb8e] bg-[#fff8e8] shadow-[0_10px_18px_rgba(183,146,67,0.15)]"
                        : "border-[#d8cfbf] bg-[#f4efe3] opacity-70"
                    )}
                    title={treasure.name}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-white",
                        collected ? `bg-gradient-to-br ${treasure.color}` : "bg-[#b8ad97]"
                      )}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="relative min-h-0 flex-1 overflow-hidden rounded-[28px] border border-[#c7b18c] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_24px_54px_rgba(77,87,63,0.24)] lg:p-5"
          style={{
            backgroundImage:
              `linear-gradient(180deg, rgba(7, 28, 17, 0.26) 0%, rgba(45, 78, 45, 0.10) 34%, rgba(11, 31, 19, 0.30) 100%), url('${getAssetPath("images/pac-bo-map-bg.jpg")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(245,239,219,0.24),transparent_14%),radial-gradient(circle_at_76%_16%,rgba(227,236,219,0.10),transparent_18%),radial-gradient(circle_at_50%_82%,rgba(22,31,23,0.22),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(180deg,rgba(245,236,210,0.10)_0%,rgba(245,236,210,0)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(24,33,25,0)_0%,rgba(18,25,19,0.24)_100%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/6" />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {paths.map((path, index) => (
              <g key={index}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(255, 244, 218, 0.9)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          <div className="relative h-full min-h-[420px] lg:min-h-[460px]">
            {stages.map((stage, index) => {
              const point = worldMapLayout[index];
              const locked = stage.id > highestUnlockedStage;
              const canOpen = typeof onSelectStage === "function" && !locked;
              const isFreshUnlock = displayedUnlockStageId === stage.id;
              const collectedTreasure = stageTreasures.find((item) => item.id === stage.treasureId) ?? null;
              const isTreasureCollected =
                collectedTreasure != null && collectedTreasureIds.includes(collectedTreasure.id);
              const TreasureIcon =
                collectedTreasure != null ? treasureIcons[collectedTreasure.icon] : null;

              return (
                <button
                  key={stage.id}
                  type="button"
                  disabled={!canOpen}
                  onClick={() => canOpen && onSelectStage(stage)}
                  className={cn(
                    "absolute z-10 w-36 -translate-x-1/2 -translate-y-1/2 text-center lg:w-40",
                    canOpen
                      ? "cursor-pointer transition-transform duration-200 hover:scale-[1.04] focus:outline-none focus-visible:scale-[1.04]"
                      : locked
                        ? "cursor-not-allowed"
                        : "cursor-default"
                  )}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  aria-label={locked ? `${stage.title} đang khóa` : `Mở ${stage.title}`}
                >
                  <div className="relative mx-auto h-24 w-24 lg:h-28 lg:w-28">
                    {!locked && (
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full bg-[#f2dc9c]/48 blur-xl",
                          isFreshUnlock && "animate-pulse bg-[#ffe48f]/60"
                        )}
                      />
                    )}
                    {isFreshUnlock && (
                      <div className="absolute inset-[-8px] rounded-full border border-[#ffe8a6]/70 animate-ping" />
                    )}
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-full shadow-[0_14px_28px_rgba(21,29,22,0.34)] transition-all duration-300",
                        locked
                          ? "h-24 w-24 border-[3px] border-[#b0a690] opacity-80 lg:h-28 lg:w-28"
                          : "h-24 w-24 border-[4px] border-[#d5b26d] lg:h-28 lg:w-28",
                        isFreshUnlock && "border-[#f3d37e] shadow-[0_0_26px_rgba(255,225,141,0.38)]"
                      )}
                    >
                      <img
                        src={stage.image}
                        alt={stage.title}
                        loading="eager"
                        decoding="async"
                        className={cn(
                          "h-full w-full object-cover",
                          locked ? "brightness-[0.50] saturate-[0.3] grayscale-[0.4]" : "brightness-[1.0] saturate-[1.1]"
                        )}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,247,219,0.16),transparent_34%),linear-gradient(180deg,rgba(11,20,12,0)_42%,rgba(14,19,15,0.22)_100%)]" />
                      {locked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0f1711]/20">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#efe2bd]/90 shadow-lg">
                            <Lock className="h-4 w-4 text-[#6d5328]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {isTreasureCollected && TreasureIcon && collectedTreasure && (
                      <div className="absolute -bottom-1 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#f9e2a0] bg-[linear-gradient(180deg,rgba(255,248,225,0.98),rgba(245,221,146,0.96))] px-2.5 py-1 shadow-[0_10px_22px_rgba(52,38,14,0.32)]">
                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-white", collectedTreasure.color)}>
                          <TreasureIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="max-w-[84px] truncate text-[10px] font-black uppercase tracking-[0.08em] text-[#69491b]">
                          {collectedTreasure.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <h3
                      className={cn(
                        "font-title text-[15px] font-bold leading-tight",
                        locked
                          ? "text-[#ece1c5] drop-shadow-[0_2px_4px_rgba(18,24,19,0.45)] lg:text-[16px]"
                          : "text-[#fff7e8] drop-shadow-[0_2px_5px_rgba(21,29,22,0.52)] lg:text-[17px]"
                      )}
                    >
                      {stage.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {showUnlockReveal && unlockedStageDetail && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,238,186,0.18),transparent_42%)]" />
              <div className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,230,153,0.34),rgba(255,230,153,0.1)_52%,transparent_74%)] blur-3xl animate-pulse" />
              <div className="absolute h-48 w-48 rounded-full border border-[#ffe7a8]/65 opacity-90 animate-ping" />
              <div className="absolute h-36 w-36 rounded-full border border-[#fff1c8]/45 opacity-80" />
              <div className="absolute flex flex-col items-center text-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[rgba(255,244,210,0.38)] bg-[radial-gradient(circle,rgba(74,63,46,0.9),rgba(28,24,20,0.96))] shadow-[0_18px_48px_rgba(0,0,0,0.34)]" />
                  <div className="absolute inset-[10px] rounded-full border border-[rgba(255,232,176,0.18)]" />
                  <div className="absolute inset-0 rounded-full border border-[#f7dc96]/70 opacity-0 animate-ping" />
                  <Lock className="absolute h-10 w-10 text-[#e8d6b0] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,228,136,0),rgba(255,228,136,0)_58%,rgba(255,228,136,0.18)_76%,rgba(255,228,136,0.42)_100%)]" />
                  <div className="absolute inset-0 animate-[ping_0.95s_ease-out_1] rounded-full border-2 border-[#f4d282]/85" />
                  <div className="absolute flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-[linear-gradient(180deg,rgba(255,250,234,0.96),rgba(244,205,102,0.92))] shadow-[0_0_36px_rgba(255,216,117,0.34)]">
                    <LockOpen className="h-10 w-10 text-[#6e4a16]" />
                  </div>
                </div>
                <div className="mt-5 rounded-[22px] border border-white/10 bg-[rgba(21,26,19,0.42)] px-5 py-3 backdrop-blur-[4px] shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#fff1c3]">
                    Mở khóa thành công
                  </p>
                  <p className="mt-1 font-title text-[30px] font-black text-[#fff8e8]">
                    Ải {unlockedStageDetail.id}
                  </p>
                  <p className="text-[13px] text-[#f3e7c5]">
                    {unlockedStageDetail.landmark ?? unlockedStageDetail.title}
                  </p>
                </div>
              </div>
            </div>
          )}

          {showUnlockPopup && unlockedStageDetail && (
            <div className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto bg-[#0f120d]/38 p-4 backdrop-blur-sm">
              <Card className="my-auto w-full max-w-[440px] max-h-full overflow-y-auto rounded-[24px] border-[#e5cf9c] bg-[linear-gradient(180deg,rgba(255,252,245,0.98),rgba(247,236,207,0.96))] shadow-[0_26px_70px_rgba(40,30,16,0.26)]">
                <CardContent className="p-4 lg:p-5">
                  <div className="relative mb-2.5 flex justify-center">
                    <div className="absolute inset-x-14 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(216,183,108,0.75),transparent)]" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#e8c778] bg-[radial-gradient(circle_at_top,#fff6dd,#f4c85b)] shadow-[0_14px_36px_rgba(208,163,54,0.24)]">
                      <LockOpen className="h-6 w-6 text-[#6e4a16]" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#b1822e]">
                      Cánh cổng mới đã sáng
                    </p>
                    <h3 className="mt-1 font-title text-[22px] font-black leading-tight text-[#4f3718]">
                      {unlockedStageDetail.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-[#755d3f]">
                      Bạn đã mở khóa thành công chặng tiếp theo trên bản đồ. Hãy tiến vào khi đã sẵn sàng.
                    </p>
                  </div>

                  <div className="mt-3 rounded-[18px] border border-[#efdfb9] bg-[#fffaf0] p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a17b3f]">
                      Điểm đến tiếp theo
                    </p>
                    <p className="mt-0.5 font-title text-[16px] font-black text-[#5a3f1c]">
                      {unlockedStageDetail.landmark ?? unlockedStageDetail.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#7d6440]">
                      Hoàn thành ải hiện tại để tiếp tục chinh phục toàn bộ hành trình tri thức.
                    </p>
                  </div>

                  <div className="mt-3.5 flex justify-center">
                    <Button
                      onClick={handleDismissUnlock}
                      className="h-10 rounded-full bg-[linear-gradient(180deg,#ffe59b,#f2c85c)] px-6 font-title text-[13px] font-black tracking-[0.04em] text-[#553916]"
                    >
                      Tiếp tục hành trình
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
