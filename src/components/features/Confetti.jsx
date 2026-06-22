import { useEffect, useRef } from "react";

const COLORS = [
  "#C9A84C", "#F2DFA0", "#1A160E",
  "#C0392B", "#27AE60", "#2980B9",
  "#8E44AD", "#E67E22",
];

const random = (min, max) => Math.random() * (max - min) + min;

const Confetti = ({ active = true, count = 120 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: count }, () => ({
      x:       random(0, canvas.width),
      y:       random(-canvas.height, 0),
      w:       random(8, 16),
      h:       random(6, 12),
      color:   COLORS[Math.floor(random(0, COLORS.length))],
      speed:   random(2, 5),
      angle:   random(0, Math.PI * 2),
      spin:    random(-0.2, 0.2),
      opacity: random(0.7, 1),
    }));

    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.y     += p.speed;
        p.angle += p.spin;
        p.x     += Math.sin(p.angle) * 1.5;

        if (p.y > canvas.height) {
          p.y = random(-100, 0);
          p.x = random(0, canvas.width);
        }
      });
      animId = requestAnimationFrame(draw);
    };

    draw();

    // Stop after 4 seconds
    const stop = setTimeout(() => cancelAnimationFrame(animId), 4000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(stop);
    };
  }, [active, count]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[998] pointer-events-none"
    />
  );
};

export default Confetti;