import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

function LazyLoader(
  Page: () => Promise<{ default: React.ComponentType }>,
  Fallback?: React.FC,
) {
  const LazyPage = lazy(Page);

  return function Lazied<T extends object>(props: T) {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            Fallback ? (
              <Fallback />
            ) : (
              <h5 className="page-loading">Page is loading...</h5>
            )
          }>
          <LazyPage {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

export default LazyLoader;
