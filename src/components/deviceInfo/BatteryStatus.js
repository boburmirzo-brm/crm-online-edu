// @ts-nocheck
import { useState, useEffect } from "react";

const BatteryStatus = () => {
  const [batteryInfo, setBatteryInfo] = useState({
    state: false,
    batteryInfo: {},
  });

  useEffect(() => {
    window.navigator
      .getBattery()
      .then((e) => {
        setBatteryInfo({
          state: true,
          batteryInfo: { charging: e.charging, level: e.level },
        });
      })
      .catch((e) => {
        setBatteryInfo({
          state: false,
          batteryInfo: {},
        });
      });
  }, []);
  return batteryInfo;
};

export default BatteryStatus;
