import type { SidebarMotionConfig } from "./types.js";

export const DEFAULT_SIDEBAR_MOTION: SidebarMotionConfig = {
  width: 256,
  transition: {
    duration: 0.38,
    ease: [0.32, 0.72, 0, 1],
  },
  contentTransition: {
    duration: 0.28,
    ease: [0.32, 0.72, 0, 1],
  },
};

export const APP_HEADER_HEIGHT = "4rem";

export const MOBILE_SIDEBAR_LAYOUT_CLASSES =
  "fixed top-16 left-0 z-40 h-[calc(100dvh-4rem)] md:relative md:top-auto md:z-auto md:h-full";

export const MOBILE_MENU_BLUR_CLASSES = "max-md:backdrop-blur-sm";
