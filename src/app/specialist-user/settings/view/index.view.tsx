"use client";

import React from "react";
import { SettingsTabs, SettingsTabType } from "../components/SettingsTabs";
import { ProfileForm } from "../components/ProfileForm";
import { ProfileDetailsForm } from "../components/ProfileDetailsForms";
import { ProfileFormData } from "../hooks/useProfileForm";
import { ProfileDetailsData } from "../hooks/useProfileDetailsForm";
import { PasswordForm } from "../components/PasswordForm";

interface SettingsViewProps {
  activeTab: SettingsTabType;
  onTabChange: (tab: SettingsTabType) => void;
  profileData: ProfileFormData;
  profileDetailsData: ProfileDetailsData;
}

export default function SettingsView({
  activeTab,
  onTabChange,
  profileData,
  profileDetailsData,
}: SettingsViewProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full max-w-6xl mx-auto">
      {/* Main Header */}
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Configurações
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Gerencie as informações do seu perfil e conta.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full">
        {/* settings tabs */}
        <SettingsTabs activeTab={activeTab} onChange={onTabChange} />

        {/* dynamic content */}
        <main className="flex-1 w-full">
          {activeTab === "personal" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Meu Perfil
              </h2>
              <ProfileForm initialData={profileData} />
            </div>
          )}

          {activeTab === "details" && (
            <ProfileDetailsForm initialData={profileDetailsData} />
          )}

          {activeTab === "password" && (
            <PasswordForm />
          )}
        </main>
      </div>
    </div>
  );
}