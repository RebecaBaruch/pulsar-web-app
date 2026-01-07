"use client";

import React, { useEffect } from "react";

export default function A11yDevChecks() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (typeof window === "undefined") return;
    // Opt-in via NEXT_PUBLIC_ENABLE_AXE to avoid runtime overhead by default
    if (!process.env.NEXT_PUBLIC_ENABLE_AXE) return;

    (async () => {
      try {
        const axeModule = await import("@axe-core/react");
        const ReactLib = await import("react");
        const ReactDOM = await import("react-dom");
        // Initialize axe with a small debounce
        axeModule.default(ReactLib, ReactDOM, 1000);
      } catch (e) {
        // Swallow errors in dev to remain non-blocking
        // eslint-disable-next-line no-console
        console.warn("Axe dev checks not initialized:", e);
      }
    })();
  }, []);

  return null;
}
