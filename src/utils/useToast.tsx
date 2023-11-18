import { useCallback, useRef, useState } from "react";

export function useToast(timeoutMs = 3000) {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutId = useRef<NodeJS.Timeout>();
  const updateToast = useCallback(
    (toast: string) => {
      clearTimeout(toastTimeoutId.current);
      setToast(toast);
      toastTimeoutId.current = setTimeout(() => setToast(null), timeoutMs);
    },
    [timeoutMs],
  );
  return {
    toast,
    setToast: updateToast,
  };
}
