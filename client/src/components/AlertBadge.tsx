import React from "react";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

const AlertBadge: React.FC = () => {
  return (
    <Alert>
      <RocketIcon className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};

export default AlertBadge;
