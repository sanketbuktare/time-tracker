import React, { useEffect, useRef, useState } from "react";

type Props = {
  running: boolean;
  initialSeconds?: number;
  onTick?: (s: number) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Timer({ running, initialSeconds = 0, onTick }: Props) {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          onTick?.(next);
          return next;
        });
      }, 1000);
    } else {
      if (ref.current) clearInterval(ref.current);
      ref.current = null;
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
      ref.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return (
    <div className="font-mono text-sm">
      {pad(hh)}:{pad(mm)}:{pad(ss)}
    </div>
  );
}
