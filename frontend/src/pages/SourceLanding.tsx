import { useLayoutEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { captureShortPath, pushAttribution } from "../lib/attribution";

const SourceLanding = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const attr = captureShortPath(pathname);
    if (attr) pushAttribution(attr);
  }, [pathname]);

  return <Navigate to="/" replace />;
};

export default SourceLanding;
