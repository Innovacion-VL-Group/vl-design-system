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
