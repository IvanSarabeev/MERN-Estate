import React, { useState, useCallback } from "react";
import socket from "services/socket";
import Button from "components/HTML/Button";

interface CookieProps {
  handleCookie: () => void;
}

const CookieReminder: React.FC<CookieProps> = ({ handleCookie }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useCallback(() => {
    socket.on("cookieReminder", (message: string) => {
      // alert(message);
      console.log(message);
    });

    // Listen to 'connect' event
    socket.on("connect", () => {
      setIsConnected(true);
    });

    // Listen to 'disconnect' event
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("cookieReminder");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <div className="group cookie-container">
        <div className="regular-14 lg:regular-16 font-light p-5 text-justify text-slate-800/90 group-hover:text-slate-800/100">
          <p className="mb-2">
            We use cookies, including third party cookies, for operational
            purposes, statistical analyses, to personalize your experience,
            provide you with targeted content tailored to your interests and to
            analyze the performance of our advertising campaigns.
          </p>
          <p className="">
            To find out more about the types of cookies, as well as who sends
            them on our website, please visit our dedicated guide to{" "}
            <strong className="text-slate-900 font-semibold">
              {isConnected ? "Connected" : "Disconnected"}
            </strong>
            .
          </p>
        </div>
        <div className="w-full flexBetween p-5">
          <Button
            id="choices"
            type="button"
            title="Personalize choices"
            className="choices-btn"
          >
            Personalize my choices
          </Button>
          <div className="gap-x-4 flexCenter">
            <Button
              id="reject"
              name="reject"
              type="button"
              title="Reject Cookie"
              className="reject-btn"
              onClick={handleCookie}
            >
              Reject all
            </Button>
            <Button
              id="accept"
              name="accept"
              type="button"
              title="Accept Cookie"
              className="accept-btn"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieReminder;
