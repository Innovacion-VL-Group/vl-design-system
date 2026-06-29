"use client";

import { cn } from "@heroui/react";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import { motion } from "motion/react";
import type { ReactElement } from "react";
import { DEFAULT_SIDEBAR_MOTION, MOBILE_MENU_BLUR_CLASSES, MOBILE_SIDEBAR_LAYOUT_CLASSES } from "./constants.js";
import { SidebarNavItem } from "./SidebarNavItem.js";
import type { SidebarProps } from "./types.js";

export function Sidebar({
  isOpen,
  items,
  secondaryItems,
  footer,
  navAriaLabel = "Main navigation",
  width,
  motion: motionConfig = DEFAULT_SIDEBAR_MOTION,
  renderLink,
  style,
  className,
}: SidebarProps): ReactElement {
  const sidebarWidth = width ?? motionConfig.width;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? sidebarWidth : 0 }}
      transition={motionConfig.transition}
      aria-hidden={!isOpen}
      className={cn(
        "flex shrink-0 flex-col overflow-hidden border-r border-separator",
        MOBILE_SIDEBAR_LAYOUT_CLASSES,
        className,
      )}
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
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          ...style,
        }}
        className={cn(
          "flex h-full w-64 min-w-64 flex-col gap-4 bg-background py-4 pl-4 pr-[17px]",
          MOBILE_MENU_BLUR_CLASSES,
        )}
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
                variant="main"
                renderLink={renderLink}
              />
            ))}
          </nav>
        </ScrollShadow>

        <div className="mt-auto flex shrink-0 flex-col gap-4">
          {secondaryItems?.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              variant="main"
              renderLink={renderLink}
            />
          ))}
          {footer}
        </div>
      </motion.div>
    </motion.aside>
  );
}
