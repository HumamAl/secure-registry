"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  z: number; // 0 = far, 1 = near
  vx: number;
  vy: number;
  baseRadius: number;
  brightness: number; // 0-1, increased by mouse proximity
  pulsePhase: number;
  pulseSpeed: number;
}

interface PulseSignal {
  fromNode: number;
  toNode: number;
  progress: number; // 0-1
  speed: number;
}

const NODE_COUNT = 90;
const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 100;
const MOUSE_BRIGHTEN = 0.7;

export function VerificationNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<PulseSignal[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    // Loose grid with randomization
    const cols = Math.ceil(Math.sqrt(NODE_COUNT * (w / h)));
    const rows = Math.ceil(NODE_COUNT / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    for (let i = 0; i < NODE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const z = 0.2 + Math.random() * 0.8;
      nodes.push({
        x: col * cellW + cellW * 0.1 + Math.random() * cellW * 0.8,
        y: row * cellH + cellH * 0.1 + Math.random() * cellH * 0.8,
        z,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        baseRadius: 1.5 + z * 2.0,
        brightness: 0,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.006,
      });
    }
    nodesRef.current = nodes;
    pulsesRef.current = [];
  }, []);

  const spawnPulse = useCallback(() => {
    const nodes = nodesRef.current;
    if (nodes.length < 2) return;
    const from = Math.floor(Math.random() * nodes.length);
    // Find a neighbor in range
    const nA = nodes[from];
    const candidates: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      if (i === from) continue;
      const nB = nodes[i];
      const dx = nA.x - nB.x;
      const dy = nA.y - nB.y;
      if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DISTANCE) {
        candidates.push(i);
      }
    }
    if (candidates.length === 0) return;
    const to = candidates[Math.floor(Math.random() * candidates.length)];
    pulsesRef.current.push({
      fromNode: from,
      toNode: to,
      progress: 0,
      speed: 0.006 + Math.random() * 0.008,
    });
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, w * dpr, h * dpr);

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    // Update node positions
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < -20) node.x = w + 20;
      if (node.x > w + 20) node.x = -20;
      if (node.y < -20) node.y = h + 20;
      if (node.y > h + 20) node.y = -20;

      // Mouse brightness
      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const target =
        dist < MOUSE_RADIUS
          ? MOUSE_BRIGHTEN * (1 - dist / MOUSE_RADIUS)
          : 0;
      node.brightness += (target - node.brightness) * 0.08;

      // Pulse phase
      node.pulsePhase += node.pulseSpeed;
    }

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      const nA = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nB = nodes[j];
        const dx = nA.x - nB.x;
        const dy = nA.y - nB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CONNECTION_DISTANCE) continue;

        const baseAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.25;
        const depthAlpha = (nA.z + nB.z) * 0.3;
        const alpha = baseAlpha * depthAlpha;

        ctx.beginPath();
        ctx.moveTo(nA.x * dpr, nA.y * dpr);
        ctx.lineTo(nB.x * dpr, nB.y * dpr);
        // oklch(0.75 0.08 195) ~ rgb(150, 205, 210) at low opacity
        ctx.strokeStyle = `rgba(150, 205, 210, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Draw pulse signals along connections
    const alivePulses: PulseSignal[] = [];
    for (const pulse of pulsesRef.current) {
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) continue;

      const from = nodes[pulse.fromNode];
      const to = nodes[pulse.toNode];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > CONNECTION_DISTANCE) continue;

      const px = (from.x + dx * pulse.progress) * dpr;
      const py = (from.y + dy * pulse.progress) * dpr;
      const z = from.z * (1 - pulse.progress) + to.z * pulse.progress;

      // Glowing dot traveling along the line
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 5 * dpr * z);
      grad.addColorStop(0, `rgba(82, 175, 186, ${0.9 * z})`);
      grad.addColorStop(0.4, `rgba(82, 175, 186, ${0.4 * z})`);
      grad.addColorStop(1, "rgba(82, 175, 186, 0)");
      ctx.beginPath();
      ctx.arc(px, py, 5 * dpr * z, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      alivePulses.push(pulse);
    }
    pulsesRef.current = alivePulses;

    // Draw nodes
    for (const node of nodes) {
      const pulse = 0.6 + 0.4 * Math.sin(node.pulsePhase);
      const brightness = node.brightness;
      const baseAlpha = 0.25 + node.z * 0.35;
      const alpha = Math.min(1, baseAlpha + brightness * 0.55);
      const radius = (node.baseRadius + brightness * 2) * dpr;

      // Outer glow for mouse-brightened nodes
      if (brightness > 0.1) {
        const glowGrad = ctx.createRadialGradient(
          node.x * dpr, node.y * dpr, 0,
          node.x * dpr, node.y * dpr, radius * 4
        );
        glowGrad.addColorStop(0, `rgba(82, 175, 186, ${brightness * 0.5})`);
        glowGrad.addColorStop(1, "rgba(82, 175, 186, 0)");
        ctx.beginPath();
        ctx.arc(node.x * dpr, node.y * dpr, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // Node core
      ctx.beginPath();
      ctx.arc(node.x * dpr, node.y * dpr, radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(82, 175, 186, ${alpha})`;
      ctx.fill();

      // Tiny bright center
      ctx.beginPath();
      ctx.arc(node.x * dpr, node.y * dpr, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 240, 242, ${alpha * 0.8})`;
      ctx.fill();
    }

    // Spawn new pulses occasionally
    if (Math.random() < 0.015) {
      spawnPulse();
    }

    frameRef.current = requestAnimationFrame(draw);
  }, [spawnPulse]);

  const setupCanvas = useCallback(
    (w: number, h: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      sizeRef.current = { w, h };
      initNodes(w, h);
    },
    [initNodes]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const { width: w, height: h } = container.getBoundingClientRect();
    setupCanvas(w, h);

    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          cancelAnimationFrame(frameRef.current);
          setupCanvas(width, height);
          frameRef.current = requestAnimationFrame(draw);
        }
      }
    });
    observerRef.current.observe(container);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observerRef.current?.disconnect();
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [setupCanvas, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
