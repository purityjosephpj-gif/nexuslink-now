import { useLocation } from "react-router-dom";

export function useSafeLocation() {
  try {
    return useLocation();
  } catch {
    // Return a default location object when not in Router context
    return { pathname: "/" };
  }
}