
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onFinish?: () => void;
  duration?: number;
}

// 煙火章節類型定義
type Chapter = 'PROLOGUE' | 'BLOOM' | 'SYMPHONY' | 'GRAND_FINALE';

const Fireworks: React.FC<Props> = ({ onFinish, duration = 35000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chapterText, setChapterText] = useState('');
  const [subText, setSubText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let fireworks: Firework[] = [];
    let startTime = Date.now();
    let currentChapter: Chapter = 'PROLOGUE';
    let shakeAmount = 0;
    let skyFlash = 0; // 模擬爆炸時的瞬間閃光

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // 高級配色調色盤
    const palettes = {
      PROLOGUE: ['#f8fafc', '#94a3b8', '#cbd5e1'], // 簡潔銀白色
      BLOOM: ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a18cd1'], // 櫻花色系
      SYMPHONY: ['#4facfe', '#00f2fe', '#6a11cb', '#2575fc', '#ff0844'], // 霓虹色系
      GRAND_FINALE: ['#f6d365', '#fda085', '#ffffff', '#ffd700', '#ffecd2'] // 黃金與純白
    };

    const getRandomFromPalette = (chapter: Chapter) => {
      const p = palettes[chapter];
      return p[Math.floor(Math.random() * p.length)];
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;
      gravity: number;
      friction: number;
      size: number;
      trail: { x: number; y: number }[];
      flicker: boolean;
      shouldSplit: boolean;

      constructor(x: number, y: number, color: string, vx: number, vy: number, size = 2, decay?: number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 1;
        this.decay = decay || Math.random() * 0.01 + 0.005;
        this.gravity = 0.06;
        this.friction = 0.97;
        this.size = size;
        this.trail = [];
        this.flicker = Math.random() > 0.5;
        this.shouldSplit = false;
      }

      draw() {
        if (!ctx) return;
        const opacity = this.flicker ? this.alpha * (Math.random() * 0.5 + 0.5) : this.alpha;
        
        // 繪製粒子尾跡
        if (this.trail.length > 2) {
          ctx.beginPath();
          ctx.strokeStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${opacity * 0.3})`);
          ctx.lineWidth = this.size * 0.5;
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
          ctx.stroke();
        }

        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }
    }

    class Firework {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;
      type: 'SHELL' | 'WILLOW' | 'CROSSETTE' | 'RING' | 'PALM';

      constructor(type: Firework['type'] = 'SHELL') {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.tx = this.x + (Math.random() - 0.5) * 400;
        this.ty = Math.random() * (canvas.height * 0.5) + 80;
        this.color = getRandomFromPalette(currentChapter);
        this.exploded = false;
        this.type = type;

        const distY = this.y - this.ty;
        this.vy = -Math.sqrt(2 * 0.1 * distY);
        this.vx = (this.tx - this.x) / (Math.abs(this.vy) / 0.1);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;

        if (this.vy >= 0 && !this.exploded) {
          this.explode();
          this.exploded = true;
        }
      }

      draw() {
        if (!ctx || this.exploded) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // 發射煙塵感
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y + 4, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      explode() {
        skyFlash = 0.4; // 爆炸瞬間提亮背景
        let count = 100;
        let shake = 5;

        if (this.type === 'CROSSETTE') {
          count = 40;
          shake = 8;
        } else if (this.type === 'PALM') {
          count = 120;
          shake = 12;
        } else if (this.type === 'WILLOW') {
          count = 150;
        }

        shakeAmount = shake;

        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.2;
          const speed = this.type === 'PALM' ? Math.random() * 12 + 2 : Math.random() * 8 + 1;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;

          const p = new Particle(this.x, this.y, this.color, vx, vy, this.type === 'WILLOW' ? 1.5 : 2);
          
          if (this.type === 'WILLOW') {
            p.gravity = 0.02;
            p.friction = 0.98;
            p.decay = 0.005;
            p.flicker = true;
          } else if (this.type === 'CROSSETTE') {
            p.shouldSplit = true;
          } else if (this.type === 'PALM') {
            p.gravity = 0.04;
            p.decay = 0.008;
          }

          particles.push(p);
        }

        // 對於 Crossette 粒子，在 0.4 秒後進行二次分裂
        if (this.type === 'CROSSETTE') {
          setTimeout(() => {
            const livingParticles = particles.filter(p => p.shouldSplit && p.alpha > 0.5);
            livingParticles.forEach(lp => {
              for (let j = 0; j < 4; j++) {
                const angle = (Math.PI / 2) * j;
                const sp = new Particle(lp.x, lp.y, lp.color, Math.cos(angle) * 4, Math.sin(angle) * 4, 1.2, 0.02);
                particles.push(sp);
              }
              lp.alpha = 0; // 隱藏原粒子
            });
          }, 400);
        }
      }
    }

    const updateChapters = (elapsed: number) => {
      if (elapsed < 7000 && currentChapter !== 'PROLOGUE') {
        currentChapter = 'PROLOGUE';
        setChapterText('三年磨一劍');
        setSubText('此刻，你是最閃耀的星');
      } else if (elapsed >= 7000 && elapsed < 16000 && currentChapter !== 'BLOOM') {
        currentChapter = 'BLOOM';
        setChapterText('筆耕不輟，終成繁花');
        setSubText('所有的努力，在這一刻綻放');
      } else if (elapsed >= 16000 && elapsed < 26000 && currentChapter !== 'SYMPHONY') {
        currentChapter = 'SYMPHONY';
        setChapterText('夢想的交響樂');
        setSubText('金榜題名，勢不可擋');
      } else if (elapsed >= 26000 && currentChapter !== 'GRAND_FINALE') {
        currentChapter = 'GRAND_FINALE';
        setChapterText('116 統測圓滿結束');
        setSubText('奔向屬於你的璀璨未來');
      }
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;
      updateChapters(elapsed);

      // 背景繪製：天空閃爍處理
      const baseAlpha = 0.18;
      const alpha = skyFlash > 0 ? Math.min(0.5, baseAlpha + skyFlash) : baseAlpha;
      ctx.fillStyle = `rgba(10, 15, 32, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (skyFlash > 0) skyFlash *= 0.85;

      // 畫面震動
      if (shakeAmount > 0) {
        const sx = (Math.random() - 0.5) * shakeAmount;
        const sy = (Math.random() - 0.5) * shakeAmount;
        ctx.translate(sx, sy);
        shakeAmount *= 0.9;
        if (shakeAmount < 0.1) shakeAmount = 0;
      }

      // 章節發射策略
      let spawnRate = 0.02;
      let types: Firework['type'][] = ['SHELL'];

      if (currentChapter === 'PROLOGUE') {
        spawnRate = 0.03;
        types = ['SHELL', 'WILLOW'];
      } else if (currentChapter === 'BLOOM') {
        spawnRate = 0.06;
        types = ['SHELL', 'WILLOW', 'PALM'];
      } else if (currentChapter === 'SYMPHONY') {
        spawnRate = 0.15;
        types = ['RING', 'CROSSETTE', 'SHELL'];
      } else if (currentChapter === 'GRAND_FINALE') {
        spawnRate = 0.35;
        types = ['PALM', 'CROSSETTE', 'WILLOW', 'SHELL'];
      }

      if (Math.random() < spawnRate) {
        fireworks.push(new Firework(types[Math.floor(Math.random() * types.length)]));
      }

      fireworks.forEach((f, i) => {
        f.update();
        f.draw();
        if (f.exploded) fireworks.splice(i, 1);
      });

      particles.forEach((p, i) => {
        if (!p.update()) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    animate();

    const finishTimer = setTimeout(() => {
      cancelAnimationFrame(animationId);
      if (onFinish) onFinish();
    }, duration);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(finishTimer);
      window.removeEventListener('resize', resize);
    };
  }, [onFinish, duration]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0f20] pointer-events-none flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* 文字層：具有電影感的淡入淡出 */}
      <div className="relative z-10 text-center px-10 max-w-5xl">
        <div className="mb-8 opacity-0 animate-[cinematicFadeIn_1s_ease-out_forwards]">
           <span className="inline-block px-6 py-2 bg-white/5 backdrop-blur-2xl rounded-full text-[11px] font-black text-indigo-300 tracking-[0.8em] uppercase border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
             Ceremonial Performance · 116 Technical Exam
           </span>
        </div>
        
        <div key={chapterText} className="animate-[textFocus_1.5s_cubic-bezier(0.23,1,0.32,1)_forwards]">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-6 drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
            {chapterText}
          </h2>
          <p className="text-xl md:text-4xl font-bold text-indigo-200/80 italic tracking-wide">
            {subText}
          </p>
        </div>
      </div>

      {/* 隱藏的戲劇性遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <style>{`
        @keyframes cinematicFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); letter-spacing: 0.2em; }
          to { opacity: 1; transform: scale(1) translateY(0); letter-spacing: 0.8em; }
        }
        @keyframes textFocus {
          0% { filter: blur(12px); opacity: 0; transform: translateY(20px) scale(1.1); }
          100% { filter: blur(0); opacity: 1; transform: translateY(0) scale(1); }
        }
        h2 {
          text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 80px rgba(99,102,241,0.5);
          font-family: 'Noto Sans TC', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Fireworks;
