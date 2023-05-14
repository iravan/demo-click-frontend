import "../css/Client.css";
import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { UserContext } from "../App";

const Client = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoading, setIsLoading] = useState(false);
  const SID = React.useContext(UserContext);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const clickBtn = (value: string) => {
    setIsLoading(true);
    const data = { sid: SID, value: value };

    socket.timeout(5000).emit("click", data, () => {
      setIsLoading(false);
    });
  };
  if (!isConnected) {
    return <>Connecting...</>;
  }
  return (
    <>
      <h1>Client ID : {SID}</h1>

      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <button className="Btn OrangeBtn" onClick={() => clickBtn("ORANGE")}>
            YES
          </button>
          <button className="Btn BlueBtn" onClick={() => clickBtn("BLUE")}>
            NO
          </button>
        </>
      )}
    </>
  );
};

export default Client;
