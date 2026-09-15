"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Must match the media query in globals.css that hides the native cursor
// (`min-width: 768px` and `pointer: fine`), otherwise a narrow desktop
// window can end up with both the native and custom cursor visible.
const CURSOR_QUERY = "(min-width: 768px) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(CURSOR_QUERY);
  mq.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    mq.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.matchMedia(CURSOR_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      setIsDark(Boolean(target?.closest(".dark-zone")));
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className={cn("h-2 w-2 rounded-full", isDark ? "bg-white" : "bg-signal")} />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div
          className={cn(
            "h-8 w-8 rounded-full border",
            isDark ? "border-white/80" : "border-signal/70",
          )}
        />
      </motion.div>
    </>
  );
}
