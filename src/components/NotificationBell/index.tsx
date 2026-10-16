"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { RoutesUrls } from "@/utils/enum/routes-url";

interface Notification {
  id: string;
  clientName: string;
  sessionDate: string;
  sessionTime: string;
  createdAt: string;
  read: boolean;
}

/** Acima do calendário (z-40), abaixo de drawers/modais (z-50+). */
const NOTIFICATION_PANEL_Z = 45;

export default function NotificationBell() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      clientName: "João Silva",
      sessionDate: "2026-06-23",
      sessionTime: "14:00",
      createdAt: new Date().toISOString(),
      read: false,
    },
    {
      id: "2",
      clientName: "Maria Santos",
      sessionDate: "2026-06-24",
      sessionTime: "10:30",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: "3",
      clientName: "Pedro Costa",
      sessionDate: "2026-06-25",
      sessionTime: "16:00",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const updatePanelPosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPanelPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setPanelPosition(null);
      return;
    }

    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [isOpen, updatePanelPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleNotificationClick = (id: string) => {
    handleMarkAsRead(id);
    setIsOpen(false);
    router.push(RoutesUrls.SPECIALIST_SCHEDULE);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    return notifDate.toLocaleDateString("pt-BR");
  };

  const panel =
    isOpen && panelPosition ? (
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Notificações"
        className="fixed w-80 rounded-lg border border-gray-200 bg-white shadow-2xl"
        style={{
          top: panelPosition.top,
          right: panelPosition.right,
          zIndex: NOTIFICATION_PANEL_Z,
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h3 className="text-lg font-semibold text-gray-800">Notificações</h3>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="cursor-pointer text-sm text-blue transition-colors hover:text-blue-dark"
            >
              Limpar tudo
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>Nenhuma notificação no momento</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <button
                    type="button"
                    className={`w-full cursor-pointer p-4 text-left transition-colors active:bg-gray-200/70 ${
                      !notification.read
                        ? "bg-blue-50 hover:bg-blue-100/80"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Nova sessão marcada
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          <span className="font-semibold">
                            {notification.clientName}
                          </span>{" "}
                          marcou uma sessão para{" "}
                          <span className="font-semibold">
                            {new Date(
                              notification.sessionDate,
                            ).toLocaleDateString("pt-BR")}{" "}
                            às {notification.sessionTime}
                          </span>
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue" />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ) : null;

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="relative cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
          aria-label="Notificações"
          aria-expanded={isOpen}
        >
          <FaBell className="text-lg text-gray-700 hover:text-blue" />
          {unreadCount > 0 && (
            <div className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </div>
          )}
        </button>
      </div>

      {typeof document !== "undefined" && panel
        ? createPortal(panel, document.body)
        : null}
    </>
  );
}
