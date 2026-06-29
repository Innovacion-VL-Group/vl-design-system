"use client";

import { cn } from "@heroui/react";
import { Button } from "@heroui/react/button";
import type { ReactElement } from "react";
import type { SubSidebarExpandTriggerProps } from "./types.js";
import { MOBILE_MENU_BLUR_CLASSES } from "./constants.js";

export function SubSidebarExpandTrigger({
  onExpand,
  expandAriaLabel = "Expand submenu",
  expandIcon,
  trigger,
  className,
  style,
}: SubSidebarExpandTriggerProps): ReactElement {
  const defaultTrigger = (
    <Button
      type="button"
      onPress={onExpand}
      variant="ghost"
      size="sm"
      className="size-9 min-w-9 rounded-l-none rounded-r-3xl bg-default p-0 hover:bg-default-hover"
      aria-label={expandAriaLabel}
    >
      {expandIcon}
    </Button>
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-2.5 left-0 z-30 md:absolute md:z-10",
        className,
      )}
    >
      <div
        className={cn("pointer-events-auto rounded-r-3xl", MOBILE_MENU_BLUR_CLASSES)}
        style={style}
      >
        {trigger ?? defaultTrigger}
      </div>
    </div>
  );
}
