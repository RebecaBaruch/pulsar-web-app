"use client";

import React from "react";
import Home from "../view/index.view";

export default function HomeController() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <Home loading={loading} />;
}
