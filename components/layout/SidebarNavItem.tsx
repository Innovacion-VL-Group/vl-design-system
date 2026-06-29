"use client";

import { cn } from "@heroui/react";
import type { ReactNode } from "react";
import type {
  SidebarNavItemData,
  SidebarNavLinkRenderProps,
  SidebarNavVariant,
} from "./types.js";

function getNavItemClassName(
  isActive: boolean,
  variant: SidebarNavVariant,
): string {
  return cn(
    "flex w-full min-h-9 items-center gap-3 px-3 py-1.5 text-sm font-medium no-underline transition-colors",
    variant === "sub" ? "rounded-l-none rounded-r-[20px]" : "rounded-[20px]",
    isActive
      ? variant === "sub"
        ? "bg-accent-soft text-accent-soft-foreground"
        : "bg-default text-default-foreground"
      : "text-default-foreground hover:bg-default-hover",
  ) as string;
}

type SidebarNavItemProps = {
  item: SidebarNavItemData;
  variant?: SidebarNavVariant;
  renderLink?: (props: SidebarNavLinkRenderProps) => ReactNode;
};

export function SidebarNavItem({
  item,
  variant = "main",
  renderLink,
}: SidebarNavItemProps) {
  const className = getNavItemClassName(Boolean(item.isActive), variant);

  const content = (
    <>
      {item.icon ? (
        <span className="flex shrink-0 items-center self-stretch pt-0.5">
          {item.icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
    </>
  );

  if (item.href) {
    if (renderLink) {
      return renderLink({ href: item.href, className, children: content });
    }

    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cn(className, "cursor-pointer border-0 bg-default/0")}
      >
        {content}
      </button>
    );
  }

  return <div className={cn(className, "cursor-default")}>{content}</div>;
}
