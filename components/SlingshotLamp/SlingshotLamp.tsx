"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { lampAudio } from "./soundEffects";

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): [number, number, number] => [
  Math.round(lerp(c1[0], c2[0], t)),
  Math.round(lerp(c1[1], c2[1], t)),
  Math.round(lerp(c1[2], c2[2], t)),
];
const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const G = 2600;
const PEBBLE_G = 1500;
const STEP = 1 / 120;
const BULB: [number, number] = [0, 74];
const BULB_R = 16;
const PEBBLE_R = 7;
const MAX_PULL = 140;
const LAUNCH = 12.5;
const LIGHT_SCALE = 0.25;

interface Pebble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  hitT: number;
  rest: number;
  life: number;
}

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  poly: [number, number][];
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

export default function SlingshotLamp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);

  const [isLightOn, setIsLightOn] = useState(true);
  const [isBroken, setIsBroken] = useState(false);
  const [shotsCount, setShotsCount] = useState(0);
  const [bulbsCount, setBulbsCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Physics and simulation state kept in refs for 60-120fps performance
  const stateRef = useRef({
    W: 0,
    H: 0,
    DPR: 1,
    lamp: { ax: 0, ay: -10, len: 260, theta: 0.06, omega: 0 },
    light: { on: true, I: 1, fil: 1, heat: 0, warm: 0, popT: 0, broken: false, flash: 0 },
    sling: {
      x: 0,
      y: 0,
      rest: { x: 0, y: 0 },
      pouch: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      loaded: true,
      reloadT: 0,
      creakAt: 0,
      creakCd: 0,
    },
    mouse: { x: -999, y: -999 },
    grab: null as { type: "pouch" | "lamp"; offset?: number } | null,
    pebbles: [] as Pebble[],
    shards: [] as Shard[],
    sparks: [] as Spark[],
    switchRect: null as { left: number; right: number; top: number; bottom: number } | null,
    glowCanvas: null as HTMLCanvasElement | null,
    darkCanvas: null as HTMLCanvasElement | null,
    animId: 0,
    lastTime: performance.now(),
    accT: 0,
  });

  const lampOrigin = useCallback(() => {
    const { lamp } = stateRef.current;
    return {
      x: lamp.ax + Math.sin(lamp.theta) * lamp.len,
      y: lamp.ay + Math.cos(lamp.theta) * lamp.len,
    };
  }, []);

  const toWorld = useCallback((lx: number, ly: number) => {
    const { lamp } = stateRef.current;
    const o = lampOrigin();
    const c = Math.cos(lamp.theta);
    const s = Math.sin(lamp.theta);
    return { x: o.x + lx * c + ly * s, y: o.y - lx * s + ly * c };
  }, [lampOrigin]);

  const toLocal = useCallback((x: number, y: number) => {
    const { lamp } = stateRef.current;
    const o = lampOrigin();
    const c = Math.cos(lamp.theta);
    const s = Math.sin(lamp.theta);
    const dx = x - o.x;
    const dy = y - o.y;
    return { x: dx * c - dy * s, y: dx * s + dy * c };
  }, [lampOrigin]);

  const dirToWorld = useCallback((nx: number, ny: number) => {
    const { lamp } = stateRef.current;
    const c = Math.cos(lamp.theta);
    const s = Math.sin(lamp.theta);
    return { x: nx * c + ny * s, y: -nx * s + ny * c };
  }, []);

  const knockSwitch = useCallback((nx: number, ny: number) => {
    if (!switchRef.current) return;
    switchRef.current.style.setProperty("--kx", `${-nx * 6}px`);
    switchRef.current.style.setProperty("--ky", `${-ny * 6}px`);
    switchRef.current.style.setProperty("--kr", `${(Math.random() - 0.5) * 6}deg`);
    switchRef.current.classList.remove("knock");
    void switchRef.current.offsetWidth;
    switchRef.current.classList.add("knock");
  }, []);

  const pop = useCallback((vx = 0, vy = 0) => {
    const s = stateRef.current;
    const b = toWorld(BULB[0], BULB[1]);
    s.light.broken = true;
    s.light.popT = 0;
    s.light.flash = 1;
    setIsBroken(true);
    setBulbsCount((c) => c + 1);

    for (let i = 0; i < 38; i++) {
      const ang = Math.random() * TAU;
      const sp = 120 + Math.random() * 480;
      const n = 3 + Math.floor(Math.random() * 2);
      const r = 2 + Math.random() * 6;
      const poly: [number, number][] = [];
      for (let k = 0; k < n; k++) {
        const a = (k / n) * TAU + Math.random() * 0.8;
        poly.push([Math.cos(a) * r * (0.5 + Math.random()), Math.sin(a) * r * (0.5 + Math.random())]);
      }
      s.shards.push({
        x: b.x + Math.cos(ang) * 8,
        y: b.y + Math.sin(ang) * 8,
        vx: Math.cos(ang) * sp + vx * 0.35,
        vy: Math.sin(ang) * sp * 0.7 + 80 + vy * 0.35,
        a: Math.random() * TAU,
        va: (Math.random() - 0.5) * 24,
        poly,
      });
    }

    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * TAU;
      const sp = 200 + Math.random() * 700;
      s.sparks.push({
        x: b.x,
        y: b.y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 0.3 + Math.random() * 0.6,
        max: 0.9,
      });
    }

    lampAudio.play("pop");
  }, [toWorld]);

  const setSwitchState = useCallback((on: boolean) => {
    const s = stateRef.current;
    if (s.light.on === on) return;
    s.light.on = on;
    setIsLightOn(on);
    lampAudio.play(on ? "on" : "off");

    if (s.light.broken || s.light.popT > 0) return;

    if (!on) {
      s.light.heat += 0.4;
      return;
    }
    s.light.heat += 1;
    s.light.warm = 0.16;
    if (s.light.heat > 4.4) {
      s.light.popT = 0.14;
    }
  }, []);

  const replaceBulb = useCallback(() => {
    const s = stateRef.current;
    s.light.broken = false;
    s.light.heat = 0;
    s.light.popT = 0;
    setIsBroken(false);
    if (s.light.on) {
      s.light.warm = 0.2;
      lampAudio.play("on");
    }
  }, []);

  const kickLamp = useCallback((px: number, py: number, fx: number, fy: number) => {
    const { lamp } = stateRef.current;
    const rx = px - lamp.ax;
    const ry = py - lamp.ay;
    lamp.omega += (ry * fx - rx * fy) / (lamp.len * lamp.len);
  }, []);

  const shoot = useCallback(() => {
    const s = stateRef.current;
    const vx = (s.sling.rest.x - s.sling.pouch.x) * LAUNCH;
    const vy = (s.sling.rest.y - s.sling.pouch.y) * LAUNCH;
    const pull = Math.hypot(vx, vy) / LAUNCH;
    if (pull < 18) return;

    s.pebbles.push({
      x: s.sling.pouch.x,
      y: s.sling.pouch.y,
      vx,
      vy,
      a: 0,
      hitT: 0,
      rest: 0,
      life: 1,
    });
    s.sling.loaded = false;
    s.sling.reloadT = 0.45;
    s.sling.vel = { x: vx * 0.4, y: vy * 0.4 };
    setShotsCount((c) => c + 1);
    lampAudio.play("twang");
  }, []);

  const hitTest = useCallback((x: number, y: number) => {
    const s = stateRef.current;
    if (s.sling.loaded && Math.hypot(x - s.sling.pouch.x, y - s.sling.pouch.y) < 28) {
      return { type: "pouch" as const };
    }
    const l = toLocal(x, y);
    const halfW = 14 + 50 * clamp((l.y - 12) / 50, 0, 1) + 6;
    if (l.y > -6 && l.y < 92 && Math.abs(l.x) < halfW) {
      const tgt = Math.atan2(x - s.lamp.ax, y - s.lamp.ay);
      return { type: "lamp" as const, offset: tgt - s.lamp.theta };
    }
    return null;
  }, [toLocal]);

  // Main Canvas Setup and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d");
    const dark = document.createElement("canvas");
    const dctx = dark.getContext("2d");
    if (!gctx || !dctx) return;

    stateRef.current.glowCanvas = glow;
    stateRef.current.darkCanvas = dark;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const DPR = Math.min(window.devicePixelRatio || 1, 2);

      const s = stateRef.current;
      s.W = W;
      s.H = H;
      s.DPR = DPR;

      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      glow.width = dark.width = Math.ceil(W * LIGHT_SCALE);
      glow.height = dark.height = Math.ceil(H * LIGHT_SCALE);

      s.lamp.ax = W / 2;
      s.lamp.len = clamp(H * (W < 640 ? 0.27 : 0.3), H < 500 ? 90 : 130, 320);
      s.sling.x = clamp(W * 0.2, 70, 320);
      s.sling.y = H;
      s.sling.rest = { x: s.sling.x, y: H - 128 };

      if (!s.grab || s.grab.type !== "pouch") {
        s.sling.pouch = { ...s.sling.rest };
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Collision Logic
    const collideSwitch = (p: Pebble) => {
      const s = stateRef.current;
      if (p.hitT > 0 || !s.switchRect) return;

      const r = PEBBLE_R;
      const cx = clamp(p.x, s.switchRect.left, s.switchRect.right);
      const cy = clamp(p.y, s.switchRect.top, s.switchRect.bottom);
      let nx = p.x - cx;
      let ny = p.y - cy;
      const d = Math.hypot(nx, ny);
      if (d > r) return;

      if (d === 0) {
        const sp = Math.hypot(p.vx, p.vy) || 1;
        nx = -p.vx / sp;
        ny = -p.vy / sp;
      } else {
        nx /= d;
        ny /= d;
      }

      const vn = p.vx * nx + p.vy * ny;
      if (vn >= 0) return;

      p.vx -= 1.4 * vn * nx;
      p.vy -= 1.4 * vn * ny;
      p.x = cx + nx * (r + 1);
      p.y = cy + ny * (r + 1);
      p.hitT = 0.1;
      lampAudio.play("tap", -vn / 2000);
      knockSwitch(nx, ny);
      setSwitchState(!s.light.on);
    };

    const collidePebble = (p: Pebble) => {
      const s = stateRef.current;
      collideSwitch(p);
      if (p.hitT > 0) return;

      const l = toLocal(p.x, p.y);
      const r = PEBBLE_R;

      if (!s.light.broken && Math.hypot(l.x - BULB[0], l.y - BULB[1]) < BULB_R + r) {
        pop(p.vx, p.vy);
        kickLamp(p.x, p.y, p.vx * 0.08, p.vy * 0.08);
        p.vx *= 0.75;
        p.vy *= 0.75;
        p.hitT = 0.08;
        return;
      }

      if (l.y < 10 - r || l.y > 62 + r) return;

      const halfW = 14 + 48 * Math.pow(clamp((l.y - 13) / 49, 0, 1), 0.7);
      if (Math.abs(l.x) > halfW + r) return;

      let nx = l.x;
      let ny = l.y - 30;
      const nl = Math.hypot(nx, ny) || 1;
      nx /= nl;
      ny /= nl;
      const n = dirToWorld(nx, ny);
      const vn = p.vx * n.x + p.vy * n.y;
      if (vn >= 0) return;

      const e = 0.45;
      p.vx -= (1 + e) * vn * n.x;
      p.vy -= (1 + e) * vn * n.y;
      p.x += n.x * 6;
      p.y += n.y * 6;
      const J = -(1 + e) * vn * 0.22;
      kickLamp(p.x, p.y, -n.x * J, -n.y * J);
      p.hitT = 0.06;
      lampAudio.play("clank", -vn / 1200);
    };

    const stepSimulation = (dt: number) => {
      const s = stateRef.current;
      let acc = -(G / s.lamp.len) * Math.sin(s.lamp.theta) - s.lamp.omega * 0.3;

      if (s.grab && s.grab.type === "lamp") {
        const offset = s.grab.offset ?? 0;
        const tgt = clamp(Math.atan2(s.mouse.x - s.lamp.ax, s.mouse.y - s.lamp.ay) - offset, -1.25, 1.25);
        acc += (tgt - s.lamp.theta) * 170 - s.lamp.omega * 16;
      }

      s.lamp.omega += acc * dt;
      const prevTheta = s.lamp.theta;
      s.lamp.theta = clamp(s.lamp.theta + s.lamp.omega * dt, -1.45, 1.45);

      if (Math.sign(prevTheta) !== Math.sign(s.lamp.theta) && Math.abs(s.lamp.omega) > 0.35) {
        lampAudio.play("squeak", (Math.abs(s.lamp.omega) - 0.35) / 2);
      }

      if (s.grab && s.grab.type === "pouch") {
        let dx = s.mouse.x - s.sling.rest.x;
        let dy = Math.min(s.mouse.y, s.H - 10) - s.sling.rest.y;
        const d = Math.hypot(dx, dy);
        if (d > MAX_PULL) {
          dx *= MAX_PULL / d;
          dy *= MAX_PULL / d;
        }
        s.sling.pouch = { x: s.sling.rest.x + dx, y: s.sling.rest.y + dy };
        s.sling.vel = { x: 0, y: 0 };
        const pull = Math.hypot(dx, dy);
        s.sling.creakCd -= dt;
        if (Math.abs(pull - s.sling.creakAt) > 7 && s.sling.creakCd <= 0) {
          lampAudio.play("stretch", pull / MAX_PULL);
          s.sling.creakAt = pull;
          s.sling.creakCd = 0.03;
        }
      } else {
        s.sling.vel.x += ((s.sling.rest.x - s.sling.pouch.x) * 900 - s.sling.vel.x * 12) * dt;
        s.sling.vel.y += ((s.sling.rest.y - s.sling.pouch.y) * 900 - s.sling.vel.y * 12) * dt;
        s.sling.pouch.x += s.sling.vel.x * dt;
        s.sling.pouch.y += s.sling.vel.y * dt;
      }

      for (const p of s.pebbles) {
        p.hitT = Math.max(0, p.hitT - dt);
        if (p.rest > 0) continue;
        p.vy += PEBBLE_G * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.a += p.vx * dt * 0.05;
        collidePebble(p);
        if (p.y > s.H - PEBBLE_R) {
          p.y = s.H - PEBBLE_R;
          if (p.vy > 120) {
            lampAudio.play("tap", p.vy / 3000);
          }
          p.vy *= -0.35;
          p.vx *= 0.75;
          if (Math.abs(p.vy) < 40 && Math.abs(p.vx) < 20) {
            p.rest = 0.0001;
          }
        }
        if (p.x < PEBBLE_R || p.x > s.W - PEBBLE_R) {
          p.x = clamp(p.x, PEBBLE_R, s.W - PEBBLE_R);
          p.vx *= -0.5;
        }
      }
    };

    const updateWorld = (dt: number) => {
      const s = stateRef.current;
      if (!s.sling.loaded) {
        s.sling.reloadT -= dt;
        if (s.sling.reloadT <= 0) {
          s.sling.loaded = true;
        }
      }
      for (const p of s.pebbles) {
        if (p.rest > 0) {
          p.rest += dt;
          if (p.rest > 4) {
            p.life -= dt * 1.5;
          }
        }
      }
      s.pebbles = s.pebbles.filter((p) => p.life > 0 && p.y < s.H + 200).slice(-10);

      for (const sh of s.shards) {
        sh.vy += G * 0.75 * dt;
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        sh.a += sh.va * dt;
        if (sh.y > s.H - 3) {
          sh.y = s.H - 3;
          sh.vy *= -0.28;
          sh.vx *= 0.6;
          sh.va *= 0.5;
          if (Math.abs(sh.vy) < 30) {
            sh.vy = 0;
          }
        }
        if (sh.x < 0 || sh.x > s.W) {
          sh.vx *= -0.5;
          sh.x = clamp(sh.x, 0, s.W);
        }
      }
      s.shards = s.shards.slice(-240);

      for (const sp of s.sparks) {
        sp.vy += G * 0.4 * dt;
        sp.vx *= 0.985;
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= dt;
      }
      s.sparks = s.sparks.filter((p) => p.life > 0);
    };

    const updateLight = (dt: number) => {
      const s = stateRef.current;
      s.light.heat = Math.max(0, s.light.heat - dt * 0.35);
      let target = s.light.on && !s.light.broken ? 1 : 0;
      if (s.light.warm > 0) {
        s.light.warm -= dt;
        target *= Math.random() < 0.45 ? 0.12 : 1;
      }
      if (s.light.on && s.light.heat > 2.6 && Math.random() < (s.light.heat - 2.6) * 0.06) {
        target *= 0.3;
      }
      if (s.light.popT > 0) {
        s.light.popT -= dt;
        target = 1.6;
        if (s.light.popT <= 0) {
          pop();
          target = 0;
        }
      }
      const upI = target > s.light.I ? 34 : 16;
      s.light.I = lerp(s.light.I, target, 1 - Math.exp(-upI * dt));
      const upF = target > s.light.fil ? 14 : 3.2;
      s.light.fil = lerp(s.light.fil, clamp(target, 0, 1), 1 - Math.exp(-upF * dt));
      if (s.light.broken) {
        s.light.fil = 0;
      }
      s.light.flash = Math.max(0, s.light.flash - dt * 3.5);
    };

    // Render Pipeline
    const renderLight = () => {
      const s = stateRef.current;
      const I = clamp(s.light.I, 0, 1);
      gctx.setTransform(1, 0, 0, 1, 0, 0);
      gctx.clearRect(0, 0, glow.width, glow.height);

      if (I > 0.002) {
        gctx.setTransform(LIGHT_SCALE, 0, 0, LIGHT_SCALE, 0, 0);
        gctx.filter = "blur(5px)";
        const apex = toWorld(0, 2);
        const rl = toWorld(-60, 62);
        const rr = toWorld(60, 62);
        const far = Math.max(s.W, s.H) * 2.5;
        const nl = Math.hypot(rl.x - apex.x, rl.y - apex.y);
        const nr = Math.hypot(rr.x - apex.x, rr.y - apex.y);
        const dl = { x: (rl.x - apex.x) / nl, y: (rl.y - apex.y) / nl };
        const dr = { x: (rr.x - apex.x) / nr, y: (rr.y - apex.y) / nr };
        const b = toWorld(BULB[0], BULB[1]);
        const reach = Math.max(s.W, s.H) * 1.05;

        const grd = gctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, reach);
        grd.addColorStop(0, `rgba(255,214,160,${I})`);
        grd.addColorStop(0.4, `rgba(255,200,140,${I * 0.82})`);
        grd.addColorStop(1, "rgba(255,190,120,0)");
        gctx.fillStyle = grd;
        gctx.beginPath();
        gctx.moveTo(rl.x, rl.y);
        gctx.lineTo(rr.x, rr.y);
        gctx.lineTo(rr.x + dr.x * far, rr.y + dr.y * far);
        gctx.lineTo(rl.x + dl.x * far, rl.y + dl.y * far);
        gctx.closePath();
        gctx.fill();

        const halo = gctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 130);
        halo.addColorStop(0, `rgba(255,210,150,${I * 0.5})`);
        halo.addColorStop(1, "rgba(255,210,150,0)");
        gctx.fillStyle = halo;
        gctx.fillRect(b.x - 130, b.y - 130, 260, 260);
        gctx.filter = "none";
      }

      dctx.setTransform(1, 0, 0, 1, 0, 0);
      dctx.globalCompositeOperation = "source-over";
      dctx.clearRect(0, 0, dark.width, dark.height);
      dctx.fillStyle = `rgba(5,6,7,${0.975 - I * 0.1})`;
      dctx.fillRect(0, 0, dark.width, dark.height);

      if (I > 0.002) {
        dctx.globalCompositeOperation = "destination-out";
        dctx.drawImage(glow, 0, 0);
        dctx.globalCompositeOperation = "source-over";
      }

      ctx.drawImage(dark, 0, 0, s.W, s.H);
      if (I > 0.002) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.13;
        ctx.drawImage(glow, 0, 0, s.W, s.H);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const drawBulb = (I: number) => {
      const s = stateRef.current;
      if (s.light.broken) {
        ctx.fillStyle = "rgba(200,215,230,0.08)";
        ctx.strokeStyle = "rgba(220,230,240,0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const jag = [
          [-10, 60], [-11, 67], [-8, 64], [-6, 71], [-3, 65],
          [0, 69], [3, 64], [6, 72], [8, 65], [11, 68], [10, 60],
        ];
        jag.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(120,105,85,0.8)";
        ctx.beginPath();
        ctx.moveTo(-3, 60); ctx.lineTo(-5, 70); ctx.lineTo(-9, 73);
        ctx.moveTo(3, 60); ctx.lineTo(6, 69); ctx.lineTo(4, 76);
        ctx.stroke();
        return;
      }

      const [bx, by] = BULB;
      const heatTint = clamp((s.light.heat - 2) / 2.5, 0, 1);
      const gg = ctx.createRadialGradient(bx, by + 2, 0, bx, by, 17);
      gg.addColorStop(0, rgba(mix([255, 244, 222], [255, 255, 245], heatTint), 0.06 + 0.92 * I));
      gg.addColorStop(0.55, rgba([255, 205, 140], 0.04 + 0.62 * I));
      gg.addColorStop(1, rgba([255, 168, 90], 0.07 + 0.3 * I));
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.arc(bx, by, BULB_R, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.16 + 0.25 * I})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = "rgba(170,158,140,0.55)";
      ctx.beginPath();
      ctx.moveTo(-3, 60); ctx.lineTo(-6, 76);
      ctx.moveTo(3, 60); ctx.lineTo(6, 76);
      ctx.stroke();

      const f = s.light.fil;
      ctx.save();
      ctx.strokeStyle = rgba(mix([96, 78, 56], [255, 244, 214], f), 1);
      ctx.lineWidth = 1.2;
      if (f > 0.03) {
        ctx.shadowColor = `rgba(255,170,80,${f})`;
        ctx.shadowBlur = 14 * f;
      }
      ctx.beginPath();
      ctx.moveTo(-6, 76);
      for (let k = 1; k <= 10; k++) {
        const x = -6 + (12 * k) / 10;
        const sag = Math.sin((k / 10) * Math.PI) * 2.5;
        ctx.lineTo(x, 76 + sag + (k % 2 ? -1.4 : 1.4));
      }
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.ellipse(-7, 69, 2.2, 5, -0.5, 0, TAU);
      ctx.fill();
    };

    const drawLamp = () => {
      const s = stateRef.current;
      const o = lampOrigin();
      const I = clamp(s.light.I, 0, 1);

      ctx.strokeStyle = "#2f3236";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.lamp.ax, s.lamp.ay);
      ctx.lineTo(o.x, o.y);
      ctx.stroke();

      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(-s.lamp.theta);

      const cg = ctx.createLinearGradient(-8, 0, 8, 0);
      cg.addColorStop(0, "#16181a");
      cg.addColorStop(0.45, "#4a4e54");
      cg.addColorStop(1, "#121315");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.roundRect(-8, -2, 16, 17, 3);
      ctx.fill();

      const sg = ctx.createLinearGradient(-62, 0, 62, 0);
      sg.addColorStop(0, "#0c0d0f");
      sg.addColorStop(0.3, "#26292d");
      sg.addColorStop(0.42, "#4d5157");
      sg.addColorStop(0.58, "#23262a");
      sg.addColorStop(1, "#0a0b0c");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.moveTo(-13, 13);
      ctx.bezierCurveTo(-28, 15, -56, 34, -62, 62);
      ctx.lineTo(62, 62);
      ctx.bezierCurveTo(56, 34, 28, 15, 13, 13);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const ug = ctx.createRadialGradient(0, 64, 0, 0, 62, 62);
      ug.addColorStop(0, rgba(mix([22, 23, 25], [255, 232, 196], I), 1));
      ug.addColorStop(1, rgba(mix([10, 11, 12], [196, 128, 64], I), 1));
      ctx.fillStyle = ug;
      ctx.beginPath();
      ctx.ellipse(0, 62, 62, 7, 0, 0, TAU);
      ctx.fill();

      drawBulb(I);

      ctx.strokeStyle = `rgba(255,255,255,${0.12 + I * 0.2})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(0, 62, 62, 7, 0, 0, Math.PI);
      ctx.stroke();
      ctx.restore();

      if (I > 0.01) {
        const b = toWorld(BULB[0], BULB[1]);
        const h = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 80);
        h.addColorStop(0, `rgba(255,200,130,${0.45 * I})`);
        h.addColorStop(1, "rgba(255,200,130,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = h;
        ctx.fillRect(b.x - 80, b.y - 80, 160, 160);
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const drawPebble = (x: number, y: number, a: number, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(a);
      const g = ctx.createRadialGradient(-2.5, -2.5, 0, 0, 0, PEBBLE_R + 1);
      g.addColorStop(0, "#a9a49b");
      g.addColorStop(0.6, "#6b665f");
      g.addColorStop(1, "#34312d");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, PEBBLE_R + 0.8, PEBBLE_R - 0.8, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    };

    const drawSlingshot = () => {
      const s = stateRef.current;
      const { x, y } = s.sling;
      const tipL = { x: x - 28, y: y - 140 };
      const tipR = { x: x + 28, y: y - 140 };
      const p = s.sling.pouch;
      const aiming = s.grab && s.grab.type === "pouch";
      const stretch = clamp(Math.hypot(p.x - s.sling.rest.x, p.y - s.sling.rest.y) / MAX_PULL, 0, 1);
      const bandW = 4 - stretch * 2;

      ctx.lineCap = "round";
      ctx.strokeStyle = "#7a2e22";
      ctx.lineWidth = bandW;
      ctx.beginPath();
      ctx.moveTo(tipL.x, tipL.y);
      ctx.lineTo(p.x - 6, p.y);
      ctx.stroke();

      const wood = ctx.createLinearGradient(x - 30, 0, x + 30, 0);
      wood.addColorStop(0, "#3b2616");
      wood.addColorStop(0.45, "#8a5a34");
      wood.addColorStop(1, "#3a2515");
      ctx.strokeStyle = wood;
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(x, y + 4);
      ctx.lineTo(x, y - 72);
      ctx.quadraticCurveTo(x - 4, y - 96, tipL.x, tipL.y);
      ctx.moveTo(x, y - 72);
      ctx.quadraticCurveTo(x + 4, y - 96, tipR.x, tipR.y);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,220,180,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 2, y);
      ctx.lineTo(x - 2, y - 70);
      ctx.stroke();

      ctx.fillStyle = "#2a1a0f";
      for (const t of [tipL, tipR]) {
        ctx.beginPath();
        ctx.ellipse(t.x, t.y, 6, 3, 0, 0, TAU);
        ctx.fill();
      }

      if (aiming) {
        const vx = (s.sling.rest.x - p.x) * LAUNCH;
        const vy = (s.sling.rest.y - p.y) * LAUNCH;
        ctx.fillStyle = "#ece6da";
        for (let i = 1; i <= 9; i++) {
          const t = i * 0.035;
          ctx.globalAlpha = 0.5 * (1 - i / 10);
          ctx.beginPath();
          ctx.arc(p.x + vx * t, p.y + vy * t + 0.5 * PEBBLE_G * t * t, 2, 0, TAU);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#4a2c1c";
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 11, 7, Math.atan2(p.y - s.sling.rest.y, p.x - s.sling.rest.x), 0, TAU);
      ctx.fill();

      if (s.sling.loaded) {
        drawPebble(p.x, p.y, 0);
      }

      ctx.strokeStyle = "#8e3627";
      ctx.lineWidth = bandW;
      ctx.beginPath();
      ctx.moveTo(tipR.x, tipR.y);
      ctx.lineTo(p.x + 6, p.y);
      ctx.stroke();
    };

    const drawParticles = () => {
      const s = stateRef.current;
      for (const p of s.pebbles) {
        drawPebble(p.x, p.y, p.a, clamp(p.life, 0, 1));
      }
      for (const sh of s.shards) {
        ctx.save();
        ctx.translate(sh.x, sh.y);
        ctx.rotate(sh.a);
        ctx.fillStyle = "rgba(210,225,240,0.16)";
        ctx.strokeStyle = "rgba(230,238,248,0.55)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        sh.poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      if (!s.sparks.length) return;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (const p of s.sparks) {
        const t = clamp(p.life / p.max, 0, 1);
        ctx.strokeStyle = `rgba(255,${Math.round(150 + 90 * t)},${Math.round(80 * t)},${t})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 0.012, p.y - p.vy * 0.012);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const render = () => {
      const s = stateRef.current;
      ctx.setTransform(s.DPR, 0, 0, s.DPR, 0, 0);
      ctx.clearRect(0, 0, s.W, s.H);
      renderLight();
      drawLamp();
      drawSlingshot();
      drawParticles();
      if (s.light.flash > 0) {
        ctx.fillStyle = `rgba(255,236,200,${s.light.flash * 0.5})`;
        ctx.fillRect(0, 0, s.W, s.H);
      }
    };

    // Animation Loop
    const frame = (now: number) => {
      const s = stateRef.current;
      if (switchRef.current && container) {
        const sr = switchRef.current.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        s.switchRect = {
          left: sr.left - cr.left,
          right: sr.right - cr.left,
          top: sr.top - cr.top,
          bottom: sr.bottom - cr.top,
        };
      }

      const dt = Math.min(0.05, (now - s.lastTime) / 1000);
      s.lastTime = now;
      s.accT += dt;

      while (s.accT >= STEP) {
        stepSimulation(STEP);
        s.accT -= STEP;
      }

      updateWorld(dt);
      updateLight(dt);
      render();

      s.animId = requestAnimationFrame(frame);
    };

    stateRef.current.lastTime = performance.now();
    stateRef.current.animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(stateRef.current.animId);
    };
  }, [dirToWorld, kickLamp, lampOrigin, knockSwitch, pop, setSwitchState, toLocal, toWorld]);

  // Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    lampAudio.resume();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const s = stateRef.current;
    s.mouse.x = x;
    s.mouse.y = y;
    s.grab = hitTest(x, y);

    if (s.grab) {
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const s = stateRef.current;
    s.mouse.x = x;
    s.mouse.y = y;

    if (!s.grab) {
      e.currentTarget.style.cursor = hitTest(x, y) ? "grab" : "default";
    }
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    if (s.grab && s.grab.type === "pouch") {
      shoot();
      s.sling.creakAt = 0;
    }
    s.grab = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "default";
    }
  };

  const toggleSound = () => {
    lampAudio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-[#050607] text-[#ece6da] overflow-hidden select-none"
    >
      {/* Blueprint Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "76px 76px",
          backgroundPosition: "center top",
        }}
      />

      {/* Main Narrative Headline Stage (Behind Lamp & Light Cone) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[13vh] px-4 text-center pointer-events-none z-10">
        <span className="font-mono text-xs tracking-[0.2em] text-[#ece6da]/55 uppercase mb-5 select-none">
          03:14 AM
        </span>
        <h2 className="font-black tracking-[-0.035em] text-[#ece6da] leading-[0.98] select-none text-[clamp(40px,7.5vw,96px)]">
          Nobody touch <br />
          the <em className="not-italic text-[#f3c98f]">lamp.</em>
        </h2>
        <p className="mt-5 text-[15px] sm:text-[17px] leading-relaxed text-[#ece6da]/60 max-w-[56ch] font-medium select-none">
          <span className="hidden sm:inline">
            Use the switch to turn the bulb on and off.
            <br />
            Use the slingshot to hit the shade, the bulb or the switch.
          </span>
          <span className="sm:hidden">
            Flip the switch. Pull back the slingshot to hit the shade, bulb or switch. Drag the shade to swing it.
          </span>
        </p>
      </div>

      {/* Interactive Physics Canvas (Full-Bleed Stage) */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 w-full h-full block z-20 touch-none"
      />

      {/* Minimalist HUD Interface */}
      <div className="absolute inset-0 pointer-events-none z-30 font-mono text-xs text-[#ece6da]/35">
        {/* Top-Left: Category Tag, State, Shots & Bulbs */}
        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 pointer-events-auto leading-[1.7] tracking-[0.04em] text-[11px] sm:text-xs">
          <a
            href="#playground"
            className="text-[#ece6da]/40 hover:text-[#ece6da] transition-colors"
          >
            ← interactive-lab
          </a>
          <br />
          slingshot-lamp ·{" "}
          <b className="font-normal text-[#ece6da]/70">
            {isBroken ? (isLightOn ? "blown (on)" : "blown") : isLightOn ? "on" : "off"}
          </b>
          <br />
          shots <b className="font-normal text-[#ece6da]/70">{shotsCount}</b> · bulbs{" "}
          <b className="font-normal text-[#ece6da]/70">{bulbsCount}</b>
        </div>

        {/* Top-Right: Sound Toggle Button */}
        <button
          onClick={toggleSound}
          type="button"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 pointer-events-auto bg-transparent border border-white/10 hover:border-white/25 text-[#ece6da]/40 hover:text-[#ece6da] rounded-full px-3 py-1.5 font-mono text-[11px] sm:text-xs transition-colors cursor-pointer"
        >
          sound: {isMuted ? "off" : "on"}
        </button>

        {/* 3D Skeuomorphic Wall Switch */}
        <div
          ref={switchRef}
          onClick={() => {
            lampAudio.resume();
            setSwitchState(!isLightOn);
          }}
          role="switch"
          aria-checked={isLightOn}
          aria-label="Light switch"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              setSwitchState(!isLightOn);
            }
          }}
          className="switch-wall pointer-events-auto absolute right-4 sm:right-[max(24px,8vw)] top-1/2 -translate-y-1/2 w-[74px] h-[120px] rounded-[11px] cursor-pointer select-none outline-none max-sm:scale-80 max-sm:origin-right"
          style={{
            background: "linear-gradient(160deg, #26282b, #151618 60%, #101112)",
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.09),
              inset 0 -1px 0 rgba(0, 0, 0, 0.6),
              0 1px 0 rgba(255, 255, 255, 0.03),
              0 14px 30px rgba(0, 0, 0, 0.7)
            `,
          }}
        >
          {/* Top Screw */}
          <span
            className="absolute left-1/2 top-[9px] -translate-x-1/2 w-[7px] h-[7px] rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #6b6d70, #2a2b2d 70%)",
            }}
          >
            <span className="absolute left-[1px] right-[1px] top-[3px] h-[1px] bg-black/70 rotate-[35deg]" />
          </span>

          <span className="absolute top-5 left-0 right-0 text-center font-mono text-[8px] tracking-[0.18em] text-white/25">
            ON
          </span>

          {/* Switch Lever Slot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26px] h-[50px] rounded-[5px] bg-gradient-to-b from-[#060607] to-[#0d0e0f]"
            style={{
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.06)",
              perspective: "120px",
            }}
          >
            <div
              className="absolute inset-[3px] rounded-[3px] transition-transform duration-150 ease-out"
              style={{
                transformOrigin: "50% 50%",
                transform: isLightOn ? "rotateX(-26deg)" : "rotateX(26deg)",
                background: isLightOn
                  ? "linear-gradient(#9d9b97 0%, #d8d4cc 38%, #8c8984 52%, #54524f 100%)"
                  : "linear-gradient(#4d4b48 0%, #85827d 48%, #d0ccc4 64%, #97948f 100%)",
                boxShadow: isLightOn ? "0 5px 6px rgba(0, 0, 0, 0.6)" : "0 -5px 6px rgba(0, 0, 0, 0.6)",
              }}
            />
          </div>

          {/* Glowing Amber Pilot LED */}
          <span
            className={`absolute right-[9px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full transition-all duration-200 ${
              isLightOn
                ? "bg-[#ffb45a] shadow-[0_0_6px_1px_rgba(255,170,80,0.8)]"
                : "bg-[#3a2a1a]"
            }`}
          />

          <span className="absolute bottom-5 left-0 right-0 text-center font-mono text-[8px] tracking-[0.18em] text-white/25">
            OFF
          </span>

          {/* Bottom Screw */}
          <span
            className="absolute left-1/2 bottom-[9px] -translate-x-1/2 w-[7px] h-[7px] rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #6b6d70, #2a2b2d 70%)",
            }}
          >
            <span className="absolute left-[1px] right-[1px] top-[3px] h-[1px] bg-black/70 rotate-[35deg]" />
          </span>
        </div>

        {/* Replace Bulb Button (Pops up when bulb is destroyed) */}
        {isBroken && (
          <button
            onClick={replaceBulb}
            type="button"
            className="pointer-events-auto absolute left-1/2 bottom-[52px] -translate-x-1/2 bg-[#ece6da] text-[#111] rounded-full px-[18px] py-[11px] font-mono font-medium text-[13px] shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:bg-white hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer"
          >
            replace bulb
          </button>
        )}

        {/* Bottom Hint */}
        <div className="absolute left-0 right-0 bottom-[22px] text-center pointer-events-none px-4 text-[11px] sm:text-xs text-[#ece6da]/35">
          flip the switch · pull the pebble back and let go · grab the shade to swing it
        </div>
      </div>

      <style>{`
        .knock {
          animation: switchKnock 0.32s cubic-bezier(0.3, 0.7, 0.4, 1);
        }
        @keyframes switchKnock {
          0% {
            transform: translateY(-50%) translate(var(--kx, 0), var(--ky, 0)) rotate(var(--kr, 0deg));
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
