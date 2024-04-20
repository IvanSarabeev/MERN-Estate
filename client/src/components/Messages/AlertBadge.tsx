import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

export interface AlertBadgeProps {
  type: "info" | "success" | "error" | "warning";
  title: string;
  description: string;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({
  type,
  title,
  description,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {}, 4000);

    return () => {
      clearTimeout(timer); //Clear AlertBadge after 4000ms
    };
  }, []);

  return (
    <Alert
      className={`alert-${
        type === "success" ? "bg-green-500" : ""
      } fixed right-[2.5%] bottom-[2.5%] max-w-md`}
    >
      <RocketIcon className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertBadge;
