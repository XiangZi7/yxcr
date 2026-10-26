"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <motion.dialog
      ref={ref}
      className="workspace-dialog"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading flex items-center justify-between">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="关闭弹窗">
          <X size={19} />
        </button>
      </div>
      {children}
    </motion.dialog>
  );
}
