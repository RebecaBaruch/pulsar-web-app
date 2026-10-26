import React from "react";

export type ClientPageWidth = "narrow" | "default" | "wide";

const widthClasses: Record<ClientPageWidth, string> = {
  narrow: "max-w-[560px]",
  default: "max-w-[768px]",
  wide: "max-w-[800px]",
};

type ClientPageShellProps = {
  children: React.ReactNode;
  width?: ClientPageWidth;
  className?: string;
  contentClassName?: string;
};

export function ClientPageShell({
  children,
  width = "default",
  className = "",
  contentClassName = "",
}: ClientPageShellProps) {
  return (
    <section
      className={`flex w-full overflow-x-hidden min-h-screen justify-center pt-10 pb-10 ${className}`.trim()}
    >
      <div
        className={`mx-auto flex w-full flex-col gap-8 ${widthClasses[width]} ${contentClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}

type ClientPageHeaderProps = {
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function ClientPageHeader({
  title,
  description,
  align = "start",
}: ClientPageHeaderProps) {
  const alignClass =
    align === "center" ? "items-start md:items-center md:text-center" : "";

  return (
    <div className={`flex flex-col gap-1 ${alignClass}`.trim()}>
      <h1 className="text-2xl font-semibold text-gray-darkest">{title}</h1>
      {description ? <p className="text-sm text-gray">{description}</p> : null}
    </div>
  );
}

/** Sticky page sub-header (e.g. sessions tabs). */
export const clientStickyHeaderClass =
  "sticky top-0 z-10 flex w-full flex-col gap-4 border-b border-gray-light bg-white pb-6";

/** Default elevated surface for forms and grouped content in the client app. */
export const clientCardClass =
  "rounded-lg border border-gray-light bg-white shadow-sm";

type ClientCardProps = React.PropsWithChildren<{
  className?: string;
  as?: "div" | "section";
}> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "className">;

export function ClientCard({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: ClientCardProps) {
  return (
    <Tag className={`${clientCardClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
