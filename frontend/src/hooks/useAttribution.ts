import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  captureAttribution,
  hasTrackingSearch,
  pushAttribution,
  stripTrackingSearch,
} from "../lib/attribution";

export function useAttribution() {
  const { search } = useLocation();

  useEffect(() => {
    const tracked = hasTrackingSearch(search);
    const attr = captureAttribution(search);
    pushAttribution(attr);
    if (tracked) stripTrackingSearch();
  }, [search]);
}
