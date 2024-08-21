import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const usePortal = () => {
  const portalContainer = useMemo(() => {
    const div = globalThis.document.createElement("div");
    div.setAttribute("class", "portal");
    return div;
  }, []);

  useEffect(() => {
    return () => {
      portalContainer.remove();
    };
  }, [portalContainer]);

  const handleRenderPortal = (
    children: React.ReactNode,
    container: Element,
  ) => {
    globalThis.document.body.appendChild(container);

    return createPortal(children, container);
  };

  const handleClearPortal = (container: Element) => container.remove();

  return {
    clearPortal: () => handleClearPortal(portalContainer),
    renderPortal: (children: React.ReactNode) =>
      handleRenderPortal(children, portalContainer),
  };
};

export default usePortal;
