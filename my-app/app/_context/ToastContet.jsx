"use client"
import { createContext, useState } from "react";
import Toast from "../_components/Toast"

// Corrected the name to ToastProvider
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState({
    isshown: false,
    message: "",
    type: "add",
  });

  const handleCloseToast = () => {
    setShowToast({ isshown: false, message: "" });
  };

  const showToastMessage = (message, type) => {
    setShowToast({ isshown: true, message, type } );
  };

  return (
    <ToastContext.Provider value={{ showToastMessage: showToastMessage }}>
      <Toast
        isShown={showToast.isshown}
        message={showToast.message}
        type={showToast.type}
        handleCloseToast={handleCloseToast}
      />
      {children}
    </ToastContext.Provider>
  );
  
};
