import React, { useState, useEffect } from "react";
import socket from "../services/socket";

const CookieReminder: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
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
      {/* TODO: Complete cookie design */}
      <p>{isConnected ? "Connected" : "Disconnected"}</p>
      <div className="w-screen mx-auto bg-[#f8f9f9]">
        <div className="relative z-10 pt-16 pb-14 px-0">
          <div className="">
            <p className="regular-18 leading-4">
              Select your cookie preference
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieReminder;
