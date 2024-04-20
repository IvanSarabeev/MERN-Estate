import React from "react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";

export interface ToastMessageProps {
  title: string;
  description: string;
  actionText: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  title,
  description,
  actionText,
}) => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          type: "foreground",
          title: `${title}`,
          description: `${description}`,
          action: (
            <ToastAction altText="Schedule Undo">{actionText}</ToastAction>
          ),
        });
      }}
    >
      Toast Message
    </Button>
  );
};

export default ToastMessage;
