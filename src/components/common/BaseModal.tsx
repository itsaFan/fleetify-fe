import { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

export default function BaseModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const body = document.body;
    if (!isOpen) return;
    const prev = body.style.overflowY;
    body.style.overflowY = "hidden";
    return () => {
      body.style.overflowY = prev; // restore
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[1000] flex justify-center py-12 px-4 bg-black/20 backdrop-blur-md overflow-y-auto cursor-pointer" onClick={onClose}>
      <button onClick={onClose} className="bg-none border-none text-primary text-lg absolute right-2 top-2 cursor-pointer" aria-label="close">
        <X />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-xl overflow-hidden shadow bg-secondary cursor-auto">
        {children}
      </motion.div>
    </div>
  );

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
