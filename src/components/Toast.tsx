import React from "react";
import toast from "react-hot-toast";

interface INotification {
  title?: string, message?: string, style?: React.CSSProperties, icon?: JSX.Element, duration?: number, color?: string, textColor?:string, dismissible?: boolean
}


export const notify = ({title = "", message, style, icon, duration, color, textColor, dismissible}: INotification) => toast(
    (t) => (
      <div className="flex">
        <span onClick={() =>{ dismissible && toast.dismiss(t.id)}}>
               {title} {message}
        </span>
        {dismissible && <span>x</span>  }
      </div>
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