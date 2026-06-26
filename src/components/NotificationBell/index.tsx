"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  id: string;
  clientName: string;
  sessionDate: string;
  sessionTime: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    // Mock data - será substituído por dados reais da API
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
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

  return (
    <div ref={containerRef} className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Notificações"
        aria-expanded={isOpen}
      >
        <FaBell className="text-lg text-gray-700 hover:text-blue" />
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </button>

      {/* Floating Notification Container */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Notificações
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-blue hover:text-blue-dark transition-colors"
              >
                Limpar tudo
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Nenhuma notificação no momento</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100" role="listitem">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Nova sessão marcada
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <div className="font-semibold">
                            {notification.clientName}
                          </div>{" "}
                          marcou uma sessão para{" "}
                          <div className="font-semibold">
                            {new Date(
                              notification.sessionDate,
                            ).toLocaleDateString("pt-BR")}{" "}
                            às {notification.sessionTime}
                          </div>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue rounded-full mt-2 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 text-center">
              <button className="text-sm text-blue hover:text-blue-dark font-medium transition-colors">
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
