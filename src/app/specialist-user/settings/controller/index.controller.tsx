"use client";

import React from "react";
import SettingsView from "../view/index.view";
import { useSettingsController } from "../hooks/useSettingsController";

export default function SettingsController() {
  const { activeTab, setActiveTab, profileData, profileDetailsData, loading } =
    useSettingsController();

  if (loading) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-gray-light" aria-hidden />
    );
  }

  return (
    <SettingsView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      profileData={profileData}
      profileDetailsData={profileDetailsData}
    />
  );
}