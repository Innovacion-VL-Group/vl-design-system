import type { ReactNode } from "react";

export type SidebarNavVariant = "main" | "sub";

export type SidebarNavItemData = {
  id: string | number;
  label: string;
  icon?: ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export type SidebarNavLinkRenderProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export type SidebarMotionConfig = {
  width: number;
  transition: {
    duration: number;
    ease: readonly [number, number, number, number];
  };
  contentTransition: {
    duration: number;
    ease: readonly [number, number, number, number];
  };
};

export type SidebarProps = {
  isOpen: boolean;
  items: SidebarNavItemData[];
  secondaryItems?: SidebarNavItemData[];
  footer?: ReactNode;
  navAriaLabel?: string;
  width?: number;
  motion?: SidebarMotionConfig;
  renderLink?: (props: SidebarNavLinkRenderProps) => ReactNode;
};

export type SubSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  items: SidebarNavItemData[];
  navAriaLabel?: string;
  width?: number;
  motion?: SidebarMotionConfig;
  collapseAriaLabel?: string;
  collapseIcon?: ReactNode;
  collapseControl?: ReactNode;
  renderLink?: (props: SidebarNavLinkRenderProps) => ReactNode;
};

export type SubSidebarExpandTriggerProps = {
  onExpand: () => void;
  expandAriaLabel?: string;
  expandIcon?: ReactNode;
  trigger?: ReactNode;
};

export type AppHeaderProps = {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  logo?: ReactNode;
  actions?: ReactNode;
  sidebarToggle?: ReactNode;
  sidebarToggleAriaLabel?: string;
  toggleOpenIcon?: ReactNode;
  toggleCloseIcon?: ReactNode;
};
