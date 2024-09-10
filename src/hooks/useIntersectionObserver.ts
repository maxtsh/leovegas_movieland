import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = <Element extends HTMLElement>(
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<Element>(null);
  const optionsStr = JSON.stringify(options || {});

  const [observerStatus, setObserverStatus] =
    useState<IntersectionObserverEntry | null>(null);

  const handleIntersectionObserver = (
    enteries: IntersectionObserverEntry[],
  ) => {
    setObserverStatus(enteries?.[0] || null);
  };

  useEffect(() => {
    const element = ref?.current;
    const optionJSON = JSON.parse(optionsStr) as IntersectionObserverInit;

    const observer = new IntersectionObserver(
      handleIntersectionObserver,
      optionJSON,
    );

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [optionsStr]);

  return {
    ref,
    observerStatus,
  };
};

export default useIntersectionObserver;
