"use client";

import React from "react";
import SettingsView from "../view/index.view";
import { useSettingsController } from "../hooks/useSettingsController";

export default function SettingsController() {
  const { activeTab, setActiveTab, profileData, profileDetailsData } =
    useSettingsController();

  return (
    <SettingsView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      profileData={profileData}
      profileDetailsData={profileDetailsData}
    />
  );
}