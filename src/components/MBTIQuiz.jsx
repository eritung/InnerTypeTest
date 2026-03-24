import { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    axis: "EI",
    emoji: "🎉",
    text: "週末有整天自由，你最渴望的是？",
    options: [
      { label: "約朋友出去，人多才有活力", dim: "E" },
      { label: "一個人待著，靜靜充電最舒服", dim: "I" },
    ],
  },
  {
    id: 2,
    axis: "EI",
    emoji: "💬",
    text: "新認識一群人，你通常會？",
    options: [
      { label: "很快加入話題，主動搭話", dim: "E" },
      { label: "先觀察，慢慢再融入", dim: "I" },
    ],
  },
  {
    id: 3,
    axis: "EI",
    emoji: "🔋",
    text: "一天結束後，什麼讓你感覺充好電了？",
    options: [
      { label: "和人說說話、分享今天的事", dim: "E" },
      { label: "一個人安靜地做自己的事", dim: "I" },
    ],
  },
  {
    id: 4,
    axis: "SN",
    emoji: "🗺️",
    text: "計劃一趟旅行，你更在意的是？",
    options: [
      { label: "具體行程、住宿、交通都安排好", dim: "S" },
      { label: "感受那個城市的氛圍與可能性", dim: "N" },
    ],
  },
  {
    id: 5,
    axis: "SN",
    emoji: "💡",
    text: "解決問題時，你比較依賴？",
    options: [
      { label: "過去的經驗和已知的事實", dim: "S" },
      { label: "直覺和對未來的想像", dim: "N" },
    ],
  },
  {
    id: 6,
    axis: "SN",
    emoji: "📖",
    text: "讀一本書，你更享受？",
    options: [
      { label: "貼近現實、細節扎實的故事", dim: "S" },
      { label: "充滿隱喻、開啟無限遐想的世界", dim: "N" },
    ],
  },
  {
    id: 7,
    axis: "TF",
    emoji: "⚖️",
    text: "朋友向你傾訴困境，你第一反應是？",
    options: [
      { label: "幫他分析問題、提出可行方案", dim: "T" },
      { label: "先讓他感覺被理解、被支持", dim: "F" },
    ],
  },
  {
    id: 8,
    axis: "TF",
    emoji: "🏆",
    text: "做選擇時，你更重視？",
    options: [
      { label: "邏輯正確、客觀合理", dim: "T" },
      { label: "對周圍的人是否公平、有溫度", dim: "F" },
    ],
  },
  {
    id: 9,
    axis: "TF",
    emoji: "🎨",
    text: "評價一件作品，你更看重？",
    options: [
      { label: "結構清晰、技巧精湛", dim: "T" },
      { label: "是否觸動內心、傳遞情感", dim: "F" },
    ],
  },
  {
    id: 10,
    axis: "JP",
    emoji: "📅",
    text: "面對重要截止日，你會？",
    options: [
      { label: "提前規劃，按步驟完成", dim: "J" },
      { label: "最後衝刺，靈感反而更好", dim: "P" },
    ],
  },
  {
    id: 11,
    axis: "JP",
    emoji: "🏠",
    text: "你理想的生活狀態比較像？",
    options: [
      { label: "每天有固定節奏，安心有序", dim: "J" },
      { label: "保持彈性，隨時可以轉向", dim: "P" },
    ],
  },
  {
    id: 12,
    axis: "JP",
    emoji: "✈️",
    text: "出門旅行前，你的包包是？",
    options: [
      { label: "打包清單、每樣東西都有位置", dim: "J" },
      { label: "大概塞一塞，反正缺了再買", dim: "P" },
    ],
  },
];

const RESULTS = {
  INTJ: {
    name: "深山雲霧",
    emoji: "🏔️",
    tagline: "靜默之中，藏著最深邃的智慧",
    color: "#4A6FA5",
    bg: "#EEF3FA",
    traits: ["策略型思考", "獨立自主", "目標導向"],
    desc: "你像深山中縈繞不散的雲霧——神秘、獨立，有著令人難以捉摸的深度。你對未來有清晰的藍圖，行動果決，不需要掌聲也能走得很遠。",
  },
  INTP: {
    name: "星空沙漠",
    emoji: "🌌",
    tagline: "在無邊的寂靜裡，思維無限延伸",
    color: "#2D3561",
    bg: "#ECEEF8",
    traits: ["邏輯分析", "求知慾強", "創意連結"],
    desc: "你像星空下的沙漠——廣闊、深邃，充滿令人著迷的謎題。你的思維跨越時間與空間，總在最意想不到的地方發現連結與規律。",
  },
  ENTJ: {
    name: "城市天際線",
    emoji: "🌃",
    tagline: "高度決定視野，視野決定格局",
    color: "#1A1A2E",
    bg: "#EBEBF5",
    traits: ["領導魅力", "決策果斷", "效率至上"],
    desc: "你像璀璨的城市天際線——充滿能量、氣勢磅礴。你天生擅長統籌全局，引領方向，讓混亂變得有序。",
  },
  ENTP: {
    name: "活火山",
    emoji: "🌋",
    tagline: "每一次噴發，都是新想法的誕生",
    color: "#8B2500",
    bg: "#FAEEE8",
    traits: ["思維靈活", "熱愛辯論", "勇於顛覆"],
    desc: "你像一座活火山——充滿能量、難以預測，創意隨時沸騰。你熱愛辯論，總能找到現有框架的漏洞，然後提出更好的可能。",
  },
  INFJ: {
    name: "極光夜空",
    emoji: "🌠",
    tagline: "稀有而珍貴，只有仰望的人才能看見",
    color: "#4B0082",
    bg: "#F0ECF8",
    traits: ["深度洞察", "理想主義", "同理共感"],
    desc: "你像極光——罕見、迷人，在最黑暗的地方綻放最美的光芒。你對人有著深刻的洞察，能感受到別人說不出口的情緒。",
  },
  INFP: {
    name: "秘境瀑布",
    emoji: "🍃",
    tagline: "隱於深處，卻蘊藏著最純粹的力量",
    color: "#2E6B8A",
    bg: "#EAF4F8",
    traits: ["豐富感性", "價值驅動", "創意表達"],
    desc: "你像秘境中的瀑布——需要有人願意探尋才能發現，但一旦遇見，便令人屏息。你有豐富的內心世界與堅定的價值觀。",
  },
  ENFJ: {
    name: "向日葵田",
    emoji: "🌻",
    tagline: "面向陽光，也讓身邊的人感受到溫暖",
    color: "#8B6914",
    bg: "#FDF8E8",
    traits: ["感召領導", "關懷他人", "善於溝通"],
    desc: "你像一整片向日葵田——明亮、溫暖，充滿感染力。你天生懂得激勵他人，總能看見每個人最好的樣子。",
  },
  ENFP: {
    name: "彩虹雨後",
    emoji: "🌈",
    tagline: "每場雨後，你都能找到最美的那道光",
    color: "#C4500A",
    bg: "#FDF3EC",
    traits: ["熱情感染", "可能性思維", "真誠連結"],
    desc: "你像雨後的彩虹——充滿色彩與驚喜，讓人不由自主想靠近。你能在最平凡的日常中發現魔法，是人群中的點亮者。",
  },
  ISTJ: {
    name: "橡木老林",
    emoji: "🌲",
    tagline: "百年生長，每一圈年輪都是可靠的承諾",
    color: "#2D5016",
    bg: "#EFF5E8",
    traits: ["責任感強", "踏實可靠", "注重細節"],
    desc: "你像一片古老的橡木森林——深根、穩固，歷久彌新。你對責任認真，對承諾從不食言，是身邊最可以依靠的那棵樹。",
  },
  ISFJ: {
    name: "靜謐湖泊",
    emoji: "🏞️",
    tagline: "平靜的水面下，藏著最細膩的溫柔",
    color: "#1A5276",
    bg: "#EAF2F8",
    traits: ["體貼細心", "默默付出", "守護者"],
    desc: "你像一座靜謐的湖泊——溫柔、清澈，讓靠近的人自然平靜。你默默照顧著身邊的每一個人，用行動而非言語表達愛。",
  },
  ESTJ: {
    name: "繁忙港口",
    emoji: "⚓",
    tagline: "秩序與效率，是你最有力的語言",
    color: "#34495E",
    bg: "#EBF0F4",
    traits: ["組織管理", "務實高效", "紀律嚴謹"],
    desc: "你像一座高效運轉的港口——有條不紊，每艘船都知道自己的位置。你擅長組織與執行，能把複雜的事化繁為簡。",
  },
  ESFJ: {
    name: "花園小鎮",
    emoji: "🌺",
    tagline: "每個角落都用心佈置，只為讓人賓至如歸",
    color: "#7D3C98",
    bg: "#F5EBF8",
    traits: ["熱情款待", "善解人意", "社群凝聚"],
    desc: "你像一座精心打理的花園小鎮——溫馨、熱情，走進來就不想離開。你重視人與人之間的連結，用心維繫每一段關係。",
  },
  ISTP: {
    name: "荒野峽谷",
    emoji: "🏜️",
    tagline: "沉默不代表空洞，每道裂縫都是歲月的智慧",
    color: "#784212",
    bg: "#F5EDE0",
    traits: ["冷靜務實", "動手解決", "獨立行動"],
    desc: "你像荒野中的峽谷——沉默、獨立，內部構造精密得令人驚嘆。你用雙手理解世界，危機時刻比任何人都冷靜。",
  },
  ISFP: {
    name: "海岸日落",
    emoji: "🌅",
    tagline: "每一天都是一幅獨一無二的畫",
    color: "#C0392B",
    bg: "#FAECEA",
    traits: ["活在當下", "藝術敏感", "真實自在"],
    desc: "你像海岸的日落——柔軟、美麗，充滿令人動容的色彩。你活在當下，用感官感受世界，對美有獨特的品味。",
  },
  ESTP: {
    name: "急湍激流",
    emoji: "🌊",
    tagline: "快、準、狠，活在最鮮活的當下",
    color: "#0E6655",
    bg: "#E8F8F5",
    traits: ["行動優先", "適應力強", "魅力爆棚"],
    desc: "你像一條急流——充滿爆發力，在障礙中找到縫隙，越衝越快。你是行動派，最好的分析是直接去做。",
  },
  ESFP: {
    name: "熱帶海灘",
    emoji: "🏖️",
    tagline: "陽光、海浪、當下——這就是全部",
    color: "#0A74A4",
    bg: "#E8F5FC",
    traits: ["充滿活力", "享受當下", "魅力四射"],
    desc: "你像熱帶海灘——熱情、耀眼，讓人一到就放鬆所有防備。你的笑聲就是最好的音樂，讓每個普通日子都變成派對。",
  },
};

const DIM_COLORS = { EI: "#6A90C4", SN: "#5EA87A", TF: "#C4956A", JP: "#9B72C0" };
const DIM_LABELS = { EI: "能量來源", SN: "資訊接收", TF: "決策方式", JP: "生活方式" };
const AXIS_BG = { EI: "#EBF2FB", SN: "#EBF5EC", TF: "#FDF3E9", JP: "#F3EBF8" };
const STORAGE_KEY = "mbti-quiz-answers";

function createEmptyAnswers() {
  return Array.from({ length: QUESTIONS.length }, () => null);
}

function calcMBTI(answers) {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((dim) => {
    if (dim) score[dim] += 1;
  });

  return {
    type:
      (score.E >= score.I ? "E" : "I") +
      (score.S >= score.N ? "S" : "N") +
      (score.T >= score.F ? "T" : "F") +
      (score.J >= score.P ? "J" : "P"),
    score,
  };
}

function getProgress(currentQuestionIndex) {
  return Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100);
}

function DimBar({ left, right, leftValue, rightValue, color }) {
  const total = leftValue + rightValue || 1;
  const leftPercent = Math.round((leftValue / total) * 100);

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#7A6E66",
            fontWeight: 500,
          }}
        >
          {left}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#7A6E66",
            fontWeight: 500,
          }}
        >
          {right}
        </span>
      </div>
      <div
        aria-hidden="true"
        style={{ height: 6, background: "#F0EBE5", borderRadius: 99, overflow: "hidden" }}
      >
        <div
          style={{
            height: "100%",
            width: `${leftPercent}%`,
            background: color,
            borderRadius: 99,
            transition: "width .6s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function MBTIQuiz() {
  const [screen, setScreen] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(createEmptyAnswers);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === QUESTIONS.length) {
        setAnswers(parsed);

        const firstUnansweredIndex = parsed.findIndex((value) => !value);
        if (firstUnansweredIndex === -1) {
          setCurrentIndex(QUESTIONS.length - 1);
          setScreen("result");
        } else {
          setCurrentIndex(firstUnansweredIndex);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const canGoNext = Boolean(selectedAnswer);

  const mbti = useMemo(() => {
    const isFinished = answers.every(Boolean);
    return isFinished ? calcMBTI(answers) : null;
  }, [answers]);

  const result = mbti ? RESULTS[mbti.type] : null;

  function handleSelect(dim) {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = dim;
      return next;
    });
  }

  function handleStart() {
    setScreen("quiz");
    setCopied(false);
  }

  function handleNext() {
    if (!canGoNext) return;

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    setScreen("result");
  }

  function handlePrevious() {
    if (currentIndex === 0) return;
    setCurrentIndex((value) => value - 1);
  }

  function handleRestart() {
    setScreen("intro");
    setCurrentIndex(0);
    setAnswers(createEmptyAnswers());
    setCopied(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function handleCopyResult() {
    if (!mbti || !result || typeof navigator === "undefined") return;

    const text = `我是 ${mbti.type}「${result.name}」！\n${result.tagline}\n${result.desc}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {
        setCopied(false);
      });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F5F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        padding: "24px 16px",
      }}
    >
      <style>{`
                .card { width: 100%; max-width: 540px; background: #fff; border-radius: 28px; box-shadow: 0 8px 60px rgba(0, 0, 0, .08); overflow: hidden; }
        .fade { animation: up .4s ease forwards; }
        @keyframes up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .kicker { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3.5px; text-transform: uppercase; color: #B8A99A; margin-bottom: 16px; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .pill { font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 500; padding: 5px 14px; border-radius: 100px; }
        .btn-go { background: #1A1410; color: #fff; border: none; border-radius: 100px; padding: 16px 52px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all .2s; }
        .btn-go:hover { background: #4A7FB5; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74, 127, 181, .3); }
        .opt { text-align: left; padding: 17px 22px; border-radius: 16px; border: 1.5px solid #EDE8E3; background: #FAFAF8; cursor: pointer; transition: all .15s; font-family: 'DM Sans', sans-serif; font-size: 14.5px; line-height: 1.5; color: #3D332C; display: flex; gap: 14px; align-items: flex-start; width: 100%; }
        .opt:hover { border-color: #6A90C4; background: #F0F5FB; transform: translateX(4px); }
        .opt.sel { border-color: #4A7FB5; background: #EBF2FB; color: #1A3A5C; font-weight: 500; }
        .btn-next, .btn-prev, .btn-again, .btn-copy { width: 100%; padding: 15px; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; transition: all .2s; }
        .btn-next { border: none; }
        .btn-next.on { background: #1A1410; color: #fff; cursor: pointer; }
        .btn-next.on:hover { background: #4A7FB5; }
        .btn-next.off { background: #EDE8E3; color: #B8A99A; cursor: not-allowed; }
        .btn-prev { border: 1.5px solid #D9D1C8; background: transparent; color: #7A6E66; cursor: pointer; }
        .btn-prev:hover { border-color: #1A1410; color: #1A1410; }
        .btn-again { border: 1.5px solid #1A1410; background: transparent; color: #1A1410; cursor: pointer; }
        .btn-again:hover { background: #1A1410; color: #fff; }
        .btn-copy { border: none; background: #F0F5FB; color: #1A3A5C; cursor: pointer; }
        .btn-copy:hover { background: #E3EDF9; }
      `}</style>

      <div className="card fade" key={`${screen}-${currentIndex}`}>
        {screen === "intro" && (
          <div style={{ padding: "56px 48px 52px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>
              🌍
            </div>
            <div className="kicker">MBTI 人格測驗</div>
            <h1
              className="serif"
              style={{ fontSize: 40, lineHeight: 1.12, color: "#1A1410", marginBottom: 14 }}
            >
              你是哪一種
              <br />
              <em style={{ fontStyle: "italic", color: "#6A90C4" }}>自然景觀？</em>
            </h1>
            <p className="sans" style={{ fontSize: 15, lineHeight: 1.75, color: "#7A6E66", marginBottom: 10 }}>
              12 道題目，從 4 個維度分析你的人格，
              <br />
              對應 16 種獨一無二的自然景觀。
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "20px 0 34px",
              }}
            >
              {[
                ["E/I 能量來源", "#EBF2FB", "#4A7FB5"],
                ["S/N 資訊接收", "#EBF5EC", "#4A8B52"],
                ["T/F 決策方式", "#FDF3E9", "#C4956A"],
                ["J/P 生活方式", "#F3EBF8", "#9B72C0"],
              ].map(([label, bg, color]) => (
                <span key={label} className="pill" style={{ background: bg, color }}>
                  {label}
                </span>
              ))}
            </div>
            <button type="button" className="btn-go" onClick={handleStart}>
              開始測驗 →
            </button>
          </div>
        )}

        {screen === "quiz" && (
          <div className="fade">
            <div style={{ padding: "32px 40px 0" }}>
              <div
                aria-label={`目前進度 ${getProgress(currentIndex)}%`}
                role="progressbar"
                aria-valuenow={getProgress(currentIndex)}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  height: 3,
                  background: "#F0EBE5",
                  borderRadius: 99,
                  overflow: "hidden",
                  marginBottom: 26,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${getProgress(currentIndex)}%`,
                    background: DIM_COLORS[currentQuestion.axis],
                    borderRadius: 99,
                    transition: "width .4s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  className="sans"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    padding: "4px 12px",
                    borderRadius: 6,
                    background: AXIS_BG[currentQuestion.axis],
                    color: DIM_COLORS[currentQuestion.axis],
                  }}
                >
                  {DIM_LABELS[currentQuestion.axis]}
                </span>
                <span className="sans" style={{ fontSize: 12, color: "#B8A99A" }}>
                  {currentIndex + 1} / {QUESTIONS.length}
                </span>
              </div>

              <div style={{ fontSize: 28, marginBottom: 6 }}>{currentQuestion.emoji}</div>
              <h2
                className="serif"
                style={{ fontSize: 24, lineHeight: 1.4, color: "#1A1410", paddingBottom: 26 }}
              >
                {currentQuestion.text}
              </h2>
            </div>

            <div style={{ padding: "0 40px", display: "flex", flexDirection: "column", gap: 11 }}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option.dim;

                return (
                  <button
                    key={option.dim}
                    type="button"
                    className={`opt${isSelected ? " sel" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => handleSelect(option.dim)}
                  >
                    <span
                      className="sans"
                      style={{ fontSize: 12, color: "#B8A99A", paddingTop: 2, minWidth: 16 }}
                    >
                      {index === 0 ? "A" : "B"}
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ padding: "24px 40px 40px", display: "grid", gap: 10 }}>
              <button
                type="button"
                className={`btn-next${canGoNext ? " on" : " off"}`}
                onClick={handleNext}
                disabled={!canGoNext}
              >
                {currentIndex < QUESTIONS.length - 1 ? "下一題" : "查看結果"}
              </button>

              <button
                type="button"
                className="btn-prev"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.45 : 1 }}
              >
                上一題
              </button>
            </div>
          </div>
        )}

        {screen === "result" && result && mbti && (
          <div className="fade">
            <div style={{ padding: "50px 48px 36px", textAlign: "center", background: result.bg }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  margin: "0 auto 22px",
                  background: `${result.color}20`,
                }}
              >
                {result.emoji}
              </div>
              <div
                className="sans"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#B8A99A", marginBottom: 8 }}
              >
                {mbti.type}
              </div>
              <div className="serif" style={{ fontSize: 17, color: "#7A6E66", marginBottom: 4 }}>
                你的靈魂景觀是
              </div>
              <div
                className="serif"
                style={{ fontSize: 40, color: "#1A1410", lineHeight: 1.1, marginBottom: 8 }}
              >
                {result.name}
              </div>
              <div className="sans" style={{ fontSize: 14, color: "#9A8E85", fontStyle: "italic" }}>
                {result.tagline}
              </div>
            </div>

            <div style={{ height: 1, background: "#F0EBE5", margin: "0 48px" }} />

            <div style={{ padding: "32px 48px 40px" }}>
              <p className="sans" style={{ fontSize: 15, lineHeight: 1.85, color: "#4A3F38", marginBottom: 26 }}>
                {result.desc}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
                {result.traits.map((trait) => (
                  <span
                    key={trait}
                    className="sans"
                    style={{
                      padding: "6px 16px",
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 500,
                      background: `${result.color}18`,
                      color: result.color,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div style={{ background: "#FAFAF8", borderRadius: 16, padding: "20px 24px", marginBottom: 18 }}>
                <div
                  className="sans"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#B8A99A",
                    marginBottom: 16,
                  }}
                >
                  四個維度分析
                </div>
                {[
                  ["EI", "外向 E", "內向 I", mbti.score.E, mbti.score.I, "#6A90C4"],
                  ["SN", "實感 S", "直覺 N", mbti.score.S, mbti.score.N, "#5EA87A"],
                  ["TF", "思考 T", "情感 F", mbti.score.T, mbti.score.F, "#C4956A"],
                  ["JP", "判斷 J", "感知 P", mbti.score.J, mbti.score.P, "#9B72C0"],
                ].map(([key, left, right, leftValue, rightValue, color]) => (
                  <DimBar
                    key={key}
                    left={left}
                    right={right}
                    leftValue={leftValue}
                    rightValue={rightValue}
                    color={color}
                  />
                ))}
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <button type="button" className="btn-copy" onClick={handleCopyResult}>
                  {copied ? "已複製結果 ✨" : "複製測驗結果"}
                </button>
                <button type="button" className="btn-again" onClick={handleRestart}>
                  重新測驗
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
