import { useState, useEffect, useCallback } from "react";
import { socket } from "../socket";
import "../css/Dashboard.css";

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}
const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [updateTime, setUpdateTime] = useState(getTimestampInSeconds());
  const [reload, setReload] = useState(getTimestampInSeconds());
  const [database, setDatabase] = useState({} as any);
  const updateChart = useCallback(() => {
    setTimeout(() => {
      const now = getTimestampInSeconds();
      setReload(now);
    }, 5000);
  }, [updateTime]);
  function onReceivedData(value: any) {
    setDatabase(value);
    const now = getTimestampInSeconds();
    setUpdateTime(now);
    updateChart();
  }
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("stat", null, onReceivedData);
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

  useEffect(() => {
    socket.on("stat", onReceivedData);

    return () => {
      socket.off("stat", () => onReceivedData({}));
    };
  }, [database]);
  if (!isConnected) {
    return <>Connecting...</>;
  }
  return (
    <div>
      <div style={{ display: "none" }}>{reload}</div>
      {!database && <>No Data</>}
      {Object.keys(database)
        .reverse()
        .map((key) => {
          const data = database[key];
          if (!data) {
            return null;
          }

          const { ORANGE, BLUE } = data as { ORANGE: number; BLUE: number };
          const total = ORANGE + BLUE;
          const orangeRate = ORANGE / total;
          const blueRate = BLUE / total;
          return (
            <div key={key}>
              <h1>Client : {key}</h1>
              <h1>Total clicks : {total}</h1>
              {getTimestampInSeconds() - updateTime >= 5 && (
                <div className="BarChart">
                  <div className="BarItem">
                    <div className="BarOrange" style={{ flex: orangeRate }}>
                      <span className="BarLabel"> {ORANGE}</span>
                    </div>
                    <div className="BarBlue" style={{ flex: blueRate }}>
                      <span className="BarLabel">{BLUE}</span>
                    </div>
                  </div>
                </div>
              )}
              <span>-------------------------------------------------</span>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
