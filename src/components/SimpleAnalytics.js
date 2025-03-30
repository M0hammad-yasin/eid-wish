"use client";

import { useEffect } from "react";

export default function SimpleAnalytics() {
  useEffect(() => {
    // Function to collect only the requested visitor data
    const trackPageView = async () => {
      try {
        const visitorData = {
          timestamp: new Date().toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          userAgent: navigator.userAgent,
          // IP will be captured on the server side
        };

        // Send data to your backend API
        await fetch("/api/simple-analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitorData),
        });
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };

    trackPageView();
  }, []);

  return null; // This component doesn't render anything
}
