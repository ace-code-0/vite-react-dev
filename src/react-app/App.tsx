import { memo, useEffect, useMemo, useState } from 'react';
import './App.css';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadTrianglesPreset } from '@tsparticles/preset-triangles';
import type { ISourceOptions } from '@tsparticles/engine';

const ParticleBackground = memo(function ParticleBackground() {
  const [isReady, setIsReady] = useState(false);
  const [distance, setDistance] = useState(120);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadTrianglesPreset(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const updateDistance = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setDistance(60); // 手机
      } else if (width < 1024) {
        setDistance(90); // 平板
      } else {
        setDistance(140); // 电脑
      }
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);

    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  const particleOptions = useMemo<ISourceOptions>(
    () => ({
      preset: 'triangles',
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      background: {
        color: {
          value: '#000000',
        },
      },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        move: {
          speed: 0.6,
        },
        links: {
          color: '#00ffff',
          frequency: 1,
          opacity: 0.5,
          width: 1,
          distance, // 动态 distance
        },
      },
    }),
    [distance],
  );

  if (!isReady) return null;

  return <Particles id="tsparticles" options={particleOptions} />;
});

function Countdown() {
  const targetTimestamp = new Date('2026-04-01T00:00:00').getTime();
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 16);

    return () => window.clearInterval(timerId);
  }, []);

  const timeLeft = Math.max(0, targetTimestamp - nowTimestamp);
  const isFree = timeLeft <= 0;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const milliseconds = timeLeft % 1000;

  return (
    <div className="countdown-container">
      <div className="quote-box">
        <p className="a-say">“月底前的辞职计划！”</p>
        <p className="me-say">——倒计时</p>
      </div>

      <div className="timer-grid">
        <div className="unit">
          <span>{days}</span>天
        </div>
        <div className="unit">
          <span>{hours}</span>时
        </div>
        <div className="unit">
          <span>{minutes}</span>分
        </div>
        <div className="unit">
          <span>{seconds}</span>秒
        </div>
        <div className="unit">
          <span>{milliseconds}</span>毫秒
        </div>
      </div>

      <div className="status-bar">
        {isFree ? '恭喜，你自由了！' : `距离 3月31日 还有 ${days} 天`}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <ParticleBackground />
      <Countdown />
    </div>
  );
}

export default App;
