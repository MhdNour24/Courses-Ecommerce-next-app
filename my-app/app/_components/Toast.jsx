"use client";
import { useEffect } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";

function Toast({ isShown, message, type, handleCloseToast }) {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        handleCloseToast();
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isShown]);

  if (!isShown) return null;

  return (
    <div
      style={{ zIndex: 3 }}
      className={`absolute top-20 right-6 transition-all duration-100 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-2 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <DeleteIcon
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  padding: 1,
                  fontSize: 30,
                }}
              />
            ) : (
              <AddTaskIcon
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 40,
                  borderRadius: "50%",
                  padding: 1,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
