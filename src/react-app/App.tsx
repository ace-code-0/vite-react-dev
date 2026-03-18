import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const targetDate = new Date('2026-03-31T24:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<number>(
    targetDate - new Date('1970-01-01').getTime(),
  );

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      const now = Date.now();
      setTimeLeft(targetDate - now);
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetDate]);

  const safeTime = Math.max(0, timeLeft);
  const isFree = safeTime <= 0;

  const d = Math.floor(safeTime / (1000 * 60 * 60 * 24));
  const h = Math.floor((safeTime / (1000 * 60 * 60)) % 24);
  const m = Math.floor((safeTime / (1000 * 60)) % 60);
  const s = Math.floor((safeTime / 1000) % 60);
  const ms = safeTime % 1000;

  return (
    <div className="countdown-container">
      <div className="quote-box">
        <p className="a-say">“月底前的辞职计划！”</p>
        <p className="me-say">——倒计时</p>
      </div>

      <div className="timer-grid">
        <div className="unit">
          <span>{d}</span>天
        </div>
        <div className="unit">
          <span>{h}</span>时
        </div>
        <div className="unit">
          <span>{m}</span>分
        </div>
        <div className="unit">
          <span>{s}</span>秒
        </div>
        <div>
          <span>{ms}</span>毫秒
        </div>
      </div>

      <div className="status-bar">
        {isFree ? '恭喜，你自由了！' : `距离 3月31日 还有 ${d} 天`}
      </div>
    </div>
  );
}

export default App;
