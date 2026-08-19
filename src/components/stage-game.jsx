import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, MapPinned, Gem, Compass, Flame, Scale, Shield, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { lessonStages, mazeLayouts } from "@/data/gameplay";
import { cn } from "@/lib/utils";

const STAGE_TREASURES = {
  1: { name: "Ngọn Lửa 1930", desc: "Biểu tượng cho dấu mốc Đảng Cộng sản Việt Nam ra đời", icon: Gem, color: "from-blue-400 to-indigo-600" },
  2: { name: "Cờ Việt Minh", desc: "Biểu tượng cho sức mạnh đoàn kết giành chính quyền", icon: Compass, color: "from-teal-400 to-emerald-600" },
  3: { name: "Chiến Công Điện Biên", desc: "Biểu tượng cho ý chí kháng chiến toàn dân", icon: Flame, color: "from-orange-400 to-red-600" },
  4: { name: "Đường Trường Sơn", desc: "Biểu tượng cho khát vọng thống nhất non sông", icon: Scale, color: "from-amber-400 to-yellow-600" },
  5: { name: "Dấu Mốc Đổi Mới", desc: "Biểu tượng cho tư duy mới từ thực tiễn đất nước", icon: Shield, color: "from-purple-400 to-pink-600" },
  6: { name: "Cánh Cửa Hội Nhập", desc: "Biểu tượng cho Việt Nam đổi mới và phát triển", icon: Bell, color: "from-sky-400 to-blue-600" }
};

function buildPath(start, end, index) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.hypot(deltaX, deltaY) || 1;
  const unitX = deltaX / distance;
  const unitY = deltaY / distance;
  const normalX = -unitY;
  const normalY = unitX;
  const startRadius = 3.6;
  const endRadius = 3.6;
  const fromX = start.x + unitX * startRadius;
  const fromY = start.y + unitY * startRadius;
  const toX = end.x - unitX * endRadius;
  const toY = end.y - unitY * endRadius;
  const direction = index % 2 === 0 ? -1 : 1;
  const curveStrength = Math.min(4.8, distance * 0.1) * direction;
  const control1X = fromX + deltaX * 0.28 + normalX * curveStrength;
  const control1Y = fromY + deltaY * 0.18 + normalY * curveStrength;
  const control2X = toX - deltaX * 0.28 + normalX * curveStrength;
  const control2Y = toY - deltaY * 0.18 + normalY * curveStrength;

  return `M ${fromX} ${fromY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${toX} ${toY}`;
}

function getLabelPositionClasses(placement = "bottom") {
  switch (placement) {
    case "top":
      return "bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2";
    case "left":
      return "right-[calc(100%+12px)] top-1/2 -translate-y-1/2";
    case "right":
      return "left-[calc(100%+12px)] top-1/2 -translate-y-1/2";
    default:
      return "top-[calc(100%+12px)] left-1/2 -translate-x-1/2";
  }
}

export function StageGame({ stageId = 1, onBack, onStageComplete }) {
  const stage = lessonStages.find((item) => item.id === stageId) ?? lessonStages[0];
  const nodes = mazeLayouts[stage.id] ?? mazeLayouts[1];
  const totalQuestions = stage.questions.length;

  const [playerNode, setPlayerNode] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [lives, setLives] = useState(5);
  const [questionState, setQuestionState] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showDefeatModal, setShowDefeatModal] = useState(false);
  const [completionStep, setCompletionStep] = useState(1);

  const currentNode = nodes[playerNode];
  const nextNodeWithQuestion = nodes.find(
    (node) =>
      typeof node.questionIndex === "number" &&
      !completedQuestions.includes(node.questionIndex) &&
      node.id >= playerNode
  );
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);
  const darknessLevel = Math.min(0.58, (5 - lives) * 0.1);
  const canMoveBack = !questionState && !showDefeatModal && playerNode > 0;
  const canMoveForward = !questionState && !finished && !showDefeatModal && playerNode < nodes.length - 1;

  const paths = useMemo(
    () => nodes.slice(0, -1).map((node, index) => buildPath(node, nodes[index + 1], index)),
    [nodes]
  );

  function finishStage() {
    setFinished(true);
    setShowCompletionModal(true);
  }

  function handleCompletionClose() {
    if (typeof onStageComplete === "function") {
      onStageComplete(stage.id);
    }

    if (typeof onBack === "function") {
      onBack(stage.id);
    }
  }

  function resetStageProgress() {
    setPlayerNode(0);
    setCompletedQuestions([]);
    setLives(5);
    setQuestionState(null);
    setFinished(false);
    setShowCompletionModal(false);
    setCompletionStep(1);
    setShowDefeatModal(false);
  }

  function handleDefeatClose() {
    if (typeof onBack === "function") {
      onBack();
    }
  }

  function openNodeQuestion(node) {
    const question = stage.questions[node.questionIndex];
    setQuestionState({
      question,
      pendingNode: node.id,
      pendingQuestionIndex: node.questionIndex,
      selected: null,
      result: null
    });
  }

  function movePlayer(direction) {
    const targetIndex = playerNode + direction;
    if (targetIndex < 0 || targetIndex >= nodes.length) return;

    const targetNode = nodes[targetIndex];

    if (
      typeof targetNode.questionIndex === "number" &&
      !completedQuestions.includes(targetNode.questionIndex)
    ) {
      openNodeQuestion(targetNode);
      return;
    }

    setPlayerNode(targetIndex);

    if (targetNode.type === "exit") {
      finishStage();
    }
  }

  function handleNodeClick(nodeId) {
    if (questionState) return;
    if (nodeId === playerNode) return;

    const direction = nodeId - playerNode;
    if (Math.abs(direction) !== 1) return;

    movePlayer(direction);
  }

  function answerQuestion(answerIndex) {
    if (!questionState || questionState.result) return;
    const isCorrect = answerIndex === questionState.question.correct;

    setQuestionState((prev) => ({
      ...prev,
      selected: answerIndex,
      result: isCorrect ? "correct" : "wrong"
    }));

    if (!isCorrect) {
      setLives((prev) => {
        const nextLives = Math.max(0, prev - 1);
        if (nextLives === 0) {
          setShowDefeatModal(true);
        }
        return nextLives;
      });
    }
  }

  function continueQuestion() {
    if (!questionState) return;
    const isCorrect = questionState.selected === questionState.question.correct;

    if (!isCorrect) {
      setQuestionState((prev) => ({
        ...prev,
        selected: null,
        result: null
      }));
      return;
    }

    setCompletedQuestions((prev) =>
      prev.includes(questionState.pendingQuestionIndex)
        ? prev
        : [...prev, questionState.pendingQuestionIndex]
    );
    setPlayerNode(questionState.pendingNode);

    if (nodes[questionState.pendingNode]?.type === "exit") {
      finishStage();
    }

    setQuestionState(null);
  }

  useEffect(() => {
    setPlayerNode(0);
    setCompletedQuestions([]);
    setLives(5);
    setQuestionState(null);
    setFinished(false);
    setShowCompletionModal(false);
    setCompletionStep(1);
    setShowDefeatModal(false);
  }, [stage.id]);

  useEffect(() => {
    function handleKeyDown(event) {
      const activeTag = document.activeElement?.tagName;
      const isTypingField =
        activeTag === "INPUT" || activeTag === "TEXTAREA" || document.activeElement?.isContentEditable;

      if (isTypingField) return;

      if (showDefeatModal) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          resetStageProgress();
        }
        return;
      }

      if (showCompletionModal) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCompletionClose();
        }
        return;
      }

      if (questionState) {
        if (!questionState.result) {
          if (event.key >= "1" && event.key <= "4") {
            const answerIndex = Number(event.key) - 1;
            if (answerIndex < questionState.question.answers.length) {
              event.preventDefault();
              answerQuestion(answerIndex);
            }
          }
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          continueQuestion();
        }
        return;
      }

      if ((event.key === "ArrowLeft" || event.key === "a" || event.key === "A") && canMoveBack) {
        event.preventDefault();
        movePlayer(-1);
      }

      if ((event.key === "ArrowRight" || event.key === "d" || event.key === "D") && canMoveForward) {
        event.preventDefault();
        movePlayer(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canMoveBack, canMoveForward, questionState, playerNode, completedQuestions, finished, showCompletionModal, showDefeatModal]);

  const stageHeading = stage.landmark ?? stage.title;
  const movementHint = finished
    ? `Bạn đã vượt qua toàn bộ ${totalQuestions} thử thách của ${stage.title} và chạm tới lối ra cuối cùng.`
    : typeof currentNode.questionIndex === "number" &&
        !completedQuestions.includes(currentNode.questionIndex)
      ? "Điểm hiện tại vẫn còn câu hỏi chưa mở. Hãy vượt qua thử thách để tiếp tục hành trình."
      : `Tiến sâu hơn qua từng điểm ảnh của mê cung. Mỗi chặng sẽ mở ra một câu hỏi kiến thức của ${stage.title}.`;
  const currentQuestionNumber = questionState ? questionState.pendingQuestionIndex + 1 : 0;
  const upcomingStage = lessonStages.find((item) => item.id === stage.id + 1);
  const nextStageTitle = nextNodeWithQuestion
    ? nextNodeWithQuestion.label
    : finished
      ? "Đã chạm lối ra"
      : "Tất cả câu hỏi đã mở";
  const nextStageDescription = nextNodeWithQuestion
    ? `Thử thách ${nextNodeWithQuestion.questionIndex + 1}/${totalQuestions} đang chờ bạn mở khóa trong ${stage.title}.`
    : finished
      ? `Bạn đã hoàn thành toàn bộ ${totalQuestions} câu hỏi của ải này.`
      : "Chỉ còn tiến tới lối ra cuối cùng để khép lại hành trình.";

  return (
    <div className="mx-auto flex h-full max-w-[1320px] flex-col gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={onBack}
          className="h-9 border-[#d8c49b] bg-white/88 px-3.5 text-sm font-bold text-[#5f4621]"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại bản đồ
        </Button>

        <div className="flex items-center gap-2.5 rounded-full border border-[#dcc89d] bg-white/84 px-3.5 py-1.5 shadow-[0_14px_28px_rgba(153,117,45,0.12)]">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#91661c]">
            Mạng sống
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Heart
                key={index}
                className={cn(
                  "h-4 w-4",
                  index < lives ? "fill-[#8b5b21] text-[#8b5b21]" : "text-[#d9cba8]"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1.68fr)_270px]">
        <Card className="min-h-0 overflow-hidden rounded-[34px] border-[#e5d2aa] bg-[linear-gradient(180deg,rgba(255,251,242,0.96),rgba(245,235,210,0.92))] shadow-[0_24px_50px_rgba(181,145,73,0.14)]">
          <CardContent className="flex h-full flex-col p-4 lg:p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9f6e1f]">
                  Mê cung tri thức
                </p>
                <h2 className="font-title text-[21px] font-black leading-tight text-[#4f3718] lg:text-[24px]">
                  {stageHeading}
                </h2>
                <p className="text-[14px] text-[#745c38] lg:text-[15px]">{stage.title}</p>
              </div>

              <div className="w-full max-w-[220px] rounded-[20px] border border-[#ebd9b5] bg-white/76 p-2.5 shadow-[0_12px_28px_rgba(165,126,52,0.08)]">
                <Badge className="mb-2 rounded-full border-[#e7ca82] bg-[#fff1cd] px-3 py-1 text-[10px] font-extrabold tracking-[0.12em] text-[#9b6d1c]">
                  Ải {stage.id}/6
                </Badge>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9d7b44]">
                  Tiến trình vượt ải
                </p>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-[#e9ddc4]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#f1c55e,#d69528)] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2.5 text-[13px] font-semibold text-[#755d3f]">
                  {completedQuestions.length}/{totalQuestions} thử thách đã mở
                </p>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[26px] border border-[#dec896] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:px-4">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${stage.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,42,29,0.18),rgba(22,29,20,0.34))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,232,170,0.18),transparent_18%),radial-gradient(circle_at_82%_12%,rgba(235,214,150,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(20,28,21,0.14)_24%,transparent_42%)]" />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,10,8,0.08),rgba(5,8,6,0.6)_72%,rgba(4,6,5,0.88)_100%)] transition-opacity duration-500"
                style={{ opacity: darknessLevel }}
              />
              {lives <= 2 ? (
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_12%,rgba(8,10,8,0.12)_34%,rgba(5,7,6,0.46)_100%)] transition-opacity duration-500"
                  style={{ opacity: lives === 0 ? 1 : lives === 1 ? 0.82 : 0.56 }}
                />
              ) : null}

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {paths.map((path, index) => {
                  const active = index < playerNode;
                  return (
                    <g key={index}>
                      <path
                        d={path}
                        fill="none"
                        stroke={active ? "rgba(131, 106, 60, 0.28)" : "rgba(118, 107, 88, 0.18)"}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={path}
                        fill="none"
                        stroke={active ? "rgba(238, 220, 182, 0.78)" : "rgba(231, 219, 193, 0.62)"}
                        strokeWidth="1.05"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="relative h-full min-h-[340px] lg:min-h-[360px]">
                {nodes.map((node) => {
                  const isCurrent = playerNode === node.id;
                  const isAdjacent = Math.abs(node.id - playerNode) === 1;
                  const questionDone =
                    typeof node.questionIndex === "number" &&
                    completedQuestions.includes(node.questionIndex);
                  const isExitLocked =
                    node.type === "exit" &&
                    typeof node.questionIndex === "number" &&
                    !completedQuestions.includes(node.questionIndex);
                  const isNodeClickable = !questionState && isAdjacent;

                  return (
                    <div
                      key={node.id}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 text-center",
                        isNodeClickable ? "cursor-pointer" : "cursor-default"
                      )}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      onClick={() => handleNodeClick(node.id)}
                    >
                      <div
                        className={cn(
                          "relative mx-auto h-[62px] w-[62px] overflow-hidden rounded-full border-[3px] shadow-[0_14px_26px_rgba(56,44,18,0.2)] transition-transform duration-200 lg:h-[70px] lg:w-[70px]",
                          isCurrent
                            ? "border-[#5ea3eb] ring-4 ring-[#8ec0f5]/40"
                            : questionDone
                              ? "border-[#d79d3e]"
                              : isExitLocked
                                ? "border-[#d8c59f] opacity-85"
                                : "border-[#efbe70]",
                          isNodeClickable && "hover:scale-[1.06]"
                        )}
                      >
                        <img
                          src={node.image}
                          alt={node.label}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        {isCurrent && (
                          <div className="absolute bottom-0 left-1/2 flex h-6 w-6 -translate-x-1/2 translate-y-1/3 items-center justify-center rounded-full bg-[#4576bf] text-[9px] font-black text-white shadow-lg">
                            S
                          </div>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute flex w-max min-h-7 max-w-[190px] items-center justify-center rounded-full border border-[#ead9b9] bg-[rgba(255,248,233,0.96)] px-1 py-0.5 text-center text-[10px] font-bold leading-tight text-[#704f1e] shadow-sm backdrop-blur-[2px]",
                          getLabelPositionClasses(node.labelPlacement)
                        )}
                        style={{ maxWidth: node.labelWidth ? `${node.labelWidth}px` : "136px" }}
                      >
                        {node.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex min-h-0 flex-col gap-3">
          <Card className="rounded-[30px] border-[#e6d5ac] bg-[linear-gradient(180deg,rgba(255,252,245,0.95),rgba(248,239,216,0.92))]">
            <CardContent className="space-y-2.5 p-3">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a07c46]">
                  Vị trí hiện tại
                </p>
                <h3 className="font-title text-[18px] font-black text-[#4f3718]">
                  {currentNode.label}
                </h3>
              </div>
              <p className="text-[12px] leading-5 text-[#755d3f]">{movementHint}</p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  variant="secondary"
                  disabled={!canMoveBack}
                  onClick={() => movePlayer(-1)}
                  className="h-8.5 whitespace-nowrap rounded-2xl border-[#e7d4ab] bg-white/80 text-[13px] text-[#7b633f] disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Lùi lại
                </Button>
                <Button
                  disabled={!canMoveForward}
                  onClick={() => movePlayer(1)}
                  className="h-8.5 whitespace-nowrap rounded-2xl bg-[linear-gradient(180deg,#ffe59d,#f3c95f)] text-[13px] text-[#563b17] disabled:opacity-40"
                >
                  Tiến lên
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] border-[#e6d5ac] bg-[linear-gradient(180deg,rgba(255,252,245,0.95),rgba(248,239,216,0.92))]">
            <CardContent className="space-y-2 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a07c46]">
                Thông tin ải
              </p>
              <h3 className="font-title text-[15px] font-black leading-tight text-[#4f3718]">
                {stage.title}
              </h3>
              <p className="text-[12px] leading-5 text-[#755d3f]">{stage.objective}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] border-[#e6d5ac] bg-[linear-gradient(180deg,rgba(255,252,245,0.95),rgba(248,239,216,0.92))]">
            <CardContent className="space-y-2 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a07c46]">
                Chặng kế tiếp
              </p>
              <h3 className="font-title text-[15px] font-black leading-tight text-[#4f3718]">
                {nextStageTitle}
              </h3>
              <p className="text-[12px] leading-5 text-[#755d3f]">{nextStageDescription}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {questionState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f120d]/56 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-[700px] rounded-[28px] border-[#e5cf9c] bg-[linear-gradient(180deg,rgba(255,252,245,0.98),rgba(247,236,207,0.96))] shadow-[0_22px_56px_rgba(40,30,16,0.22)]">
            <CardContent className="flex max-h-[84vh] min-h-[540px] flex-col p-5 lg:min-h-[580px] lg:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Badge className="rounded-full border-[#e2c37b] bg-[#fff1cb] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.12em] text-[#9c6e1e]">
                  Thử thách {currentQuestionNumber}/{totalQuestions}
                </Badge>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#9b7a48]">
                  {questionState.question.category}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-3 rounded-[20px] border border-[#ecdab6] bg-white/72 px-3.5 py-2.5 text-[#7b5d2d]">
                <MapPinned className="h-4 w-4 shrink-0 text-[#c18a2b]" />
                <p className="text-sm font-semibold">{nodes[questionState.pendingNode]?.label}</p>
              </div>

              <h3 className="font-title text-[24px] font-black leading-tight text-[#4f3718] lg:text-[26px]">
                {questionState.question.question}
              </h3>

              <div className="mt-5 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3">
                  {questionState.question.answers.map((answer, index) => {
                    const isChosen = questionState.selected === index;
                    const isCorrect = index === questionState.question.correct;
                    return (
                      <button
                        key={answer}
                        type="button"
                        onClick={() => answerQuestion(index)}
                        disabled={!!questionState.result}
                        className={cn(
                          "rounded-[20px] border px-4 py-3 text-left text-[14px] font-semibold transition",
                          !questionState.result &&
                            "border-[#ead7ae] bg-white/82 text-[#6f5938] hover:border-[#ddb35c] hover:bg-[#fff4dd]",
                          questionState.result &&
                            isCorrect &&
                            "border-[#8bbb70] bg-[#eef9e5] text-[#3d6a27]",
                          questionState.result &&
                            isChosen &&
                            !isCorrect &&
                            "border-[#e6a0a0] bg-[#fff0f0] text-[#9a4b4b]",
                          questionState.result &&
                            !isChosen &&
                            !isCorrect &&
                            "border-[#eadfca] bg-[#faf6ef] text-[#957b57]"
                        )}
                      >
                        {answer}
                      </button>
                    );
                  })}
                </div>

                {questionState.result && (
                  <div className="mt-5 rounded-[20px] border border-[#eadbb7] bg-white/68 p-4">
                    <p
                      className={cn(
                        "text-[15px] font-extrabold",
                        questionState.result === "correct" ? "text-[#4f8b31]" : "text-[#bb5e5e]"
                      )}
                    >
                      {questionState.result === "correct"
                        ? "Đúng rồi. Bạn đã mở được điểm thử thách này."
                        : "Chưa đúng. Hãy đọc lại gợi ý và thử tiếp."}
                    </p>
                    <p className="mt-2 text-[14px] leading-6 text-[#735d3c]">
                      {questionState.question.explanation}
                    </p>
                  </div>
                )}
              </div>

              {questionState.result && (
                <div className="mt-4 shrink-0 border-t border-[#eadbb7] pt-4">
                  <Button
                    onClick={continueQuestion}
                    className="h-10 rounded-full bg-[linear-gradient(180deg,#ffe59b,#f2c85c)] px-5 text-[14px] text-[#553916]"
                  >
                    Tiếp tục
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {showCompletionModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0f120d]/62 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-[650px] overflow-hidden rounded-[34px] border-[#e5cf9c] bg-[linear-gradient(180deg,rgba(255,253,248,0.985),rgba(248,238,211,0.97))] shadow-[0_30px_90px_rgba(40,30,16,0.28)]">
            <CardContent className="relative p-6 text-center lg:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,225,141,0.34),transparent_72%)]" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,155,69,0.55),transparent)]" />
              
              {completionStep === 1 ? (
                // Step 1: Treasure Award Display!
                (() => {
                  const treasure = STAGE_TREASURES[stage.id];
                  const IconComponent = treasure?.icon;
                  return (
                    <div className="flex flex-col items-center py-4">
                      <div className="relative mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[#edd8a8] bg-[#fff8e8] px-4 py-1.5 shadow-[0_10px_24px_rgba(210,173,91,0.12)]">
                        <span className="h-2 w-2 rounded-full bg-[#e0b145]" />
                        <span className="text-[11px] font-extrabold tracking-[0.22em] text-[#a87928]">
                          Bảo vật được mở khóa
                        </span>
                      </div>

                      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#be8d34]">
                        Hoàn thành Ải {stage.id}
                      </p>
                      
                      <h3 className="mt-2 font-title text-[30px] font-black leading-[1.1] text-[#4f3718] lg:text-[34px]">
                        Bạn đã nhận được bảo vật!
                      </h3>

                      {/* Floating, glowing treasure icon container */}
                      <div className="relative flex items-center justify-center w-36 h-36 my-6">
                        {/* Golden rays and aura */}
                        <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
                        <div className="absolute inset-[-10px] rounded-full border-2 border-dashed border-amber-300/30 animate-spin" style={{ animationDuration: '15s' }} />
                        <div className="absolute inset-0 rounded-full border border-amber-300/20" />
                        
                        {/* Main icon */}
                        <div className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${treasure?.color} text-white shadow-xl`}>
                          {IconComponent && <IconComponent className="w-11 h-11 drop-shadow-md" />}
                        </div>
                      </div>

                      <div className="max-w-[480px] text-center space-y-2">
                        <h4 className="font-title text-2xl font-black text-amber-900 leading-tight">
                          {treasure?.name}
                        </h4>
                        <p className="text-sm text-[#755d3f] leading-relaxed">
                          {treasure?.desc}
                        </p>
                      </div>

                      <Button
                        onClick={() => setCompletionStep(2)}
                        className="mt-8 h-12 min-w-[200px] rounded-full bg-[linear-gradient(180deg,#ffe59b,#f2c85c)] px-8 font-title text-[15px] font-black tracking-[0.04em] text-[#553916] shadow-[0_18px_34px_rgba(224,174,56,0.24)] transition hover:brightness-105"
                      >
                        Thu nhận
                      </Button>
                    </div>
                  );
                })()
              ) : (
                // Step 2: Next stage details
                <>
                  <div className="relative mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[#edd8a8] bg-[#fff8e8] px-4 py-1.5 shadow-[0_10px_24px_rgba(210,173,91,0.12)]">
                    <span className="h-2 w-2 rounded-full bg-[#e0b145]" />
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#a87928]">
                      Hoàn thành ải
                    </span>
                  </div>

                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#be8d34]">
                    Chặng {stage.id} đã khép lại
                  </p>
                  <h3 className="mt-2 font-title text-[32px] font-black leading-[1.08] text-[#4f3718] lg:text-[36px]">
                    Bạn đã vượt qua {stage.landmark ?? stage.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[540px] text-[15px] leading-7 text-[#755d3f] lg:text-[16px]">
                    Bạn đã trả lời xong toàn bộ {totalQuestions} câu hỏi của chương này. Cánh cổng tiếp theo trên bản đồ đã sẵn sàng chờ bạn khám phá.
                  </p>

                  <div className="mt-6 rounded-[28px] border border-[#ead9b2] bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,248,231,0.92))] p-4 text-left shadow-[0_18px_40px_rgba(186,149,74,0.12)] lg:p-5">
                    {upcomingStage ? (
                      <div className="mb-4 flex items-center gap-3 rounded-[18px] border border-[#efdfb9] bg-[#fffaf0] px-3.5 py-3">
                        <div className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border-2 border-[#e8c778] bg-[#f8ebc6] shadow-[0_10px_24px_rgba(171,132,57,0.16)] sm:block">
                          <img
                            src={upcomingStage.backgroundImage}
                            alt={upcomingStage.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffe8a4,#f1c55a)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6c4918] shadow-[0_8px_18px_rgba(202,161,73,0.25)]">
                          Ải {upcomingStage.id}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a17b3f]">
                            Cánh cổng mới
                          </p>
                          <p className="font-semibold text-[#6c4c1f]">
                            {upcomingStage.landmark ?? upcomingStage.title}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#a87928]">
                      Điểm đến tiếp theo
                    </p>
                    <h4 className="mt-2 font-title text-[22px] font-black leading-tight text-[#4f3718] lg:text-[25px]">
                      {upcomingStage ? upcomingStage.title : "Bạn đã hoàn thành toàn bộ hành trình"}
                    </h4>
                    <p className="mt-2 text-[14px] leading-6 text-[#755d3f]">
                      {upcomingStage
                        ? `Rời ải hiện tại để trở về bản đồ và mở lối sang ${upcomingStage.landmark ?? upcomingStage.title}.`
                        : "Đây là ải cuối cùng. Bạn đã đi hết toàn bộ hành trình của mê cung tri thức."}
                    </p>
                  </div>

                  <Button
                    onClick={handleCompletionClose}
                    className="mt-7 h-12 rounded-full bg-[linear-gradient(180deg,#ffe59b,#f2c85c)] px-8 font-title text-[15px] font-black tracking-[0.04em] text-[#553916] shadow-[0_18px_34px_rgba(224,174,56,0.24)] transition hover:brightness-105"
                  >
                    {upcomingStage ? "Về bản đồ" : "Hội tụ 6 bảo vật"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {showDefeatModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(6,8,7,0.78)] p-4 backdrop-blur-sm">
          <Card className="w-full max-w-[620px] overflow-hidden rounded-[34px] border-[rgba(133,115,81,0.7)] bg-[linear-gradient(180deg,rgba(34,31,26,0.96),rgba(22,20,17,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.46)]">
            <CardContent className="relative p-6 text-center lg:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(118,104,76,0.28),transparent_72%)]" />
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[rgba(167,141,88,0.34)] bg-[rgba(62,53,40,0.52)] px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#c79a52]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#ead9b6]">
                  Bóng tối tràn đến
                </span>
              </div>

              <h3 className="font-title text-[32px] font-black leading-[1.08] text-[#fff3d9] lg:text-[36px]">
                Bạn đã cạn mạng sống
              </h3>
              <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-[#d9c7a5]">
                Những câu trả lời sai đã khiến mê cung chìm vào bóng tối. Hãy bắt đầu lại ải này để thắp sáng con đường bằng tri thức.
              </p>

              <div className="mt-6 rounded-[28px] border border-[rgba(168,143,97,0.26)] bg-[linear-gradient(180deg,rgba(56,47,37,0.76),rgba(35,30,25,0.92))] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#cba261]">
                  Tình trạng hiện tại
                </p>
                <p className="mt-2 font-title text-[24px] font-black leading-tight text-[#fff1d1]">
                  Ải {stage.id} bị bóng tối bao phủ
                </p>
                <p className="mt-2 text-[14px] leading-6 text-[#d5c3a0]">
                  Bạn cần khởi động lại từ đầu ải để lấy lại 5 mạng sống và mở lại các câu hỏi trong chương này.
                </p>
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  onClick={resetStageProgress}
                  className="h-12 min-w-[190px] rounded-full bg-[linear-gradient(180deg,#f0c969,#c88e2f)] px-8 font-title text-[15px] font-black tracking-[0.04em] text-[#3e2910] shadow-[0_18px_34px_rgba(167,112,33,0.28)] transition hover:brightness-105"
                >
                  Thử lại ải
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDefeatClose}
                  className="h-12 min-w-[190px] rounded-full border-[rgba(214,190,145,0.24)] bg-[rgba(255,247,230,0.08)] px-8 font-semibold text-[#f0dfbc] hover:bg-[rgba(255,247,230,0.12)]"
                >
                  Về bản đồ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
