import { useState, useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500 text-white" :
      type === "error" ? "bg-red-500 text-white" :
      "bg-blue-500 text-white"
    }`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">×</button>
    </div>
  );
}
