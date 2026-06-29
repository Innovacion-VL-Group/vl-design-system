"use client";

import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery.js";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

export type UseAppShellSidebarsOptions = {
  defaultSidebarOpen?: boolean;
  defaultSubSidebarOpen?: boolean;
};

export function useAppShellSidebars({
  defaultSidebarOpen = true,
  defaultSubSidebarOpen = true,
}: UseAppShellSidebarsOptions = {}) {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultSidebarOpen);
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(defaultSubSidebarOpen);

  useEffect(() => {
    if (isDesktop || !(isSidebarOpen && isSubSidebarOpen)) {
      return;
    }

    setIsSubSidebarOpen(false);
  }, [isDesktop, isSidebarOpen, isSubSidebarOpen]);

  const setSidebarOpen = useCallback(
    (open: boolean) => {
      setIsSidebarOpen(open);
      if (!isDesktop && open) {
        setIsSubSidebarOpen(false);
      }
    },
    [isDesktop],
  );

  const setSubSidebarOpen = useCallback(
    (open: boolean) => {
      setIsSubSidebarOpen(open);
      if (!isDesktop && open) {
        setIsSidebarOpen(false);
      }
    },
    [isDesktop],
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setSidebarOpen]);

  const closeSubSidebar = useCallback(() => {
    setSubSidebarOpen(false);
  }, [setSubSidebarOpen]);

  const openSubSidebar = useCallback(() => {
    setSubSidebarOpen(true);
  }, [setSubSidebarOpen]);

  const closeAllMenus = useCallback(() => {
    setSidebarOpen(false);
    setSubSidebarOpen(false);
  }, [setSidebarOpen, setSubSidebarOpen]);

  return {
    isDesktop,
    isSidebarOpen,
    isSubSidebarOpen,
    setSidebarOpen,
    setSubSidebarOpen,
    toggleSidebar,
    closeSubSidebar,
    openSubSidebar,
    closeAllMenus,
  };
}
