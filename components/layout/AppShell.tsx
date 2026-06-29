"use client";

import { cn } from "@heroui/react";
import type { ReactElement } from "react";
import { AppHeader } from "./AppHeader.js";
import { Sidebar } from "./Sidebar.js";
import { SubSidebar } from "./SubSidebar.js";
import { SubSidebarExpandTrigger } from "./SubSidebarExpandTrigger.js";
import type { AppShellProps } from "./types.js";
import { useAppShellSidebars } from "./useAppShellSidebars.js";

export function AppShell({
  children,
  logo,
  headerActions,
  mainNavItems,
  secondaryNavItems,
  subNavItems,
  sidebarFooter,
  toggleOpenIcon,
  toggleCloseIcon,
  collapseIcon,
  expandIcon,
  shellStyle,
  glassStyle,
  defaultSidebarOpen,
  defaultSubSidebarOpen,
  renderLink,
  className,
}: AppShellProps): ReactElement {
  const {
    isDesktop,
    isSidebarOpen,
    isSubSidebarOpen,
    toggleSidebar,
    closeSubSidebar,
    openSubSidebar,
    closeAllMenus,
  } = useAppShellSidebars({ defaultSidebarOpen, defaultSubSidebarOpen });

  const isMobileMenuOpen =
    !isDesktop && (isSidebarOpen || isSubSidebarOpen);

  return (
    <div className={cn("flex h-screen flex-col", className)} style={shellStyle}>
      <AppHeader
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={toggleSidebar}
        toggleOpenIcon={toggleOpenIcon}
        toggleCloseIcon={toggleCloseIcon}
        style={glassStyle}
        logo={logo}
        actions={headerActions}
      />

      <div className="flex min-h-0 flex-1 pt-16 md:pt-0">
        <Sidebar
          isOpen={isSidebarOpen}
          items={mainNavItems}
          secondaryItems={secondaryNavItems}
          footer={sidebarFooter}
          style={isDesktop ? glassStyle : undefined}
          renderLink={renderLink}
        />

        <div className="relative shrink-0 self-stretch max-md:w-0 max-md:overflow-visible">
          <SubSidebar
            isOpen={isSubSidebarOpen}
            onToggle={closeSubSidebar}
            items={subNavItems}
            collapseIcon={collapseIcon}
            style={isDesktop ? glassStyle : undefined}
            renderLink={renderLink}
          />
          {!isSubSidebarOpen ? (
            <SubSidebarExpandTrigger
              onExpand={openSubSidebar}
              expandIcon={expandIcon}
              style={isDesktop ? glassStyle : undefined}
            />
          ) : null}
        </div>

        {isMobileMenuOpen ? (
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-x-0 bottom-0 top-16 z-[35] md:hidden"
            onClick={closeAllMenus}
          />
        ) : null}

        <main className="relative z-0 flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
