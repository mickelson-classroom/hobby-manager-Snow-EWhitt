import { FC, ReactNode, createContext, useState } from "react";
import { IToast } from "../components/Toast/Toast";

export interface ToastContextType {
  toasts: IToast[];
  showToast: (m: string, t: string) => void;
  removeToast: (i: number) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});

const ToastContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = (message: string, type: string) => {
    const toast: IToast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const startingValue: ToastContextType = {
    toasts,
    showToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={startingValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
