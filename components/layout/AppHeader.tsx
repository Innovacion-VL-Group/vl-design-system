"use client";

import { cn } from "@heroui/react";
import { Button } from "@heroui/react/button";
import { Surface } from "@heroui/react/surface";
import type { ReactElement } from "react";
import type { AppHeaderProps } from "./types.js";

export function AppHeader({
  isSidebarOpen,
  onSidebarToggle,
  logo,
  actions,
  sidebarToggle,
  sidebarToggleAriaLabel,
  toggleOpenIcon,
  toggleCloseIcon,
  style,
  className,
}: AppHeaderProps): ReactElement {
  const toggleLabel =
    sidebarToggleAriaLabel ??
    (isSidebarOpen ? "Close sidebar" : "Open sidebar");

  const defaultToggle = (
    <Button
      type="button"
      onPress={onSidebarToggle}
      variant="ghost"
      size="sm"
      aria-label={toggleLabel}
    >
      {isSidebarOpen ? toggleCloseIcon : toggleOpenIcon}
    </Button>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 shrink-0 md:relative md:z-auto",
        className,
      )}
    >
      <Surface
        className="flex h-16 items-center justify-between border-b border-separator px-4"
        style={style}
      >
        <div className="flex items-center gap-2.5">
          {sidebarToggle ?? defaultToggle}
          {logo}
        </div>
        {actions ? (
          <div className="flex items-center gap-2.5">{actions}</div>
        ) : null}
      </Surface>
    </header>
  );
}
