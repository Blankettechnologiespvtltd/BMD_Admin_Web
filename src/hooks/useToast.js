/**
 * useToast HOOK
 * ─────────────────────────────────────────────────────────────────────────────
 * Global toast notification system.
 * Replaces all window.alert() calls across the app.
 *
 * Usage:
 *   const { toasts, showToast, removeToast } = useToast();
 *
 *   // Show a notification:
 *   showToast("User created!", "success");
 *   showToast("Something went wrong.", "error");
 *   showToast("Processing your request.", "info");
 *
 *   // In JSX:
 *   <ToastContainer toasts={toasts} onRemove={removeToast} />
 *
 * Toasts auto-dismiss after 3.5 seconds.
 */

import { useState, useCallback } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random(); // prevent collisions on rapid calls
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};
