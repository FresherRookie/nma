'use client';
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onClose();
      }
    },
    [onClose, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-10 inset-0 flex items-center justify-center bg-black/60 p-4"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="bg-white w-full max-w-md p-6 rounded-md shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
