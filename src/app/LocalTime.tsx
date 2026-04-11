"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Da Nang is GMT+7 (Asia/Ho_Chi_Minh or Asia/Bangkok timezones share the same offset)
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Ho_Chi_Minh", 
        hour: "numeric", 
        minute: "2-digit", 
        hour12: true 
      };
      
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second
    
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <p className="font-mono text-2xl md:text-3xl lg:text-4xl tracking-tight font-light text-black">
        GMT+7 → <span className="text-black/30">...</span>
      </p>
    );
  }

  return (
    <p className="font-mono text-2xl md:text-3xl lg:text-4xl tracking-tight font-light text-black">
      GMT+7 → <span className="font-semibold text-[#FF5F1F]">{time}</span>
    </p>
  );
}
