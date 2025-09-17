import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface RouterSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RouterSafeWrapper({ children, fallback = null }: RouterSafeWrapperProps) {
  try {
    // This will throw if not in Router context
    useLocation();
    return <>{children}</>;
  } catch {
    return <>{fallback}</>;
  }
}

export function useRouterSafeLocation() {
  try {
    return useLocation();
  } catch {
    return { pathname: "/" };
  }
}