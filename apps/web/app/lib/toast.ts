export type ToastTypes = "success" | "error" | "info" | "warning";

export type Toast = {
  type: ToastTypes;
  message: string;
};
