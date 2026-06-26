"use client";

import { Button } from "@heroui/react/button";
import type { SubSidebarExpandTriggerProps } from "./types.js";

export function SubSidebarExpandTrigger({
  onExpand,
  expandAriaLabel = "Expand submenu",
  expandIcon,
  trigger,
}: SubSidebarExpandTriggerProps) {
  const defaultTrigger = (
    <Button
      type="button"
      onPress={onExpand}
      variant="ghost"
      size="sm"
      className="size-9 min-w-9 rounded-l-none rounded-r-3xl bg-default p-0 hover:bg-default/80"
      aria-label={expandAriaLabel}
    >
      {expandIcon}
    </Button>
  );

  return (
    <div className="flex shrink-0 items-end self-stretch border-r border-separator bg-background pb-2.5">
      {trigger ?? defaultTrigger}
    </div>
  );
}
