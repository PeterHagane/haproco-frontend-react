import React from "react";
import toast from "react-hot-toast";

interface INotification {
  title?: string, message?: string, style?: React.CSSProperties, icon?: JSX.Element, duration?: number, color?: string, textColor?:string
}


export const notify = ({title = "", message, style, icon, duration, color, textColor}: INotification) => toast(
    () => (
      <span >
             {title} {message}
      </span>
    ),
    {
      icon: icon,
      id: message,
      position: "bottom-right",
      duration: duration || 1500,
      style: {
        backgroundColor: color || "hsla(var(--r-ocean), 0.5)",  
        color: textColor || "var(--text-contrast)",
        ...style
      },
    }
  );