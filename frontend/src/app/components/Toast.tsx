import React, { useEffect, useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { MdError } from "react-icons/md";

export const SuccessToast = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 500);
    }
  }, [visible]);

  return (
    <div
      className={`bg-secondary-foreground text-primary xl:text-2xl font-medium py-2 px-10 rounded-md shadow-md transition-transform duration-500 ease-in-out transform border border-border_color ${
        isVisible ? "scale-100 xl:-translate-y-4" : " translate-y-20 scale-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <GoCheckCircleFill />

        {children}
      </div>
    </div>
  );
};
export const ErrorToast = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 500);
    }
  }, [visible]);

  return (
    <div
      className={`bg-secondary-foreground text-red-600 xl:text-2xl font-medium py-2 px-10 rounded-md shadow-md transition-transform duration-500 ease-in-out transform border border-border_color ${
        isVisible ? "scale-100 xl:-translate-y-4" : " translate-y-20 scale-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <MdError />

        {children}
      </div>
    </div>
  );
};
