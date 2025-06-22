import type {Toast} from "@/lib/toast";
import {useEffect} from "react";

import {toast as sonnerToast, Toaster as SonnerToaster} from "sonner";
type ToasterProps = {
  toast: Toast | null;
};

export function Toaster({toast}: ToasterProps) {
  useEffect(() => {
    if (!toast) return;

    let toastId: number | string;
    switch (toast.type) {
      case "error":
        toastId = sonnerToast.error(toast.message);
        break;
      case "info":
        toastId = sonnerToast.info(toast.message);
        break;

      case "success":
        toastId = sonnerToast.success(toast.message);
        break;
      case "warning":
        toastId = sonnerToast.warning(toast.message);
        break;

      default:
        console.warn(`invalid toast type used!`);
        return;
    }

    return () => {
      sonnerToast.dismiss(toastId);
    };
  }, [toast]);

  return <SonnerToaster richColors position="bottom-center" />;
}
