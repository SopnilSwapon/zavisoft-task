"use client";

import GlobalError from "./components/shared/GlobalError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlobalError
        message={error.message || "Something went wrong"}
        onRetry={reset}
      />
    </div>
  );
}
