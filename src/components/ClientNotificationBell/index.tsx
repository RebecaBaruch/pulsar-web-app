"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faCalendarPlus,
  faCalendarXmark,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { toast } from "sonner";
import SessionRatingModal from "./SessionRatingModal";

type ClientNotificationType =
  | "session_invite"
  | "session_review"
  | "session_cancelled";

type ClientNotification = {
  id: string;
  type: ClientNotificationType;
  professionalName: string;
  sessionDate?: string;
  sessionTime?: string;
  createdAt: string;
  read: boolean;
};

type ClientNotificationBellProps = {
  /** Incrementa para fechar o painel quando outro menu da barra abre. */
  dismissSignal?: number;
  onOpen?: () => void;
};

type PanelPosition = {
  top: number;
  right: number;
  width: number;
};

const PANEL_Z_INDEX = 50;
const PANEL_MARGIN = 8;

const TYPE_META: Record<
  ClientNotificationType,
  { title: string; icon: IconDefinition; iconClass: string }
> = {
  session_invite: {
    title: "Convite para a próxima sessão",
    icon: faCalendarPlus,
    iconClass: "bg-blue-100 text-blue",
  },
  session_review: {
    title: "Como foi sua sessão?",
    icon: faStar,
    iconClass: "bg-yellow-100 text-yellow-700",
  },
  session_cancelled: {
    title: "Sessão cancelada",
    icon: faCalendarXmark,
    iconClass: "bg-red-100 text-red",
  },
};

const INITIAL_NOTIFICATIONS: ClientNotification[] = [
  {
    id: "invite-1",
    type: "session_invite",
    professionalName: "Dra. Mariana Alves",
    sessionDate: "2026-11-03",
    sessionTime: "14:00",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "review-1",
    type: "session_review",
    professionalName: "Dr. Rafael Costa",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "cancelled-1",
    type: "session_cancelled",
    professionalName: "Dra. Juliana Mendes",
    sessionDate: "2026-10-22",
    sessionTime: "16:45",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
];

function formatSessionDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function formatTimeAgo(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  return new Date(date).toLocaleDateString("pt-BR");
}

function NotificationAction({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => void;
  variant: "primary" | "neutral" | "danger";
}) {
  const styles = {
    primary: "border border-blue bg-blue text-white hover:bg-blue-700",
    neutral:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    danger: "border border-red bg-white text-red hover:bg-red-100",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded px-3 py-2 text-center text-xs font-semibold leading-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${styles[variant]}`}
    >
      {label}
    </button>
  );
}

function SessionWhen({
  date,
  time,
  tone,
}: {
  date: string;
  time: string;
  tone: "invite" | "cancelled";
}) {
  const iconClass = tone === "cancelled" ? "text-red" : "text-blue";

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-darkest">
      <span className="flex items-center gap-1.5">
        <FontAwesomeIcon icon={faCalendar} className={iconClass} />
        {formatSessionDate(date)}
      </span>
      <span className="flex items-center gap-1.5">
        <FontAwesomeIcon icon={faClock} className={iconClass} />
        {time}
      </span>
    </div>
  );
}

function NotificationCard({
  notification,
  onAccept,
  onDecline,
  onDelete,
  onEvaluate,
}: {
  notification: ClientNotification;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onDelete: (id: string) => void;
  onEvaluate: (notification: ClientNotification) => void;
}) {
  const meta = TYPE_META[notification.type];

  return (
    <article
      className={`p-4 transition-colors ${
        notification.read ? "bg-white" : "bg-blue-100/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.iconClass}`}
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={meta.icon} className="text-sm" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-gray-darkest">
              {meta.title}
            </h4>
            {!notification.read && (
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue"
                aria-hidden="true"
              />
            )}
          </div>

          {notification.type === "session_invite" && (
            <>
              <p className="mt-1 text-sm leading-relaxed text-gray">
                <span className="font-semibold text-gray-darkest">
                  {notification.professionalName}
                </span>{" "}
                enviou um convite para a próxima sessão.
              </p>
              {notification.sessionDate && notification.sessionTime && (
                <SessionWhen
                  date={notification.sessionDate}
                  time={notification.sessionTime}
                  tone="invite"
                />
              )}
              <div className="mt-3 flex gap-2">
                <NotificationAction
                  label="Cancelar"
                  variant="neutral"
                  onClick={() => onDecline(notification.id)}
                />
                <NotificationAction
                  label="Aceitar convite"
                  variant="primary"
                  onClick={() => onAccept(notification.id)}
                />
              </div>
            </>
          )}

          {notification.type === "session_review" && (
            <>
              <p className="mt-1 text-sm leading-relaxed text-gray">
                Avalie sua sessão com{" "}
                <span className="font-semibold text-gray-darkest">
                  {notification.professionalName}
                </span>
                . O que achou do trabalho dele?
              </p>
              <div className="mt-3 flex gap-2">
                <NotificationAction
                  label="Excluir"
                  variant="danger"
                  onClick={() => onDelete(notification.id)}
                />
                <NotificationAction
                  label="Avaliar"
                  variant="primary"
                  onClick={() => onEvaluate(notification)}
                />
              </div>
            </>
          )}

          {notification.type === "session_cancelled" && (
            <>
              <p className="mt-1 text-sm leading-relaxed text-gray">
                <span className="font-semibold text-gray-darkest">
                  {notification.professionalName}
                </span>{" "}
                cancelou a sessão.
              </p>
              {notification.sessionDate && notification.sessionTime && (
                <SessionWhen
                  date={notification.sessionDate}
                  time={notification.sessionTime}
                  tone="cancelled"
                />
              )}
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(notification.id)}
                  className="cursor-pointer rounded border border-red bg-white px-3 py-2 text-xs font-semibold text-red transition-colors hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  Excluir
                </button>
              </div>
            </>
          )}

          <p className="mt-2 text-xs text-gray">{formatTimeAgo(notification.createdAt)}</p>
        </div>
      </div>
    </article>
  );
}

export default function ClientNotificationBell({
  dismissSignal = 0,
  onOpen,
}: ClientNotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(
    null,
  );
  const [notifications, setNotifications] = useState<ClientNotification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [ratingTarget, setRatingTarget] = useState<ClientNotification | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dismissRef = useRef(dismissSignal);

  const unreadCount = notifications.filter((notification) => !notification.read)
    .length;

  const updatePanelPosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.min(352, window.innerWidth - PANEL_MARGIN * 2);
    let right = window.innerWidth - rect.right;
    const left = window.innerWidth - right - width;
    if (left < PANEL_MARGIN) {
      right = window.innerWidth - PANEL_MARGIN - width;
    }

    setPanelPosition({
      top: rect.bottom + PANEL_MARGIN,
      right,
      width,
    });
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openPanel = () => {
    onOpen?.();
    setIsOpen(true);
  };

  useEffect(() => {
    if (dismissRef.current === dismissSignal) return;
    dismissRef.current = dismissSignal;
    closePanel();
  }, [dismissSignal, closePanel]);

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
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      closePanel();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePanel]);

  const removeNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  const handleAccept = (id: string) => {
    removeNotification(id);
    toast.success("Convite aceito");
  };

  const handleDecline = (id: string) => {
    removeNotification(id);
    toast("Convite recusado");
  };

  const handleDelete = (id: string) => {
    removeNotification(id);
    toast("Notificação excluída");
  };

  const handleEvaluate = (notification: ClientNotification) => {
    closePanel();
    setRatingTarget(notification);
  };

  const handleSubmitRating = (rating: number) => {
    if (!ratingTarget || rating < 1) return;
    removeNotification(ratingTarget.id);
    setRatingTarget(null);
    toast.success("Avaliação enviada");
  };

  const panel =
    isOpen && panelPosition ? (
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Notificações"
        className="fixed rounded-lg border border-gray-200 bg-white shadow-2xl"
        style={{
          top: panelPosition.top,
          right: panelPosition.right,
          width: panelPosition.width,
          zIndex: PANEL_Z_INDEX,
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="text-base font-semibold text-gray-darkest">
            Notificações
          </h3>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={() => setNotifications([])}
              className="cursor-pointer text-sm font-medium text-blue transition-colors hover:text-blue-700"
            >
              Limpar tudo
            </button>
          )}
        </div>

        <div className="max-h-[min(24rem,calc(100vh-6rem))] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-gray">
              <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-300" />
              <p className="text-sm">Nenhuma notificação no momento</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <NotificationCard
                    notification={notification}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                    onDelete={handleDelete}
                    onEvaluate={handleEvaluate}
                  />
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
          onClick={() => (isOpen ? closePanel() : openPanel())}
          className="relative cursor-pointer text-lg leading-none text-blue"
          aria-label={
            unreadCount > 0
              ? `Notificações, ${unreadCount} não lidas`
              : "Notificações"
          }
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <FontAwesomeIcon icon={faBell} />
          {unreadCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>

      {typeof document !== "undefined" && panel
        ? createPortal(panel, document.body)
        : null}

      {ratingTarget && (
        <SessionRatingModal
          professionalName={ratingTarget.professionalName}
          onClose={() => setRatingTarget(null)}
          onSubmit={handleSubmitRating}
        />
      )}
    </>
  );
}
