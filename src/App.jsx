import { useMemo, useState } from 'react'
import { AXIS_BG, DIM_COLORS, DIM_LABELS, questions, RESULTS } from './data/quizData'

function calcMBTI(answers) {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  answers.forEach((value) => {
    score[value] += 1
  })

  const type =
    (score.E >= score.I ? 'E' : 'I') +
    (score.S >= score.N ? 'S' : 'N') +
    (score.T >= score.F ? 'T' : 'F') +
    (score.J >= score.P ? 'J' : 'P')

  return { type, score }
}

function DimensionBar({ left, right, leftValue, rightValue, color }) {
  const total = leftValue + rightValue || 1
  const leftPercent = Math.round((leftValue / total) * 100)

  return (
    <div className="dimension-block">
      <div className="dimension-row">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div className="dimension-track">
        <div className="dimension-fill" style={{ width: `${leftPercent}%`, background: color }} />
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)

  const currentQuestion = questions[currentIndex]
  const resultData = useMemo(() => {
    if (screen !== 'result') return null
    const outcome = calcMBTI(answers)
    return {
      mbti: outcome,
      result: RESULTS[outcome.type],
    }
  }, [answers, screen])

  const progress = Math.round((currentIndex / questions.length) * 100)

  function handleNext() {
    if (!selected) return

    const nextAnswers = [...answers, selected]

    if (currentIndex === questions.length - 1) {
      setAnswers(nextAnswers)
      setScreen('result')
      return
    }

    setAnswers(nextAnswers)
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
  }

  function handleRestart() {
    setScreen('intro')
    setCurrentIndex(0)
    setAnswers([])
    setSelected(null)
    setCopied(false)
  }

  async function copyResult() {
    if (!resultData) return

    const { mbti, result } = resultData
    const text = `我的測驗結果是 ${mbti.type}｜${result.name} ${result.emoji}\n${result.tagline}\n${result.desc}`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <section className="quiz-card">
        {screen === 'intro' && (
          <div className="panel intro-panel fade-up">
            <div className="hero-orb">🌍</div>
            <p className="eyebrow">MBTI PERSONA QUIZ</p>
            <h1 className="hero-title">
              你是哪一種
              <br />
              <em>自然景觀？</em>
            </h1>
            <p className="hero-desc">
              12 題快速測出你的靈魂地形。
              <br />
              介於認真分析與可愛上頭之間，剛剛好。
            </p>

            <div className="pill-grid">
              {[
                ['E / I 能量來源', '#EBF2FB', '#4A7FB5'],
                ['S / N 資訊接收', '#EBF5EC', '#4A8B52'],
                ['T / F 決策方式', '#FDF3E9', '#C4956A'],
                ['J / P 生活節奏', '#F3EBF8', '#9B72C0'],
              ].map(([label, bg, color]) => (
                <span key={label} className="mini-pill" style={{ background: bg, color }}>
                  {label}
                </span>
              ))}
            </div>

            <button className="primary-button" onClick={() => setScreen('quiz')}>
              開始測驗
              <span>→</span>
            </button>
          </div>
        )}

        {screen === 'quiz' && (
          <div key={currentQuestion.id} className="panel quiz-panel fade-up">
            <div className="progress-wrap">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%`, background: DIM_COLORS[currentQuestion.axis] }}
                />
              </div>
              <div className="question-meta">
                <span
                  className="axis-badge"
                  style={{ background: AXIS_BG[currentQuestion.axis], color: DIM_COLORS[currentQuestion.axis] }}
                >
                  {DIM_LABELS[currentQuestion.axis]}
                </span>
                <span className="count-text">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>
            </div>

            <div className="question-head">
              <div className="question-emoji">{currentQuestion.emoji}</div>
              <h2 className="question-title">{currentQuestion.text}</h2>
            </div>

            <div className="option-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.label}
                  className={`option-card ${selected === option.dim ? 'is-selected' : ''}`}
                  onClick={() => setSelected(option.dim)}
                >
                  <span className="option-index">{index === 0 ? 'A' : 'B'}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            <button className={`next-button ${selected ? 'is-active' : ''}`} onClick={handleNext}>
              {currentIndex === questions.length - 1 ? '查看結果' : '下一題'}
            </button>
          </div>
        )}

        {screen === 'result' && resultData && (
          <div className="panel result-panel fade-up">
            <div className="result-hero" style={{ background: resultData.result.bg }}>
              <div className="result-icon" style={{ background: `${resultData.result.color}20` }}>
                {resultData.result.emoji}
              </div>
              <p className="result-type">{resultData.mbti.type}</p>
              <p className="result-label">你的靈魂景觀是</p>
              <h2 className="result-name">{resultData.result.name}</h2>
              <p className="result-tagline">{resultData.result.tagline}</p>
            </div>

            <div className="result-body">
              <p className="result-description">{resultData.result.desc}</p>

              <div className="trait-list">
                {resultData.result.traits.map((trait) => (
                  <span
                    key={trait}
                    className="trait-pill"
                    style={{ background: `${resultData.result.color}18`, color: resultData.result.color }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <section className="analysis-box">
                <p className="analysis-title">四個維度分析</p>
                <DimensionBar
                  left="外向 E"
                  right="內向 I"
                  leftValue={resultData.mbti.score.E}
                  rightValue={resultData.mbti.score.I}
                  color="#6A90C4"
                />
                <DimensionBar
                  left="實感 S"
                  right="直覺 N"
                  leftValue={resultData.mbti.score.S}
                  rightValue={resultData.mbti.score.N}
                  color="#5EA87A"
                />
                <DimensionBar
                  left="思考 T"
                  right="情感 F"
                  leftValue={resultData.mbti.score.T}
                  rightValue={resultData.mbti.score.F}
                  color="#C4956A"
                />
                <DimensionBar
                  left="判斷 J"
                  right="感知 P"
                  leftValue={resultData.mbti.score.J}
                  rightValue={resultData.mbti.score.P}
                  color="#9B72C0"
                />
              </section>

              <div className="action-row">
                <button className="ghost-button" onClick={handleRestart}>
                  重新測驗
                </button>
                <button className="primary-button compact" onClick={copyResult}>
                  {copied ? '已複製結果' : '複製結果文字'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="site-footer">
        Made for GitHub Pages · 可直接部署的 React + Vite 專案
      </footer>
    </main>
  )
}
