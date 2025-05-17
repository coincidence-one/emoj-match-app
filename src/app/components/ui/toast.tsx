"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export type ToastProps = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
};

export const Toast = ({ id, message, type, duration = 3000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const getToastColor = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "error":
        return "bg-gradient-to-r from-red-500 to-rose-600";
      case "info":
      default:
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`${getToastColor()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-md`}
        >
          <span>{message}</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-3 text-white/80 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
