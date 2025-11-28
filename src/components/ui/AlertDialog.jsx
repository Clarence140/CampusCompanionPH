"use client";

import React, { useState, createContext, useContext, useEffect, useCallback, useRef } from "react";
import { FiX } from "react-icons/fi";
import { cn } from "../../lib/utils";
import ModernButton from "./ModernButton";

// AlertDialog Context
const AlertDialogContext = createContext(undefined);

// AlertDialog Root Component
export function AlertDialog({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value) => {
      const newValue = typeof value === "function" ? value(open) : value;
      if (!isControlled) {
        setUncontrolledOpen(newValue);
      }
      if (onOpenChange) {
        onOpenChange(newValue);
      }
    },
    [isControlled, onOpenChange, open]
  );

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

// AlertDialog Trigger
export const AlertDialogTrigger = ({ children, asChild = false, ...props }) => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogTrigger must be used within an AlertDialog");
  }

  const { setOpen } = context;

  const handleClick = (e) => {
    setOpen(true);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const { onClick, ...otherProps } = props;

  if (asChild && children) {
    return (
      <>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              onClick: handleClick,
            });
          }
          return child;
        })}
      </>
    );
  }

  return (
    <button type="button" onClick={handleClick} {...otherProps}>
      {children}
    </button>
  );
};

AlertDialogTrigger.displayName = "AlertDialogTrigger";

// AlertDialog Portal (simplified - no portal needed for this implementation)
const AlertDialogPortal = ({ children }) => {
  return <>{children}</>;
};

// AlertDialog Overlay
export const AlertDialogOverlay = ({ className, ...props }) => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogOverlay must be used within an AlertDialog");
  }

  const { open, setOpen } = context;

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
};

AlertDialogOverlay.displayName = "AlertDialogOverlay";

// AlertDialog Content
export const AlertDialogContent = ({ className, children, ...props }) => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogContent must be used within an AlertDialog");
  }

  const { open, setOpen } = context;

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, setOpen]);

  // Click outside to close
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        ref={contentRef}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl rounded-2xl animate-scale-in relative",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close dialog"
        >
          <FiX className="w-5 h-5" />
        </button>
        {children}
      </div>
    </AlertDialogPortal>
  );
};

AlertDialogContent.displayName = "AlertDialogContent";

// AlertDialog Header
export const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

AlertDialogHeader.displayName = "AlertDialogHeader";

// AlertDialog Footer
export const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-3",
      className
    )}
    {...props}
  />
);

AlertDialogFooter.displayName = "AlertDialogFooter";

// AlertDialog Title
export const AlertDialogTitle = ({ className, ...props }) => (
  <h2
    className={cn("text-lg font-bold text-gray-900", className)}
    {...props}
  />
);

AlertDialogTitle.displayName = "AlertDialogTitle";

// AlertDialog Description
export const AlertDialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-600 leading-relaxed", className)} {...props} />
);

AlertDialogDescription.displayName = "AlertDialogDescription";

// AlertDialog Action
export const AlertDialogAction = ({ className, children, ...props }) => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogAction must be used within an AlertDialog");
  }

  const { setOpen } = context;

  const handleClick = (e) => {
    setOpen(false);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const { onClick, ...otherProps } = props;

  return (
    <ModernButton variant="primary" onClick={handleClick} className={className} {...otherProps}>
      {children}
    </ModernButton>
  );
};

AlertDialogAction.displayName = "AlertDialogAction";

// AlertDialog Cancel
export const AlertDialogCancel = ({ className, children, ...props }) => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogCancel must be used within an AlertDialog");
  }

  const { setOpen } = context;

  const handleClick = (e) => {
    setOpen(false);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const { onClick, ...otherProps } = props;

  return (
    <ModernButton variant="outline" onClick={handleClick} className={className} {...otherProps}>
      {children}
    </ModernButton>
  );
};

AlertDialogCancel.displayName = "AlertDialogCancel";

