"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo com linhas horizontais finas que se curvam em direção ao cursor,
 * como um campo magnético, e voltam suavemente quando ele se afasta.
 *
 * - Canvas fixo atrás do conteúdo (os cards têm fundo opaco e ficam por cima).
 * - Só redesenha enquanto há movimento; parado, não gasta processamento.
 * - "Reduzir movimento" ou toque (sem mouse): linhas paradas, sem seguir o cursor.
 */
const GAP = 34; // distância entre as linhas (px)
const STEP = 10; // resolução de cada linha (px)
const RADIUS = 220; // alcance da curva em volta do cursor (px)
const PULL = 0.55; // quanto a linha se aproxima do cursor (0 a 1)

export function LinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const interactive = !reduce && finePointer;

    let width = 0;
    let height = 0;
    // posição real do mouse (alvo) e posição suavizada (desenhada)
    const target = { x: -9999, y: -9999, active: false };
    const eased = { x: -9999, y: -9999, strength: 0 };
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my, strength } = eased;
      const r2 = RADIUS * RADIUS;

      for (let y0 = GAP / 2; y0 < height + GAP; y0 += GAP) {
        // a linha só é afetada se estiver perto do cursor na vertical
        const near = strength > 0.001 && Math.abs(y0 - my) < RADIUS;
        let bendMax = 0;

        ctx.beginPath();
        for (let x = 0; x <= width + STEP; x += STEP) {
          let y = y0;
          if (near) {
            const dx = x - mx;
            const dy = y0 - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              const f = 1 - Math.sqrt(d2) / RADIUS; // 1 no cursor, 0 na borda
              const ease = f * f * (3 - 2 * f); // smoothstep
              const pull = (my - y0) * PULL * ease * strength;
              y += pull;
              bendMax = Math.max(bendMax, ease * strength);
            }
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // linhas perto do cursor ganham um leve tom ciano
        const alpha = 0.07 + bendMax * 0.16;
        ctx.strokeStyle =
          bendMax > 0.01 ? `rgba(14, 116, 144, ${alpha})` : "rgba(15, 23, 42, 0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const tick = () => {
      // suaviza a posição e a força do efeito
      eased.x += (target.x - eased.x) * 0.15;
      eased.y += (target.y - eased.y) * 0.15;
      const goal = target.active ? 1 : 0;
      eased.strength += (goal - eased.strength) * 0.08;
      draw();

      const moving =
        Math.abs(target.x - eased.x) > 0.3 ||
        Math.abs(target.y - eased.y) > 0.3 ||
        Math.abs(goal - eased.strength) > 0.005;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!target.active && eased.strength < 0.01) {
        // entrou agora: começa a curva já no lugar do cursor
        eased.x = e.clientX;
        eased.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      target.active = true;
      kick();
    };

    const onLeave = () => {
      target.active = false;
      kick();
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
