"use client";

import { Button } from "@heroui/react/button";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import { motion } from "motion/react";
import { DEFAULT_SIDEBAR_MOTION } from "./constants.js";
import { SidebarNavItem } from "./SidebarNavItem.js";
import type { SubSidebarProps } from "./types.js";

export function SubSidebar({
  isOpen,
  onToggle,
  items,
  navAriaLabel = "Secondary navigation",
  width,
  motion: motionConfig = DEFAULT_SIDEBAR_MOTION,
  collapseAriaLabel = "Collapse submenu",
  collapseIcon,
  collapseControl,
  renderLink,
}: SubSidebarProps) {
  const sidebarWidth = width ?? motionConfig.width;

  const defaultCollapseControl = (
    <Button
      type="button"
      onPress={onToggle}
      variant="ghost"
      size="sm"
      className="size-9 min-w-9 rounded-3xl bg-default p-0 hover:bg-default/80"
      aria-label={collapseAriaLabel}
    >
      {collapseIcon}
    </Button>
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? sidebarWidth : 0 }}
      transition={motionConfig.transition}
      aria-hidden={!isOpen}
      className="flex h-full shrink-0 flex-col overflow-hidden bg-background"
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : -12,
        }}
        transition={{
          ...motionConfig.contentTransition,
          delay: isOpen ? 0.1 : 0,
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="flex h-full w-64 min-w-64 flex-col pt-4"
      >
        <ScrollShadow className="min-h-0 flex-1" hideScrollBar>
          <nav
            aria-label={navAriaLabel}
            className="flex flex-col gap-2.5"
          >
            {items.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                variant="sub"
                renderLink={renderLink}
              />
            ))}
          </nav>
        </ScrollShadow>

        <div className="flex w-full shrink-0 items-center justify-end rounded-tr-[20px] border-t border-r border-separator p-2.5">
          {collapseControl ?? defaultCollapseControl}
        </div>
      </motion.div>
    </motion.aside>
  );
}
