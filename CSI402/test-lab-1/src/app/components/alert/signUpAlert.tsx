"use client";

import React from "react";

interface AlertProps {
  status: string;
  title: string;
  message: string;
  confirm?: () => void;
  show: boolean;
}

const AlertBox: React.FC<AlertProps> = ({
  status,
  title,
  message,
  confirm,
  show,
}) => {
  if (!show) return null;

  return (
    <div
      className={`${
        status === "success" ? "bg-green-500" : "bg-red-500"
      } w-full p-4 text-white rounded-md shadow-md flex flex-col gap-2`}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm">{message}</div>
      {confirm && (
        <button
          onClick={confirm}
          className={`mt-2 self-end px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 ${
            status === "success"
              ? "bg-white text-green-500 focus:ring-green-300"
              : "bg-white text-red-500 focus:ring-red-300"
          }`}
        >
          ตกลง
        </button>
      )}
    </div>
  );
};

export default AlertBox;
