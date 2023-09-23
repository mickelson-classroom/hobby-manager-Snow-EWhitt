import { FC, useEffect, useRef } from "react";
import Toast, { IToast } from "../Toast/Toast";
import "./ToastList.scss";

const ToastList: FC<{
  data: any;
  removeToast: (i: number) => void;
}> = ({ data, removeToast }) => {
  const listRef = useRef(null);

  const handleScrolling = (element: any) => {
    element?.scrollTo(0, 0);
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [data]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div
      className="toast-list toast-list--bottom-right"
      aria-live="assertive"
      ref={listRef}
    >
      {data.map((toast: IToast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastList;
