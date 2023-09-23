import { FC } from "react";
import "../Icons/Icons";

import {
  SuccessIcon,
  DangerIcon,
  WarningIcon,
} from "../Icons/Icons";

export interface IToast {
  id: number;
  message: string;
  type: string;
  onClose?: () => void;
}

const Toast: FC<IToast> = ({ message, type, onClose }) => {
  const iconMap: any = {
    success: <SuccessIcon />,
    danger: <DangerIcon />,
    warning: <WarningIcon />,
  };

  const toastIcon = iconMap[type] || null;

  return (
    <div className={`toast show border-2 border-${type}`} role="alert">
      <div className={`toast-header border-${type}`}>
        {toastIcon && <div>{toastIcon}</div>}
        <strong className="ms-2 me-auto">{type}</strong>
        <button type="button" className="btn-close" onClick={onClose} />
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
