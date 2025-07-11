"use client";

import { useEffect, useState } from "react";

function getElapsedTime(startTime: number) {
  return Math.floor((Date.now() - startTime) / 1000);
}

export function SecondsFrom({ startTime }: { startTime: number }) {
  const [elapsedTime, setElapsedTime] = useState(getElapsedTime(startTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime(startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return elapsedTime;
}
