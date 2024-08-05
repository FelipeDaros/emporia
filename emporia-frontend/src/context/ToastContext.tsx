import React, { createContext, useState, useContext, ReactNode } from "react";
import { XCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

type Toast = {
  id: number;
  message: string;
  type: 'error' | 'success' | 'warn' | 'info';
  className?: string;
};

type ToastContextType = {
  addToast: (message: string, type: Toast['type'], timeout?: number, className?: string) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
};

const ToastContext = createContext<ToastContextType | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'], timeout: number = 3000, className: string = '') => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, className }]);
    setTimeout(() => {
      removeToast(id);
    }, timeout);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast p-4 mb-2 rounded flex items-center ${toast.className} ${getTypeClass(toast.type)}`}>
            {getIcon(toast.type)}
            <span className="ml-2">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const getTypeClass = (type: Toast['type']) => {
  switch (type) {
    case 'error':
      return 'bg-red-500 text-white';
    case 'success':
      return 'bg-green-500 text-white';
    case 'warn':
      return 'bg-yellow-500 text-black';
    case 'info':
      return 'bg-blue-500 text-white';
    default:
      return '';
  }
};

const getIcon = (type: Toast['type']) => {
  const iconClass = "h-5 w-5";
  switch (type) {
    case 'error':
      return <XCircleIcon className={iconClass} />;
    case 'success':
      return <CheckCircleIcon className={iconClass} />;
    case 'warn':
      return <ExclamationTriangleIcon className={iconClass} />;
    case 'info':
      return <InformationCircleIcon className={iconClass} />;
    default:
      return null;
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
